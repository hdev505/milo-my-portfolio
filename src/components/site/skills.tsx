import { useEffect, useRef, useState } from "react";

type Skill = { name: string; level: number };
type Group = { title: string; skills: Skill[] };

const groups: Group[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind / shadcn", level: 95 },
      { name: "Vue.js", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Supabase / Postgres", level: 90 },
      { name: "Laravel / PHP", level: 80 },
      { name: "Stripe payments", level: 88 },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "n8n workflows", level: 95 },
      { name: "Make.com", level: 88 },
      { name: "OpenAI / Gemini APIs", level: 92 },
      { name: "Vapi / Voice agents", level: 85 },
    ],
  },
];

const stats = [
  { label: "Projects shipped", value: 50 },
  { label: "Happy clients", value: 30 },
  { label: "Workflows built", value: 120 },
  { label: "Years experience", value: 5 },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function Counter({ value }: { value: number }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-gradient font-display">
      {n}+
    </div>
  );
}

function Bar({ skill }: { skill: Skill }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground tabular-nums">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-1000 ease-out"
          style={{ width: seen ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Skills</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            A toolkit honed in production.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every tool below is one I've shipped real, paying-customer software with — not just played with.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 shadow-card hover:border-primary/40 transition-colors"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {g.title}
              </h3>
              <div className="mt-5 space-y-4">
                {g.skills.map((s) => (
                  <Bar key={s.name} skill={s} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 text-center"
            >
              <Counter value={s.value} />
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
