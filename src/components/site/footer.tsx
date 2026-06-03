export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} dev/portfolio. Crafted with care.</p>
        <p className="font-mono text-xs">
          built with <span className="text-primary">React</span> · <span className="text-primary">TanStack</span> · <span className="text-primary">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
