import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import goalactico from "@/assets/projects/goalactico.png";
import driveelite from "@/assets/projects/driveelite.png";
import imash from "@/assets/projects/imash.png";
import n8nJobs from "@/assets/projects/n8n-jobs.png";
import n8nWa from "@/assets/projects/n8n-whatsapp.png";
import makeFaq from "@/assets/projects/make-faq.png";
import ghl from "@/assets/projects/gohighlevel.png";

type Category = "Frontend" | "Backend" | "Full-Stack" | "Automation";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image: string;
  categories: Category[];
};

const projects: Project[] = [
  {
    title: "Goalactico — Predict the Football Game",
    description:
      "Competitive football prediction platform. Built end-to-end: marketing landing, auth, Stripe subscriptions, and the prediction engine. Sports-media aesthetic with stadium hero, high-contrast type, and clear conversion paths for free + premium tiers.",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "Stripe"],
    link: "https://goalactico.net",
    image: goalactico,
    categories: ["Full-Stack", "Frontend", "Backend"],
  },
  {
    title: "DriveElite — Car Rental MVP",
    description:
      "Reservation and payment platform for premium car rentals. Real-time availability, atomic date locking across users, and Stripe-powered booking in one transaction. Vue frontend, Laravel backend, MySQL inventory.",
    tech: ["Vue.js", "Laravel", "Tailwind CSS", "Stripe", "MySQL"],
    link: "https://driveeliteuk.com/",
    image: driveelite,
    categories: ["Full-Stack", "Frontend", "Backend"],
  },
  {
    title: "iMash.io — Voice Agent Platform",
    description:
      "Advanced voice agent system enabling natural conversations with AI. Real-time speech recognition, NLU, and voice synthesis for seamless human-AI interaction across web and phone channels.",
    tech: ["Vapi", "n8n", "Voice Recognition", "Automation"],
    link: "https://imash.io/",
    image: imash,
    categories: ["Automation", "Full-Stack"],
  },
  {
    title: "n8n Job Scraping & AI Screening",
    description:
      "Full-stack n8n automation that scrapes job listings, screens relevance with AI, auto-tailors resumes per role, formats deliverables, and pushes updates to Google Sheets, email, and Telegram. Eliminates manual job-hunt grunt work.",
    tech: ["n8n", "OpenAI API", "Lead Generation", "API Integration"],
    image: n8nJobs,
    categories: ["Automation"],
  },
  {
    title: "AI WhatsApp Assistant Workflow",
    description:
      "Multi-agent WhatsApp assistant on n8n. Routes incoming messages to specialized agents for productivity, research, and comms — schedules events, manages email, fetches news, generates images, all behind one chat interface.",
    tech: ["n8n", "OpenAI", "Gemini", "MongoDB"],
    image: n8nWa,
    categories: ["Automation"],
  },
  {
    title: "Make.com AI FAQ Bot",
    description:
      "AI-powered FAQ automation in Make.com. Chains OpenAI prompts, pulls structured data from Google Sheets, branches by logic, and serves dynamic, context-aware answers via webhooks. Centralized knowledge, zero human in the loop.",
    tech: ["Make.com", "AI Chatbot", "Google Sheets", "Automation"],
    image: makeFaq,
    categories: ["Automation"],
  },
  {
    title: "GoHighLevel Real Estate SaaS Automation",
    description:
      "Complex automation system for a real estate SaaS using GoHighLevel + Make + Airtable + BigQuery. Conditional logic, multi-stage onboarding, deep integrations — turned a slow team into a fast, confident one.",
    tech: ["GoHighLevel", "Marketing Automation", "Lead Generation"],
    image: ghl,
    categories: ["Automation"],
  },
];

const filters = ["All", "Frontend", "Backend", "Full-Stack", "Automation"] as const;
type Filter = (typeof filters)[number];

export function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.categories.includes(active as Category))),
    [active]
  );

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Projects</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Selected work.</h2>
            <p className="mt-3 text-muted-foreground">
              A mix of shipped products and intelligent automations. Filter by what you care about.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={
                  "h-9 px-4 text-sm rounded-full border transition-all " +
                  (active === f
                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                    : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/40")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {list.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden shadow-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-tight">{p.title}</h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      aria-label={`Open ${p.title} in new tab`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
