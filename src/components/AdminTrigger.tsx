import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdminUser, ADMIN_EMAIL } from "@/lib/admin.functions";
import { toast } from "sonner";

const CLICK_WINDOW = 3000;
const REQUIRED_CLICKS = 3;

export function AdminTrigger() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const clicks = useRef<number[]>([]);
  const navigate = useNavigate();
  const ensureAdmin = useServerFn(ensureAdminUser);

  const handleClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < CLICK_WINDOW), now];
    if (clicks.current.length >= REQUIRED_CLICKS) {
      clicks.current = [];
      setOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // Map username → admin email
      const normalized = username.trim().toLowerCase();
      const isAdminUser = normalized === "lichry" || normalized === "admin";
      const email = isAdminUser ? ADMIN_EMAIL : username.trim();

      // First attempt sign-in
      let { error } = await supabase.auth.signInWithPassword({ email, password });

      // If invalid credentials and using default lichry/123456L, try to bootstrap then retry
      if (error && isAdminUser && password === "123456L") {
        await ensureAdmin();
        const retry = await supabase.auth.signInWithPassword({ email, password });
        error = retry.error;
      }

      if (error) {
        toast.error("Invalid credentials");
        return;
      }
      sessionStorage.setItem("linchry_admin", "1");
      toast.success("Welcome back");
      setOpen(false);
      navigate({ to: "/admin" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-hidden="true"
        tabIndex={-1}
        className="fixed bottom-3 left-3 z-[150] h-5 w-5 cursor-default border border-transparent bg-transparent opacity-30 hover:opacity-60 hover:border-[var(--amber-gold)]/40 transition-opacity"
        style={{ background: "color-mix(in oklab, var(--espresso) 12%, transparent)" }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-[var(--cream)] p-8"
              style={{ border: "1px solid var(--amber-gold)" }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 text-[var(--taupe)] hover:text-[var(--espresso)]"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="block h-px w-10 bg-[var(--amber-gold)]" />
              <h3 className="mt-4 font-serif text-xl text-[var(--espresso)]">Restricted</h3>
              <p className="mt-1 text-xs text-[var(--taupe)]">Authorized personnel only.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="border-b border-[var(--border)]">
                  <input
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    className="w-full bg-transparent py-2 outline-none text-[var(--espresso)] placeholder:text-[var(--taupe)]"
                  />
                </div>
                <div className="border-b border-[var(--border)]">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full bg-transparent py-2 outline-none text-[var(--espresso)] placeholder:text-[var(--taupe)]"
                  />
                </div>
                <button
                  disabled={busy}
                  className="w-full bg-[var(--amber-gold)] py-2.5 text-xs uppercase tracking-[0.22em] text-[var(--espresso)] disabled:opacity-60"
                >
                  {busy ? "Signing in…" : "Enter"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
