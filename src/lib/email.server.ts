import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BUSINESS_EMAIL = "linchryevents@gmail.com"; // Will be overridden by settings

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

    // In production, integrate with SendGrid, Resend, or similar
    // For now, we'll just log and store in DB
    console.log("Contact Email to:", businessEmail);
    console.log(emailBody);

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

    // In production, integrate with SendGrid, Resend, or similar
    // For now, we'll just log and store in DB
    console.log("Hire Request Email to:", businessEmail);
    console.log(emailBody);

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
