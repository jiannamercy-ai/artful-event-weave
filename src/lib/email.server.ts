import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = "linchryevents@gmail.com";
const FROM_EMAIL = "noreply@linchryevents.com"; // Will need to be verified in Resend

interface ContactSubmission {
  name: string;
  email?: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  message: string;
}

interface HireRequest {
  name: string;
  phone: string;
  email: string;
  event_date?: string;
  items_interested?: string;
  notes?: string;
}

// Get business email from settings
async function getBusinessEmail(): Promise<string> {
  try {
    const { data } = await supabaseAdmin
      .from("site_settings")
      .select("email")
      .eq("id", 1)
      .maybeSingle();
    return data?.email || BUSINESS_EMAIL;
  } catch {
    return BUSINESS_EMAIL;
  }
}

// Send contact form email
export const sendContactEmail = createServerFn({ method: "POST" })
  .input<ContactSubmission>()
  .handler(async (input) => {
    const businessEmail = await getBusinessEmail();

    const emailBody = `
New Inquiry from Linchry Events Website

Name: ${input.name}
Email: ${input.email || "Not provided"}
Phone: ${input.phone || "Not provided"}
Event Type: ${input.event_type || "Not specified"}
Event Date: ${input.event_date || "Not specified"}

Message:
${input.message}

---
This message was sent from the Linchry Events website contact form.
    `.trim();

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: businessEmail,
          subject: `New Event Inquiry: ${input.name}`,
          text: emailBody,
          html: `
            <h2>New Event Inquiry</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email || "Not provided"}</p>
            <p><strong>Phone:</strong> ${input.phone || "Not provided"}</p>
            <p><strong>Event Type:</strong> ${input.event_type || "Not specified"}</p>
            <p><strong>Event Date:</strong> ${input.event_date || "Not specified"}</p>
            <h3>Message:</h3>
            <p>${input.message.replace(/\n/g, "<br/>")}</p>
            <hr>
            <p><small>This message was sent from the Linchry Events website contact form.</small></p>
          `,
        });
      } catch (err) {
        console.error("Failed to send email via Resend:", err);
        // Continue to store in DB even if email fails
      }
    }

    // Store in database as inquiry
    const { error } = await supabaseAdmin.from("inquiries").insert({
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      event_type: input.event_type || null,
      event_date: input.event_date ? new Date(input.event_date).toISOString().split("T")[0] : null,
      message: input.message,
      read: false,
    });

    if (error) throw new Error(error.message);

    return { success: true, message: "Inquiry received. We'll be in touch soon!" };
  });

// Send hire request email
export const sendHireRequestEmail = createServerFn({ method: "POST" })
  .input<HireRequest>()
  .handler(async (input) => {
    const businessEmail = await getBusinessEmail();

    const emailBody = `
New Hire Request from Linchry Events Website

Name: ${input.name}
Phone: ${input.phone}
Email: ${input.email}
Event Date: ${input.event_date || "Not specified"}

Items Interested In:
${input.items_interested || "Not specified"}

Additional Notes:
${input.notes || "None"}

---
This message was sent from the Linchry Events rent-an-item page.
    `.trim();

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: businessEmail,
          subject: `New Hire Request: ${input.name}`,
          text: emailBody,
          html: `
            <h2>New Hire Request</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Event Date:</strong> ${input.event_date || "Not specified"}</p>
            <h3>Items Interested In:</h3>
            <p>${(input.items_interested || "Not specified").replace(/\n/g, "<br/>")}</p>
            <h3>Additional Notes:</h3>
            <p>${(input.notes || "None").replace(/\n/g, "<br/>")}</p>
            <hr>
            <p><small>This message was sent from the Linchry Events rent-an-item page.</small></p>
          `,
        });
      } catch (err) {
        console.error("Failed to send email via Resend:", err);
        // Continue to store in DB even if email fails
      }
    }

    // Store in database as hire request
    const { error } = await supabaseAdmin.from("hire_requests").insert({
      name: input.name,
      phone: input.phone,
      email: input.email,
      event_date: input.event_date ? new Date(input.event_date).toISOString().split("T")[0] : null,
      items_interested: input.items_interested || null,
      notes: input.notes || null,
      read: false,
    });

    if (error) throw new Error(error.message);

    return { success: true, message: "Hire request received. We'll respond shortly!" };
  });
