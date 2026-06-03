import { ArrowRight, Mail, Sparkles } from "lucide-react";

const BALLS = Array.from({ length: 18 }, (_, i) => {
  const size = 8 + ((i * 37) % 28);
  const left = (i * 53) % 100;
  const duration = 9 + ((i * 17) % 14);
  const delay = -((i * 31) % 18);
  const drift = (((i * 23) % 80) - 40) + "px";
  const opacity = 0.25 + ((i * 13) % 50) / 100;
  return { size, left, duration, delay, drift, opacity, i };
});

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-hero-grad pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {BALLS.map((b) => (
          <span
            key={b.i}
            className="absolute bottom-[-40px] rounded-full animate-rise"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              background:
                "radial-gradient(circle at 30% 30%, var(--color-primary), var(--color-accent))",
              filter: "blur(0.5px)",
              boxShadow: "0 0 20px color-mix(in oklab, var(--color-primary) 40%, transparent)",
              ["--ball-drift" as never]: b.drift,
              ["--ball-opacity" as never]: b.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute -top-20 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[380px] w-[380px] rounded-full bg-accent/20 blur-3xl animate-blob pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="animate-fade-up max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05]">
            Building <span className="text-gradient">intelligent</span>
            <br />
            digital experiences.
          </h1>

          <p className="mt-4 text-lg text-muted-foreground font-display tracking-tight">
            Full-Stack Web Developer <span className="text-primary">·</span> AI Automation Developer
          </p>

          <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
            I design and ship production-grade web apps and intelligent automation
            systems — from sleek marketing sites to complex multi-agent workflows
            that move real business forward.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 h-11 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
            >
              View my work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-11 rounded-md border border-border bg-card/60 backdrop-blur px-5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              50+ shipped projects
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              5+ years experience
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Web · AI · Automation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
