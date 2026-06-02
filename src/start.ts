import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { initializeAdminUser } from "@/lib/admin.functions";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const initMiddleware = createMiddleware().server(async ({ next }) => {
  // Bootstrap admin user on first request (idempotent, safe to call repeatedly)
  try {
    await initializeAdminUser();
  } catch (err) {
    // Silently fail during init — not critical for request handling
    console.log("Admin init during request:", err instanceof Error ? err.message : "unknown");
  }
  return await next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [initMiddleware, errorMiddleware],
  functionMiddleware: [attachSupabaseAuth],
}));
