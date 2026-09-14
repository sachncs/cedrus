import Reveal from "./Reveal";

export default function Problem() {
  return (
    <section className="section relative">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The problem</span>
          <h2 className="display-2 mt-4 text-[32px] sm:text-[44px] md:text-[56px] tracking-tightest text-gradient">
            Authorization is the part of the stack
            <br className="hidden sm:block" />
            <span className="text-ink-400">nobody wants to own.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-400">
            Policies scattered across repos. Hand-written Cedar drifting from
            requirements. No review, no tests, no audit trail. One missed
            <span className="text-white"> forbid </span>
            and production is wide open.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Prose in the loop",
              body:
                "When the LLM sees raw requirements, it also sees your instructions. Hostile text impersonates commands.",
            },
            {
              title: "Silent drift",
              body:
                "Generated policies drift from intent. Compilers reformat, validators accept, audits pass — until something breaks.",
            },
            {
              title: "Deploys without proof",
              body:
                "Bundles are pushed with no record of what shipped. Incidents take hours of archaeology to reconstruct.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="surface surface-hover h-full p-7 transition-colors">
                <div className="flex items-center gap-2 text-[11px] font-mono text-ink-500">
                  <span className="text-cedar-400">0{i + 1}</span>
                  <span>·</span>
                  <span className="uppercase tracking-widest">pain</span>
                </div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-400">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
