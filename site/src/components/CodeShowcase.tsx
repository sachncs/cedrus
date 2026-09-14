import Reveal from "./Reveal";
import { cliSnippets, apiSnippet } from "../lib/data.ts";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type CliToken = { type: string; value: string };
function tokenizeCli(line: string): CliToken[] {
  const tokens: CliToken[] = [];
  let i = 0;
  while (i < line.length) {
    // Shell prompt at start of line
    if (i === 0 && line.startsWith("$ ")) {
      tokens.push({ type: "tok-pun", value: "$" });
      i += 1;
      continue;
    }
    // Comment
    if (line[i] === "#") {
      tokens.push({ type: "tok-com", value: line.slice(i) });
      i = line.length;
      continue;
    }
    // Strings (single + double quoted)
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      const end = line.indexOf(quote, i + 1);
      const stop = end === -1 ? line.length : end + 1;
      tokens.push({ type: "tok-str", value: line.slice(i, stop) });
      i = stop;
      continue;
    }
    // Long flag --foo or short flag --foo-bar
    if (line[i] === "-" && line[i + 1] === "-" && /[a-z-]/i.test(line[i + 2] || "")) {
      let j = i + 2;
      while (j < line.length && /[a-z-]/i.test(line[j])) j++;
      tokens.push({ type: "tok-attr", value: line.slice(i, j) });
      i = j;
      continue;
    }
    // Words
    if (/[A-Za-z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      const keywords = new Set([
        "cedrus",
        "pip",
        "python",
        "cd",
        "cat",
        "export",
        "EOF",
      ]);
      tokens.push({ type: keywords.has(word) ? "tok-key" : "", value: word });
      i = j;
      continue;
    }
    // Anything else
    tokens.push({ type: "", value: line[i] });
    i++;
  }
  return tokens;
}

function highlightCli(src: string) {
  return src.split("\n").map((line, i) => {
    const tokens = tokenizeCli(line);
    const html = tokens
      .map((t) =>
        t.type
          ? `<span class="${t.type}">${escape(t.value)}</span>`
          : escape(t.value),
      )
      .join("");
    return (
      <div key={i} className="leading-7 whitespace-pre">
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  });
}

type PyToken = { type: string; value: string };
function tokenizePython(line: string): PyToken[] {
  const tokens: PyToken[] = [];
  let i = 0;
  while (i < line.length) {
    // Comment
    if (line[i] === "#") {
      tokens.push({ type: "tok-com", value: line.slice(i) });
      i = line.length;
      continue;
    }
    // String
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      const end = line.indexOf(quote, i + 1);
      const stop = end === -1 ? line.length : end + 1;
      tokens.push({ type: "tok-str", value: line.slice(i, stop) });
      i = stop;
      continue;
    }
    // Kwargs (only keyword= pattern, not --foo)
    if (
      /[a-z_]/i.test(line[i]) &&
      line[i] !== "-"
    ) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      i = j;
      // Look ahead for `=`
      if (line[i] === "=") {
        tokens.push({ type: "tok-attr", value: word });
        continue;
      }
      // Class / function call
      if (line[i] === "(") {
        if (/^[A-Z]/.test(word)) {
          tokens.push({ type: "tok-fn", value: word });
        } else {
          tokens.push({ type: "", value: word });
        }
        continue;
      }
      // After `.` → method call
      if (line[i] === ".") {
        tokens.push({ type: "", value: word });
        continue;
      }
      const kws = new Set([
        "from",
        "import",
        "as",
        "assert",
        "with",
        "return",
        "raise",
        "None",
        "True",
        "False",
      ]);
      if (kws.has(word)) {
        tokens.push({ type: "tok-key", value: word });
        continue;
      }
      tokens.push({ type: "", value: word });
      continue;
    }
    // Numbers
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /\d/.test(line[j])) j++;
      tokens.push({ type: "tok-num", value: line.slice(i, j) });
      i = j;
      continue;
    }
    // Method call via dot
    if (line[i] === ".") {
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i + 1, j);
      if (line[j] === "(") {
        tokens.push({ type: "tok-pun", value: "." });
        tokens.push({ type: "tok-fn", value: word });
        i = j;
        continue;
      }
      tokens.push({ type: "", value: line.slice(i, j) });
      i = j;
      continue;
    }
    tokens.push({ type: "", value: line[i] });
    i++;
  }
  return tokens;
}

function highlightPython(src: string) {
  return src.split("\n").map((line, i) => {
    const tokens = tokenizePython(line);
    const html = tokens
      .map((t) =>
        t.type
          ? `<span class="${t.type}">${escape(t.value)}</span>`
          : escape(t.value),
      )
      .join("");
    return (
      <div key={i} className="flex">
        <span className="select-none w-6 shrink-0 text-right pr-3 text-ink-700">
          {i + 1}
        </span>
        <span className="whitespace-pre" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  });
}

export default function CodeShowcase() {
  return (
    <section id="quickstart" className="section relative">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Quick start</span>
          <h2 className="display-2 mt-4 text-[32px] sm:text-[44px] md:text-[56px] tracking-tightest text-gradient">
            CLI and Python API.
            <br className="hidden sm:block" />
            <span className="text-ink-400">One-to-one parity.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-400">
            Every subcommand has a one-to-one equivalent in the public Python
            namespace. Use whichever fits your team's shape — both speak the
            same underlying protocol.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* CLI */}
          <Reveal className="min-w-0">
            <div className="surface overflow-hidden min-w-0">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                </div>
                <span className="font-mono text-[11px] text-ink-500">~/acme — zsh</span>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-ink-300">
                  CLI
                </span>
              </div>
              <div className="bg-ink-950/80 px-5 py-5 font-mono text-[12.5px] text-ink-200 overflow-x-auto">
                <div className="text-cedar-300 font-mono text-[10px] uppercase tracking-widest mb-3">
                  01 — workspace
                </div>
                <div className="min-w-fit">
                  {highlightCli(cliSnippets.init)}
                </div>
                <div className="my-4 h-px bg-white/[0.04]" />

                <div className="text-cedar-300 font-mono text-[10px] uppercase tracking-widest mb-3">
                  02 — requirement
                </div>
                <div className="min-w-fit">
                  {highlightCli(cliSnippets.requirement)}
                </div>
                <div className="my-3 h-px bg-white/[0.04]" />
                <div className="min-w-fit">
                  {highlightCli(cliSnippets.add)}
                </div>
                <div className="my-4 h-px bg-white/[0.04]" />

                <div className="text-cedar-300 font-mono text-[10px] uppercase tracking-widest mb-3">
                  03 — generate
                </div>
                <div className="min-w-fit">
                  {highlightCli(cliSnippets.generate)}
                </div>
                <div className="my-4 h-px bg-white/[0.04]" />

                <div className="text-cedar-300 font-mono text-[10px] uppercase tracking-widest mb-3">
                  04 — verify + deploy
                </div>
                <div className="min-w-fit">
                  {highlightCli(cliSnippets.verify)}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Python API */}
          <Reveal delay={120} className="min-w-0">
            <div className="surface overflow-hidden min-w-0">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-cedar-400" fill="currentColor">
                    <path d="M11.5 2C6.8 2 4 4.6 4 8.3v2.2h7.5v.7H4c-2.5 0-4.5 1.5-5 4.3-.6 3.2.6 5.1.6 5.1S.8 22 3.3 22h2.2v-2.5c0-2.5 2.2-4.7 4.7-4.7h7.5c2.3 0 4-1.9 4-4.2V8.3c0-2.3-2-4.3-4.5-4.3h-5.7zm-4 1.6c.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4z"/>
                    <path d="M20.5 9h-2.3v2.5c0 2.6-2.2 4.7-4.7 4.7H6c-2.3 0-4 1.9-4 4.2v3.3c0 2.3 2 4.3 4.5 4.3h5.7c2.3 0 4.5-1.6 4.5-3.8v-2.2H9.5v-.7H20.5c2.5 0 3.5-2.5 3.5-2.5s1-3-.5-5.7c-.8-1.7-3-1.1-3-1.1zm-1 11.4c.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4z"/>
                  </svg>
                  <span className="font-mono text-[11px] text-ink-500">policy.py</span>
                </div>
                <span className="rounded-md border border-cedar-500/30 bg-cedar-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cedar-300">
                  Python API
                </span>
              </div>
              <div className="bg-ink-950/80 px-3 py-4 font-mono text-[11.5px] leading-[1.65] text-ink-200 overflow-x-auto">
                {highlightPython(apiSnippet)}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Install strip */}
        <Reveal delay={120}>
          <div className="mt-10 surface p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <div className="eyebrow text-cedar-300">Install</div>
              <div className="mt-2 text-[14px] text-ink-300">
                Python 3.11+. Runtime: <code className="font-mono text-cedar-300">cedarpy</code>,
                <code className="font-mono text-cedar-300"> httpx</code>,
                <code className="font-mono text-cedar-300"> litellm</code>.
              </div>
            </div>
            <div className="w-full sm:w-auto rounded-xl border border-white/[0.06] bg-ink-950/80 px-4 py-3 font-mono text-[12.5px] text-ink-200 overflow-x-auto">
              <span className="tok-pun">$</span> pip install <span className="tok-fn">cedrus</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
