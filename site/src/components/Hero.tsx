import { cedarOutput } from "../lib/data.ts";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Token = { type: string; value: string };
function tokenizeCedar(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    // Namespaced types (PhotoFlash::Foo)
    if (/[A-Za-z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_:]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (word.includes("::")) {
        tokens.push({ type: "tok-attr", value: word });
        i = j;
        continue;
      }
      const kws = new Set([
        "permit",
        "forbid",
        "when",
        "unless",
        "principal",
        "action",
        "resource",
        "context",
      ]);
      if (kws.has(word)) {
        tokens.push({ type: "tok-key", value: word });
        i = j;
        continue;
      }
      tokens.push({ type: "", value: word });
      i = j;
      continue;
    }
    if (line[i] === '"') {
      const end = line.indexOf('"', i + 1);
      const stop = end === -1 ? line.length : end + 1;
      tokens.push({ type: "tok-str", value: line.slice(i, stop) });
      i = stop;
      continue;
    }
    if (/[(){}\[\];,:.]/.test(line[i])) {
      tokens.push({ type: "tok-pun", value: line[i] });
      i++;
      continue;
    }
    tokens.push({ type: "", value: line[i] });
    i++;
  }
  return tokens;
}

function highlightCedar(src: string) {
  return src.split("\n").map((line, i) => {
    const tokens = tokenizeCedar(line);
    const html = tokens
      .map((t) =>
        t.type
          ? `<span class="${t.type}">${escape(t.value)}</span>`
          : escape(t.value),
      )
      .join("");
    return (
      <div key={i} className="flex">
        <span className="select-none w-8 shrink-0 text-right pr-4 text-ink-700">
          {i + 1}
        </span>
        <span className="whitespace-pre" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  });
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-[0.45]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[1100px] rounded-full bg-radial-fade blur-3xl" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(188,122,60,0.18),transparent_50%,rgba(85,113,255,0.12),transparent_85%)] blur-3xl opacity-70 animate-pulse-soft" />
      </div>

      <div className="container-x">
        {/* Status pill */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <a
            href="https://github.com/sachncs/cedrus/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-ink-200 hover:bg-white/[0.05] transition-colors"
          >
            <span className="dot shrink-0" />
            <span className="font-mono text-[11px] tracking-wide text-cedar-300 shrink-0">v0.7.0</span>
            <span className="text-ink-500 shrink-0">·</span>
            <span className="truncate">First release after the data-model rewrite</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ink-400 group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Headline */}
        <h1 className="display-1 text-center text-[40px] sm:text-[68px] md:text-[88px] lg:text-[104px] tracking-tightest">
          <span className="block text-gradient">The compiler for</span>
          <span className="block">
            <span className="text-accent-gradient">authorization intent.</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-[16.5px] sm:text-[18px] leading-relaxed text-ink-300 animate-fade-up [animation-delay:120ms]">
          cedrus is the operating system for versioning, drafting, validating,
          verifying, and deploying Cedar policies at enterprise scale. Every
          policy is a typed, addressable object — managed like code, gated
          like infrastructure.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up [animation-delay:200ms]">
          <a href="#quickstart" className="btn btn-primary h-11 px-5">
            <span>Install cedrus</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://github.com/sachncs/cedrus"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost h-11 px-5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.2.8-.6v-2c-3.1.7-3.7-1.5-3.7-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.2.9-.3 1.9-.4 2.8-.4s2 .1 2.8.4c2.2-1.5 3-1.2 3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.6 5.3-5.1 5.6.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.6C23.3 5.5 18.3.5 12 .5z"/>
            </svg>
            <span>View on GitHub</span>
          </a>
          <a href="#pipeline" className="btn btn-ghost h-11 px-5">
            <span>How it works</span>
          </a>
        </div>

        {/* Quick stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-4 animate-fade-up [animation-delay:300ms]">
          {[
            { v: "561", l: "Tests" },
            { v: "91%", l: "Coverage" },
            { v: "3.11+", l: "Python" },
            { v: "Apache 2.0", l: "License" },
          ].map((s) => (
            <div key={s.l} className="bg-ink-950/60 px-6 py-5 text-center">
              <div className="font-display text-2xl font-semibold tracking-tight text-white">{s.v}</div>
              <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Product preview */}
        <div className="mt-20 sm:mt-28 relative">
          <div className="absolute -inset-x-20 -top-10 -bottom-10 -z-10 rounded-[40px] bg-gradient-to-b from-cedar-500/10 via-transparent to-transparent blur-3xl" />
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Window chrome */}
      <div className="surface overflow-hidden shadow-soft max-w-full">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-ink-500">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/>
            </svg>
            cedrus · HR-042 · hr
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-500">
            <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5">intent</span>
            <span className="rounded-md border border-cedar-500/30 bg-cedar-500/10 px-1.5 py-0.5 text-cedar-300">cedar</span>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {/* Left: requirement → intent */}
          <div className="p-5 sm:p-6 min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="eyebrow">requirement</span>
              <span className="text-[10px] font-mono text-ink-500">HR-042.md</span>
            </div>
            <div className="code-block">
              <div><span className="tok-com"># front matter</span></div>
              <div><span className="tok-key">id</span>: <span className="tok-str">HR-042</span></div>
              <div><span className="tok-key">domain</span>: <span className="tok-str">hr</span></div>
              <div>&nbsp;</div>
              <div className="text-ink-300">Only the album owner can</div>
              <div className="text-ink-300">view private photos.</div>
            </div>

            <div className="my-4 flex items-center gap-3 text-ink-600">
              <span className="h-px flex-1 bg-white/[0.06]" />
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-cedar-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">compile</span>
              <span className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="eyebrow">intent</span>
              <span className="text-[10px] font-mono text-ink-500">typed ir</span>
            </div>
            <div className="code-block">
              <div><span className="tok-key">Intent</span><span className="tok-pun">(</span></div>
              <div>  <span className="tok-attr">effect</span>=<span className="tok-str">"permit"</span><span className="tok-pun">,</span></div>
              <div>  <span className="tok-attr">principal</span>=<span className="tok-fn">Specific</span><span className="tok-pun">(</span><span className="tok-str">"User"</span><span className="tok-pun">,</span> <span className="tok-str">"alice"</span><span className="tok-pun">)</span><span className="tok-pun">,</span></div>
              <div>  <span className="tok-attr">action</span>=<span className="tok-fn">Named</span><span className="tok-pun">(</span><span className="tok-str">"viewPhoto"</span><span className="tok-pun">)</span><span className="tok-pun">,</span></div>
              <div>  <span className="tok-attr">resource</span>=<span className="tok-fn">IsType</span><span className="tok-pun">(</span><span className="tok-str">"Photo"</span><span className="tok-pun">)</span><span className="tok-pun">,</span></div>
              <div><span className="tok-pun">)</span></div>
            </div>
          </div>

          {/* Right: compiled cedar */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-cedar-500/[0.04] to-transparent min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-cedar-300">cedar</span>
                <span className="text-[10px] font-mono text-ink-500">bundle.cedar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="dot" />
                <span className="font-mono text-[10px] text-ink-400">valid</span>
              </div>
            </div>
            <div className="code-block rounded-xl bg-ink-950/80 border border-white/[0.04] p-4">
              {highlightCedar(cedarOutput)}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-cedar-500/15 text-cedar-300">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[12px] text-white">Verify passed</div>
                  <div className="text-[10px] font-mono text-ink-500">0 shadowed · 0 redundant · coverage ok</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-ink-500">sha256</div>
                <div className="font-mono text-[11px] text-cedar-300">7f3a…b21c</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating glass card */}
      <div className="hidden lg:block absolute -left-12 -bottom-10 w-64 rotate-[-3deg] animate-drift">
        <div className="glass rounded-2xl p-4 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <span className="dot" />
            <span className="eyebrow text-ink-300">deploy</span>
          </div>
          <div className="code-block text-[11px]">
            <div>$ cedrus deploy push \</div>
            <div>&nbsp;&nbsp;--domain hr \</div>
            <div>&nbsp;&nbsp;--target dist/hr</div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute -right-10 -top-8 w-56 rotate-[3deg] animate-drift [animation-delay:1.2s]">
        <div className="glass rounded-2xl p-4 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-cedar-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/>
            </svg>
            <span className="eyebrow text-ink-300">guard</span>
          </div>
          <div className="code-block text-[11px]">
            <div><span className="tok-key">Guard</span><span className="tok-pun">.</span><span className="tok-fn">check</span><span className="tok-pun">(</span><span className="tok-str">url</span><span className="tok-pun">)</span></div>
            <div><span className="tok-com"># rejects loopback,</span></div>
            <div><span className="tok-com"># link-local, RFC1918</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
