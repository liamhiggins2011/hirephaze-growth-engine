import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().min(1, "Company is required").max(100, "Company must be less than 100 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Hash IP for privacy (don't store raw IPs)
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.slice(0, 16));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

async function checkRateLimit(supabase: any, ipHash: string, endpoint: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  // Get current rate limit record
  const { data: existing } = await supabase
    .from("rate_limits")
    .select("id, count, window_start")
    .eq("ip_hash", ipHash)
    .eq("endpoint", endpoint)
    .single();

  if (!existing) {
    // No record exists, create one
    await supabase.from("rate_limits").insert({
      ip_hash: ipHash,
      endpoint: endpoint,
      count: 1,
      window_start: new Date().toISOString(),
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  // Check if window has expired
  if (new Date(existing.window_start) < new Date(windowStart)) {
    // Reset the window
    await supabase
      .from("rate_limits")
      .update({ count: 1, window_start: new Date().toISOString() })
      .eq("id", existing.id);
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  // Check if limit exceeded
  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  await supabase
    .from("rate_limits")
    .update({ count: existing.count + 1 })
    .eq("id", existing.id);

  return { allowed: true, remaining: MAX_REQUESTS - existing.count - 1 };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client with service role for rate limiting
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "unknown";

    const ipHash = await hashIP(ip);

    // Check persistent rate limit
    const { allowed, remaining } = await checkRateLimit(supabase, ipHash, "contact-form");
    
    if (!allowed) {
      console.warn(`Rate limit exceeded for hashed IP on contact-form`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
            ...corsHeaders 
          },
        }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const validated = contactSchema.parse(body);

    console.log("Sending contact email");

    // Escape all user inputs before including in HTML
    const safeName = escapeHtml(validated.name);
    const safeEmail = escapeHtml(validated.email);
    const safeCompany = escapeHtml(validated.company);
    const safeMessage = escapeHtml(validated.message);

    const emailResponse = await resend.emails.send({
      from: "HirePhaze Contact <onboarding@resend.dev>",
      to: ["liam@hirephaze.com"],
      replyTo: validated.email,
      subject: `New Contact Form Message from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <h3>Message:</h3>
        <p>${safeMessage}</p>
      `,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": String(remaining),
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in contact form:", error);
    
    // Handle validation errors separately
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid input", 
          details: error.errors.map(e => e.message).join(", ")
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);