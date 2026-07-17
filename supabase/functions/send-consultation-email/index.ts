import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationPayload {
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { full_name, email, phone, subject, message }: ConsultationPayload = await req.json();

    if (!full_name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields (full_name, email, message)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("TO_EMAIL_ADDRESS") || "hassanashfaq51@gmail.com";

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY env variable is not set. Unable to send email.");
      return new Response(
        JSON.stringify({ error: "Server configuration error: RESEND_API_KEY is not set" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call Resend API to send email notification
    const emailSubject = subject ? `New Consultation Request: ${subject}` : `New Free Consultation Request from ${full_name}`;
    
    const emailHtml = `
      <h2>New Consultation Booking</h2>
      <p>A new free consultation request has been submitted on your portfolio site.</p>
      <hr />
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 150px;">Client Name:</td>
          <td style="padding: 8px;">${full_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
          <td style="padding: 8px;">${phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Subject:</td>
          <td style="padding: 8px;">${subject || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Date & Time:</td>
          <td style="padding: 8px;">${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC</td>
        </tr>
      </table>
      <hr />
      <h3>Project Details:</h3>
      <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: sans-serif; line-height: 1.5;">
        ${message}
      </p>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Assistant <onboarding@resend.dev>",
        to: [toEmail],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();

    if (emailResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully via Resend!", id: emailResult.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      console.error("Resend API error:", emailResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email through Resend API", details: emailResult }),
        { status: emailResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error: " + error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
