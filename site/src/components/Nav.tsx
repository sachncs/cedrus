import { useEffect, useState } from "react";
import { site } from "../content/data.ts";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Pipeline", href: "#pipeline" },
    { label: "Features", href: "#features" },
    { label: "Quick start", href: "#quickstart" },
    { label: "Docs", href: site.repo + "/blob/main/README.md" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink-950/70 border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cedar-300 via-cedar-500 to-cedar-800 shadow-glow">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-950" fill="currentColor">
              <path d="M12 3 L19 11 L16 11 L20 16 L17 16 L21 21 L3 21 L7 16 L4 16 L8 11 L5 11 Z" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            cedrus
          </span>
          <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-ink-300">
            {site.version}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-[13.5px] text-ink-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={site.repo}
            className="btn btn-ghost h-9 px-4 text-[13px]"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.2.8-.6v-2c-3.1.7-3.7-1.5-3.7-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.2.9-.3 1.9-.4 2.8-.4s2 .1 2.8.4c2.2-1.5 3-1.2 3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.6 5.3-5.1 5.6.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.6C23.3 5.5 18.3.5 12 .5z"/>
            </svg>
            <span>Star</span>
          </a>
          <a href="#quickstart" className="btn btn-primary h-9 px-4 text-[13px]">
            Get started
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round"/>
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-[14px] text-ink-200 hover:text-white rounded-lg hover:bg-white/[0.03]"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-3">
              <a href={site.repo} className="btn btn-ghost flex-1 h-10 text-[13px]">GitHub</a>
              <a href="#quickstart" onClick={() => setOpen(false)} className="btn btn-primary flex-1 h-10 text-[13px]">Get started</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
