import Reveal from "./Reveal";
import { pipelineStages } from "../lib/data.ts";

export default function Pipeline() {
  return (
    <section id="pipeline" className="section relative">
      {/* Subtle vertical gradient line backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The pipeline</span>
          <h2 className="display-2 mt-4 text-[32px] sm:text-[44px] md:text-[56px] tracking-tightest text-gradient">
            From a one-line requirement
            <br className="hidden sm:block" />
            to a signed deploy.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-400">
            Six stages. One typed intermediate representation. Every step is a
            gated transition — the verify pass is the contract that protects
            production.
          </p>
        </Reveal>

        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
            {pipelineStages.map((stage, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal
                  key={stage.id}
                  delay={i * 80}
                  className={`relative ${isLeft ? "lg:pr-12 lg:text-right" : "lg:col-start-2 lg:pl-12"}`}
                >
                  {/* Node marker */}
                  <span
                    className={`absolute top-7 hidden h-3 w-3 rounded-full bg-cedar-400 shadow-glow lg:block ${isLeft ? "-right-1.5" : "-left-1.5"}`}
                    style={{ boxShadow: "0 0 0 4px rgba(13,13,18,1), 0 0 18px rgba(212,165,116,0.6)" }}
                  />

                  <div
                    className={`surface surface-hover p-6 transition-colors ${isLeft ? "lg:ml-auto" : ""} lg:max-w-md`}
                  >
                    <div className={`flex items-center gap-3 ${isLeft ? "lg:justify-end" : ""}`}>
                      <span className="grid h-7 w-7 place-items-center rounded-md bg-cedar-500/15 font-mono text-[11px] font-semibold text-cedar-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="eyebrow text-ink-300">{stage.title}</span>
                    </div>
                    <h3 className={`mt-4 text-[18px] font-semibold tracking-tight text-white ${isLeft ? "lg:text-right" : ""}`}>
                      {stage.summary}
                    </h3>
                    <p className={`mt-2 text-[13.5px] leading-relaxed text-ink-400 ${isLeft ? "lg:text-right" : ""}`}>
                      {stage.detail}
                    </p>
                    <div className={`mt-4 inline-flex items-center rounded-md border border-white/[0.06] bg-ink-950/60 px-2.5 py-1.5 ${isLeft ? "lg:ml-auto" : ""}`}>
                      <code className="font-mono text-[11px] text-cedar-300">
                        {stage.artifact}
                      </code>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
