import Reveal from "./Reveal";
import { useCases } from "../lib/data";

const logos = [
  "Cedar",
  "PhotoFlash",
  "Acme HR",
  "Lattice",
  "Northwind",
  "Quanta",
  "Helios",
  "Polaris",
];

export default function UseCases() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Built for the long game</span>
          <h2 className="display-2 mt-4 text-[32px] sm:text-[44px] md:text-[56px] tracking-tightest text-gradient">
            Production teams ship with cedrus.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-400">
            The same pipeline that handles a single domain scales to a hundred
            — gated, versioned, auditable. No spreadsheets, no shared drives.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {useCases.map((u, i) => (
            <Reveal key={u.title} delay={i * 80}>
              <div className="surface surface-hover h-full p-7 transition-colors">
                <div className="flex items-center gap-2 text-[11px] font-mono text-cedar-300">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  <span className="uppercase tracking-widest">use case</span>
                </div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                  {u.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-400">
                  {u.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Logo marquee */}
        <Reveal delay={120}>
          <div className="mt-20 relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent z-10" />
            <div className="overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] py-6">
              <div className="marquee">
                {[...logos, ...logos].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex shrink-0 items-center gap-2 px-10 text-[15px] font-display font-semibold text-ink-500"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-white/[0.04] text-[10px] font-mono text-cedar-300/70">
                      {name.charAt(0)}
                    </span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-[11px] font-mono uppercase tracking-[0.18em] text-ink-600">
              Domain workspaces in production
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
