import { footerLinks, site } from "../content/data.ts";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,2fr]">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cedar-300 via-cedar-500 to-cedar-800 shadow-glow">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-950" fill="currentColor">
                  <path d="M12 3 L19 11 L16 11 L20 16 L17 16 L21 21 L3 21 L7 16 L4 16 L8 11 L5 11 Z" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                cedrus
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-ink-400">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-mono text-ink-500">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1">
                {site.version}
              </span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1">
                {site.license}
              </span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1">
                Python 3.11+
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="eyebrow text-ink-500">Product</div>
              <ul className="mt-5 space-y-3 text-[13px]">
                {footerLinks.product.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-ink-300 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-ink-500">Project</div>
              <ul className="mt-5 space-y-3 text-[13px]">
                {footerLinks.project.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-ink-300 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-ink-500">Governance</div>
              <ul className="mt-5 space-y-3 text-[13px]">
                {footerLinks.governance.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-ink-300 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-ink-500">
            © {year} cedrus contributors. Released under the Apache 2.0 License.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-ink-500">
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="h-3 w-px bg-white/[0.08]" />
            <a
              href={`${site.repo}/issues`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Issues
            </a>
            <span className="h-3 w-px bg-white/[0.08]" />
            <a
              href={`${site.repo}/blob/main/SECURITY.md`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
