import { site } from "../content/data.ts";

const signals = [
  ["01", "Requirements become contracts", "Stable IDs and domains keep intent addressable."],
  ["02", "Intent becomes deterministic", "Typed IR gives the compiler one source of truth."],
  ["03", "Deploys become evidence", "Verification, hashes, and signatures travel together."],
];

export default function HeroV2() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-28 sm:pt-36 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-[0.42]" />
        <div className="absolute -right-[12%] -top-40 h-[720px] w-[720px] rounded-full bg-radial-fade opacity-80 blur-3xl" />
        <div className="absolute -left-[18%] top-[28%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(188,122,60,0.12),transparent_68%)] blur-3xl" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="max-w-xl animate-fade-up">
            <a href={site.releases} target="_blank" rel="noreferrer" className="group mb-7 inline-flex items-center gap-2 rounded-full border border-cedar-500/25 bg-cedar-500/[0.08] px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-cedar-200 transition-colors hover:border-cedar-400/50 hover:bg-cedar-500/[0.14]">
              <span className="dot" />
              {site.version} · open source
              <span className="text-cedar-400 transition-transform group-hover:translate-x-0.5">↗</span>
            </a>

            <h1 className="display-1 text-[52px] tracking-tightest text-white sm:text-[72px] lg:text-[78px]">
              Turn intent into
              <span className="mt-2 block text-accent-gradient">policy you can prove.</span>
            </h1>

            <p className="mt-7 max-w-lg text-[16px] leading-7 text-ink-300 sm:text-[17px]">
              cedrus is the typed control plane for Cedar authorization.
              Translate requirements into deterministic, verified, auditable
              policy bundles — without losing the thread between prose and production.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#quickstart" className="btn btn-primary h-12 px-5">Start with cedrus <span aria-hidden>→</span></a>
              <a href="#pipeline" className="btn btn-ghost h-12 px-5">See the control plane</a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5 text-[11px] font-mono uppercase tracking-[0.13em] text-ink-500">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cedar-400" />Apache 2.0</span>
              <span>Python 3.11+</span>
              <span>Offline-first</span>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms] lg:mt-10">
            <div className="absolute -inset-12 -z-10 rounded-full bg-cedar-500/[0.09] blur-3xl" />
            <div className="absolute -right-4 -top-8 z-10 hidden rounded-xl border border-cedar-300/20 bg-ink-900/90 px-3.5 py-3 shadow-2xl backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-cedar-300"><span className="dot" /> release gate</div>
              <div className="mt-1 text-[13px] font-medium text-white">Verified before deploy</div>
            </div>

            <div className="surface overflow-hidden shadow-soft">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" /></div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">cedrus / hr / HR-042</span>
                <span className="rounded-md border border-cedar-500/30 bg-cedar-500/10 px-2 py-1 text-[10px] font-mono text-cedar-300">verified</span>
              </div>

              <div className="grid divide-y divide-white/[0.06] lg:grid-cols-[0.9fr_1.1fr] lg:divide-x lg:divide-y-0">
                <div className="p-6">
                  <div className="eyebrow">requirement</div>
                  <div className="mt-5 font-mono text-[12px] leading-7 text-ink-300">
                    <div className="text-ink-600"># HR-042.md</div>
                    <div><span className="text-cedar-300">domain</span>: hr</div>
                    <div className="mt-4 text-white">Only the album owner can</div>
                    <div className="text-white">view private photos.</div>
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-ink-600"><span className="h-px flex-1 bg-white/[0.08]" /><span className="text-cedar-400">compile</span><span className="h-px flex-1 bg-white/[0.08]" /></div>
                </div>

                <div className="bg-gradient-to-br from-cedar-500/[0.07] to-transparent p-6">
                  <div className="flex items-center justify-between"><div className="eyebrow">compiled cedar</div><span className="font-mono text-[10px] text-emerald-300">valid</span></div>
                  <div className="mt-5 font-mono text-[12px] leading-7 text-ink-300">
                    <div><span className="text-cedar-300">permit</span> <span className="text-ink-500">(</span></div>
                    <div className="pl-5">principal == <span className="text-amber-200">User::"alice"</span>,</div>
                    <div className="pl-5">action == <span className="text-amber-200">Action::"viewPhoto"</span>,</div>
                    <div className="pl-5">resource <span className="text-cedar-300">is</span> <span className="text-amber-200">Photo</span></div>
                    <div><span className="text-ink-500">);</span></div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/[0.07] bg-black/20 px-3 py-2"><div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-600">verify</div><div className="mt-1 text-[12px] text-white">0 findings</div></div>
                    <div className="rounded-lg border border-white/[0.07] bg-black/20 px-3 py-2"><div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-600">bundle</div><div className="mt-1 text-[12px] text-emerald-300">signed</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-6 z-10 hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-ink-950/90 px-3 py-2 text-[10px] font-mono text-ink-400 shadow-xl backdrop-blur-md sm:flex"><span className="text-cedar-300">sha256</span><span>7f3a…b21c</span><span className="text-ink-600">·</span><span className="text-emerald-300">signed bundle</span></div>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3">
          {signals.map(([number, title, body]) => (
            <div className="bg-ink-950/70 p-5 sm:p-6" key={number}>
              <div className="font-mono text-[10px] tracking-[0.18em] text-cedar-400">{number}</div>
              <div className="mt-3 text-[14px] font-medium text-white">{title}</div>
              <div className="mt-2 text-[12px] leading-5 text-ink-500">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
