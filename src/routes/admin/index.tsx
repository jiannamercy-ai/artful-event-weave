import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, Images, Users, Sparkles, MessageSquareQuote } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function StatCard({ label, value, Icon, to }: { label: string; value: number | string; Icon: any; to: string }) {
  return (
    <Link to={to} className="block rounded-lg border border-neutral-200 bg-white p-5 hover:border-[var(--amber-gold)] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">{label}</span>
        <Icon className="h-4 w-4 text-[var(--amber-gold)]" />
      </div>
      <p className="mt-3 font-serif text-3xl">{value}</p>
    </Link>
  );
}

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => {
      const [services, portfolio, team, testimonials, inquiries, unread] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("read", false),
      ]);
      return {
        services: services.count ?? 0,
        portfolio: portfolio.count ?? 0,
        team: team.count ?? 0,
        testimonials: testimonials.count ?? 0,
        inquiries: inquiries.count ?? 0,
        unread: unread.count ?? 0,
      };
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["recent-inquiries"],
    queryFn: async () => {
      const { data } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl">Welcome back.</h1>
      <p className="text-sm text-neutral-500 mt-1">Edit any part of the site from here.</p>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Inquiries" value={`${data?.unread ?? 0} / ${data?.inquiries ?? 0}`} Icon={Inbox} to="/admin/inquiries" />
        <StatCard label="Services" value={data?.services ?? 0} Icon={Sparkles} to="/admin/services" />
        <StatCard label="Portfolio" value={data?.portfolio ?? 0} Icon={Images} to="/admin/portfolio" />
        <StatCard label="Team" value={data?.team ?? 0} Icon={Users} to="/admin/team" />
        <StatCard label="Testimonials" value={data?.testimonials ?? 0} Icon={MessageSquareQuote} to="/admin/testimonials" />
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-xl">Recent inquiries</h2>
          <Link to="/admin/inquiries" className="text-xs uppercase tracking-[0.18em] text-[var(--amber-gold)]">
            View all →
          </Link>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100">
          {(recent ?? []).length === 0 && (
            <p className="p-6 text-sm text-neutral-500">No inquiries yet.</p>
          )}
          {recent?.map((i) => (
            <div key={i.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{i.name} {!i.read && <span className="ml-2 text-[10px] uppercase tracking-wider text-[var(--amber-gold)]">New</span>}</p>
                <p className="text-xs text-neutral-500">{i.email || i.phone}</p>
              </div>
              <p className="text-xs text-neutral-400">{new Date(i.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
