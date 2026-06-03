import { Briefcase, Rocket, Bot, Layers } from "lucide-react";
import { useEffect, useState } from "react";

const highlights = [
  { icon: Layers, label: "Full-stack delivery", desc: "From idea to deployed product." },
  { icon: Bot, label: "AI & automation", desc: "n8n, Make, Vapi, OpenAI agents." },
  { icon: Rocket, label: "Performance-first", desc: "Fast, accessible, well-tested." },
  { icon: Briefcase, label: "Client-focused", desc: "Clear comms, on-time shipping." },
];

const ROLES = [
  "AI Powered Full-Stack Developer",
  "AI Automation Developer | n8n, Make.com, Zapier",
  "CRM Expert | GHL, Hubspot, Salesforce, Slack, WhatsApp",
];

function useTypewriter(words: string[], typeMs = 55, holdMs = 1600, eraseMs = 30) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const word = words[index];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        t = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), holdMs);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), eraseMs);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, index, words, typeMs, holdMs, eraseMs]);

  return text;
}

export function About() {
  const typed = useTypewriter(ROLES);
  return (
    <section id="about" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">About me</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            I build products that feel inevitable.
          </h2>
          <div
            className="mt-5 min-h-[2rem] sm:min-h-[2.25rem] font-display text-lg sm:text-xl font-semibold text-gradient"
            aria-live="polite"
          >
            <span>{typed}</span>
            <span className="ml-1 inline-block w-[2px] h-[1em] align-middle bg-primary animate-pulse" />
          </div>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a full-stack developer with a deep focus on AI-powered automation.
              I work across the stack — Next.js, TanStack, Vue, Laravel, Supabase,
              Stripe — and weave intelligent workflows with n8n, Make, OpenAI and Vapi
              to remove friction from real-world businesses.
            </p>
            <p>
              I care about beautiful interfaces, but I care more about whether the
              thing actually works at 2am for the customer who needs it.
              Strong opinions, loosely held; ship-first, refine forever.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="group rounded-xl border border-border bg-card/60 backdrop-blur p-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <h.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-medium text-sm">{h.label}</div>
                    <div className="text-xs text-muted-foreground">{h.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
