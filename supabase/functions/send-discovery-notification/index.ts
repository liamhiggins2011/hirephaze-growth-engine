import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validated = submissionSchema.parse(body);

    console.log(`Processing ${validated.type} submission from:`, validated.email);

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

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
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