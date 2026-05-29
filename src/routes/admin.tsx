import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Type,
  Sparkles,
  Images,
  Users,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV: Array<{ to: string; label: string; Icon: any; exact?: boolean }> = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/sections", label: "Page Copy", Icon: Type },
  { to: "/admin/services", label: "Services", Icon: Sparkles },
  { to: "/admin/portfolio", label: "Portfolio", Icon: Images },
  { to: "/admin/team", label: "Team", Icon: Users },
  { to: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { to: "/admin/inquiries", label: "Inquiries", Icon: Inbox },
  { to: "/admin/settings", label: "Settings", Icon: Settings },
];

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Real auth gate — verify a live Supabase session.
      // sessionStorage flag alone is trivially spoofable in DevTools.
      const { data, error } = await supabase.auth.getSession();
      if (cancelled) return;
      if (error || !data.session) {
        sessionStorage.removeItem("linchry_admin");
        navigate({ to: "/" });
        return;
      }
      sessionStorage.setItem("linchry_admin", "1");
      setReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        sessionStorage.removeItem("linchry_admin");
        navigate({ to: "/" });
      }
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem("linchry_admin");
    navigate({ to: "/" });
  };

  if (!ready) return null;

  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-neutral-200 bg-white md:flex">
        <div className="px-6 py-6 border-b border-neutral-200">
          <p className="font-serif text-lg" style={{ letterSpacing: "0.2em" }}>
            LINCHRY
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-1">Admin</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                  active ? "bg-[var(--amber-gold)]/15 text-neutral-900 font-medium" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <n.Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-200 p-3 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            <ExternalLink className="h-4 w-4" /> View Site
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <div className="md:pl-60">
        <header className="md:hidden flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
          <p className="font-serif tracking-[0.2em]">LINCHRY · Admin</p>
          <button onClick={logout} className="text-sm text-neutral-600">Sign out</button>
        </header>
        <div className="md:hidden flex gap-1 overflow-x-auto border-b border-neutral-200 bg-white px-2 py-2">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs whitespace-nowrap ${
                  active ? "bg-[var(--amber-gold)]/15 font-medium" : "text-neutral-600"
                }`}
              >
                <n.Icon className="h-3.5 w-3.5" />
                {n.label}
              </Link>
            );
          })}
        </div>
        <main className="p-4 md:p-8 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
