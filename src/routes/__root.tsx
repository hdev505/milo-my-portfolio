import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Personal Portfolio site" },
      {
        name: "description",
        content:
          "Full-Stack Web Developer & AI Automation Developer. I design and ship production-grade web apps and intelligent automation systems.",
      },
      { property: "og:title", content: "Personal Portfolio site" },
      {
        property: "og:description",
        content:
          "Selected work across web apps, payments, and AI automation — Next.js, Supabase, Stripe, n8n, OpenAI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Personal Portfolio site" },
      { name: "description", content: "A modern, full-stack developer portfolio showcasing projects and skills with a sleek, minimal design." },
      { property: "og:description", content: "A modern, full-stack developer portfolio showcasing projects and skills with a sleek, minimal design." },
      { name: "twitter:description", content: "A modern, full-stack developer portfolio showcasing projects and skills with a sleek, minimal design." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ed19cb09-fcbc-4534-ba1a-7180d5fed387/id-preview-94f3f35e--2dc832e6-51ce-4bc2-87eb-53b2814635f9.lovable.app-1777449572615.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ed19cb09-fcbc-4534-ba1a-7180d5fed387/id-preview-94f3f35e--2dc832e6-51ce-4bc2-87eb-53b2814635f9.lovable.app-1777449572615.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
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
  return (
    <ThemeProvider>
      <Outlet />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
