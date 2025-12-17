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

// Input validation schemas
const employerSchema = z.object({
  type: z.literal("employer"),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  companyName: z.string().trim().min(1).max(100),
  companySize: z.string().max(50),
  industry: z.string().max(100),
  rolesToFill: z.string().trim().max(500),
  hiringTimeline: z.string().max(100),
  message: z.string().trim().max(1000).optional(),
});

const candidateSchema = z.object({
  type: z.literal("candidate"),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  linkedin: z.string().trim().max(500).optional(),
  desiredRole: z.string().trim().max(200),
  experienceLevel: z.string().max(50).optional(),
  resumeUrl: z.string().max(500).optional(),
  message: z.string().trim().max(1000).optional(),
});

const submissionSchema = z.discriminatedUnion("type", [employerSchema, candidateSchema]);

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
    const { allowed, remaining } = await checkRateLimit(supabase, ipHash, "discovery-notification");
    
    if (!allowed) {
      console.warn(`Rate limit exceeded for hashed IP on discovery-notification`);
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

    const body = await req.json();
    const validated = submissionSchema.parse(body);

    console.log(`Processing ${validated.type} submission`);

    let subject: string;
    let htmlContent: string;

    if (validated.type === "employer") {
      subject = `🏢 New Employer Inquiry: ${escapeHtml(validated.companyName)}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Employer Discovery Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Contact Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(validated.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(validated.email)}">${escapeHtml(validated.email)}</a></p>
            ${validated.phone ? `<p><strong>Phone:</strong> ${escapeHtml(validated.phone)}</p>` : ''}
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Company Details</h3>
            <p><strong>Company:</strong> ${escapeHtml(validated.companyName)}</p>
            <p><strong>Size:</strong> ${escapeHtml(validated.companySize)}</p>
            <p><strong>Industry:</strong> ${escapeHtml(validated.industry)}</p>
          </div>
          
          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Hiring Needs</h3>
            <p><strong>Roles to Fill:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(validated.rolesToFill)}</p>
            <p><strong>Timeline:</strong> ${escapeHtml(validated.hiringTimeline)}</p>
          </div>
          
          ${validated.message ? `
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Additional Notes</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(validated.message)}</p>
          </div>
          ` : ''}
          
          <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
            This submission was received via the HirePhaze employer discovery form.
          </p>
        </div>
      `;
    } else {
      subject = `👤 New Candidate Application: ${escapeHtml(validated.name)}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Candidate Application
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Contact Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(validated.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(validated.email)}">${escapeHtml(validated.email)}</a></p>
            ${validated.phone ? `<p><strong>Phone:</strong> ${escapeHtml(validated.phone)}</p>` : ''}
            ${validated.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${escapeHtml(validated.linkedin)}">${escapeHtml(validated.linkedin)}</a></p>` : ''}
          </div>
          
          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Career Goals</h3>
            <p><strong>Desired Role:</strong> ${escapeHtml(validated.desiredRole)}</p>
            ${validated.experienceLevel ? `<p><strong>Experience Level:</strong> ${escapeHtml(validated.experienceLevel)}</p>` : ''}
          </div>
          
          ${validated.resumeUrl ? `
          <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #166534;">Resume</h3>
            <p><a href="${escapeHtml(validated.resumeUrl)}" style="color: #1e40af;">Download Resume</a></p>
          </div>
          ` : ''}
          
          ${validated.message ? `
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Additional Information</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(validated.message)}</p>
          </div>
          ` : ''}
          
          <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
            This application was received via the HirePhaze candidate application form.
          </p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "HirePhaze <onboarding@resend.dev>",
      to: ["liam@hirephaze.com"],
      replyTo: validated.email,
      subject: subject,
      html: htmlContent,
    });

    console.log("Notification email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": String(remaining),
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    
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
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);