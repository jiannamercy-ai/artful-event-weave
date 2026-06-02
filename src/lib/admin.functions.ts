import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const ADMIN_EMAIL = "admin@linchry.local";

// Internal function to bootstrap admin user (idempotent)
async function bootstrapAdminUser() {
  const email = ADMIN_EMAIL;
  const password = "123456L";

  try {
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error && !/already|registered|exists/i.test(error.message)) {
      throw new Error(error.message);
    }
  } catch (err) {
    // Silently fail during bootstrap to avoid startup errors
    console.log("Admin user bootstrap:", err instanceof Error ? err.message : "unknown error");
  }

  return { email };
}

// Ensures the single admin user exists. Idempotent. Returns the email to sign in with.
export const ensureAdminUser = createServerFn({ method: "POST" }).handler(async () => {
  return bootstrapAdminUser();
});

// Direct initialization for server startup (no RPC wrapper)
export async function initializeAdminUser() {
  return bootstrapAdminUser();
}
