import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Send, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitContact } from "@/lib/contact.functions";

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Message is too short").max(5000),
});

export function Contact() {
  const submit = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setLoading(true);
    try {
      const res = await submit({ data: parsed.data });
      if (res.ok) {
        toast.success("Thanks! I'll get back to you shortly.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-8 sm:p-12 shadow-card relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1fr,1.2fr] gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Contact</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Let's build something.</h2>
              <p className="mt-3 text-muted-foreground">
                Have a product to ship or a workflow to automate? Drop a note —
                I read every message.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <a
                  href="mailto:milobellamy99@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  milobellamy99@gmail.com
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Available worldwide · Remote-first
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    maxLength={100}
                    required
                    className="mt-1.5 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    maxLength={255}
                    required
                    className="mt-1.5 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  maxLength={5000}
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project…"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 h-11 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-glow disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
