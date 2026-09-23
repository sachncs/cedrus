import Reveal from "./Reveal";
import { site } from "../content/data.ts";

const facts = [
  {
    k: site.version,
    v: "Production-ready release",
    body: "A typed authorization compiler with deterministic Cedar output, static verification, and auditable deployment bundles.",
  },
  {
    k: "typed",
    v: "Python API + CLI",
    body: "The public package and command-line workflow share the same typed contracts and validation gates.",
  },
  {
    k: "deterministic",
    v: "Same intent → byte-identical Cedar",
    body: "Intent.compile() is the only code that emits Cedar. Calling it twice with the same intent produces identical source.",
  },
  {
    k: "auditable",
    v: "body_sha256 + idempotency_key + retry_count",
    body: "Every deploy records the audit row. SHA-256 detects corruption; HMAC / Ed25519 is recommended for tamper evidence.",
  },
];

export default function Metrics() {
  return (
    <section className="relative py-24 sm:py-32 border-y border-white/[0.05] bg-gradient-to-b from-ink-950 via-ink-900/40 to-ink-950">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] md:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 60}>
              <div className="group relative h-full bg-ink-950/70 p-7 transition-colors hover:bg-ink-950/50">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cedar-300">
                  {f.k}
                </div>
                <div className="mt-3 text-[16px] font-semibold tracking-tight text-white">
                  {f.v}
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ink-400">
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
