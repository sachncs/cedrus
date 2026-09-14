import Reveal from "./Reveal";
import { site } from "~/lib/data";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950 p-10 sm:p-16">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-cedar-500/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.08),transparent_60%)]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr,1fr]">
              <div>
                <span className="eyebrow text-cedar-300">Ship it</span>
                <h2 className="display-2 mt-4 text-[36px] sm:text-[52px] md:text-[64px] tracking-tightest text-gradient">
                  Cedar, versioned.
                  <br />
                  <span className="text-ink-400">For real this time.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-300">
                  Install cedrus, declare your domain, write one requirement,
                  and ship a signed bundle before lunch. The compiler does the
                  rest.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a href="#quickstart" className="btn btn-primary h-12 px-6 text-[14px]">
                  <span>Install cedrus</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href={site.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost h-12 px-6 text-[14px]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.2.8-.6v-2c-3.1.7-3.7-1.5-3.7-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.2.9-.3 1.9-.4 2.8-.4s2 .1 2.8.4c2.2-1.5 3-1.2 3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.6 5.3-5.1 5.6.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.6C23.3 5.5 18.3.5 12 .5z"/>
                  </svg>
                  <span>Star on GitHub</span>
                </a>
                <a
                  href={`${site.repo}/blob/main/README.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost h-12 px-6 text-[14px]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Read the docs</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
