import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const ADMIN_EMAIL = "admin@linchry.local";

// Ensures the single admin user exists. Idempotent. Returns the email to sign in with.
export const ensureAdminUser = createServerFn({ method: "POST" }).handler(async () => {
  const email = ADMIN_EMAIL;
  const password = "123456L";

  // Try to create — if it already exists, Supabase returns a 422; treat as success.
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error && !/already|registered|exists/i.test(error.message)) {
    throw new Error(error.message);
  }

  return { email };
});
