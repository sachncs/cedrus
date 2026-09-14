import Reveal from "./Reveal";
import { features } from "../lib/data.ts";

function FeatureIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    "typed-ir": (
      <path d="M4 6h16M4 12h10M4 18h16M18 10l4 2-4 2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    "deterministic": (
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M12 7a5 5 0 100 10 5 5 0 000-10z" strokeLinecap="round"/>
    ),
    "verifier": (
      <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    "ssrf": (
      <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    "audit": (
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    "prompt-fence": (
      <path d="M4 4h16v6H4zM4 14h16v6H4zM7 7h.01M7 17h.01" strokeLinecap="round"/>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      {icons[id] ?? null}
    </svg>
  );
}

export default function Features() {
  return (
    <section id="features" className="section relative">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">What's inside</span>
          <h2 className="display-2 mt-4 text-[32px] sm:text-[44px] md:text-[56px] tracking-tightest text-gradient">
            Engineered for the
            <br className="hidden sm:block" />
            <span className="text-ink-400">boring parts that matter.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-400">
            Every primitive exists because something in production went wrong
            without it. The compiler is the source of truth — not the prompt,
            not the prose, not the human.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.id} delay={i * 70}>
              <div className="surface surface-hover group relative h-full overflow-hidden p-7 transition-colors">
                {/* Soft glow on hover */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cedar-500/0 blur-3xl transition-colors group-hover:bg-cedar-500/20" />

                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-cedar-300 transition-colors group-hover:bg-cedar-500/15 group-hover:text-cedar-200">
                    <FeatureIcon id={f.id} />
                  </span>
                  <span className="font-mono text-[11px] text-ink-500">{f.label}</span>
                </div>

                <h3 className="mt-6 text-[17px] font-semibold leading-snug tracking-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-400">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
