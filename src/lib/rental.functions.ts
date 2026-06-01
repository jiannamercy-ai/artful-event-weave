import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const submitHireRequest = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const data = d as {
      name: string;
      phone: string;
      email: string;
      event_date?: string;
      items_interested?: string;
      notes?: string;
    };
    if (!data.name || data.name.trim().length < 1)
      throw new Error("Name required");
    if (!data.phone || data.phone.trim().length < 1)
      throw new Error("Phone required");
    if (!data.email || data.email.trim().length < 1)
      throw new Error("Email required");
    return data;
  })
  .handler(async (data) => {
    const { error } = await supabase.from("hire_requests").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      event_date: data.event_date
        ? new Date(data.event_date).toISOString().split("T")[0]
        : null,
      items_interested: data.items_interested || null,
      notes: data.notes || null,
      read: false,
    });

    if (error) throw new Error(error.message);
    return { success: true };
  });
