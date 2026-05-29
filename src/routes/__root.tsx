import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ConciergeIndicator } from "@/components/ConciergeIndicator";
import { QuickInquiry } from "@/components/QuickInquiry";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AdminTrigger } from "@/components/AdminTrigger";
import { Toaster } from "@/components/ui/sonner";
import { useRouterState } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-espresso px-4 text-cream">
      <div className="max-w-md text-center">
        <p className="font-serif text-[120px] leading-none text-[var(--amber-gold)]">404</p>
        <span className="gold-rule mt-2 mb-6" />
        <h1 className="font-serif text-3xl">This page has drifted away.</h1>
        <p className="mt-3 text-sm text-[color:var(--champagne)]/70">
          Like a guest who wandered to the wrong ballroom — let us guide you back.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-[var(--amber-gold)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-[var(--espresso)] gold-sweep"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--cream)] px-4">
      <div className="max-w-md text-center">
        <span className="gold-rule mb-6" />
        <h1 className="font-serif text-2xl">A small disturbance.</h1>
        <p className="mt-3 text-sm text-[var(--taupe)]">
          Something didn't render as planned. Refreshing usually resolves it.
        </p>
        <button
          onClick={reset}
          className="mt-6 bg-[var(--amber-gold)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-[var(--espresso)] gold-sweep"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Linchry Events — Design & Delivery of Exceptional Events" },
      {
        name: "description",
        content:
          "Linchry Events designs and delivers exceptional events — from luxury weddings to high-level corporate experiences. Structured planning, elegant design, seamless execution.",
      },
      { property: "og:title", content: "Linchry Events — Design & Delivery of Exceptional Events" },
      {
        property: "og:description",
        content: "End-to-end event solutions combining creativity with precision. Corporate events, weddings, and private celebrations designed for impact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Linchry Events" },
      { name: "twitter:description", content: "Exceptional event design and production. Every detail considered, refined, executed." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-[var(--amber-gold)] focus:px-4 focus:py-2 focus:text-[var(--espresso)]"
      >
        Skip to main content
      </a>
      {!isAdmin && <CustomCursor />}
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <Navbar />}
      <main id="main" className="relative">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ConciergeIndicator />}
      {!isAdmin && <QuickInquiry />}
      <AdminTrigger />
      <Toaster />
    </QueryClientProvider>
  );
}
