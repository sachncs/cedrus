"""Smoke-test the static Astro output used by GitHub Pages."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ASSET_RE = re.compile(r"(?:href|src)=[\"']([^\"']+)[\"']")


def _local_target(target: str) -> Path | None:
    parsed = urlparse(target)
    if parsed.scheme or parsed.netloc or target.startswith(("#", "data:", "mailto:")):
        return None
    return Path(parsed.path.lstrip("/"))


def main(argv: list[str]) -> int:
    output = Path(argv[0]) if argv else Path("site/dist")
    index = output / "index.html"
    required = [
        index,
        output / "404.html",
        output / ".nojekyll",
        output / "sitemap-index.xml",
        output / "favicon.svg",
    ]
    missing = [str(path) for path in required if not path.exists()]
    if not index.exists():
        sys.stderr.write("site smoke check failed: missing index.html\n")
        return 1

    html = index.read_text(encoding="utf-8")
    checks = {
        "canonical URL": 'rel="canonical" href="https://sachncs.github.io/cedrus/"' in html,
        "PyPI link": "https://pypi.org/project/cedrus/" in html,
        "release link": "https://github.com/sachncs/cedrus/releases" in html,
    }
    missing.extend(name for name, passed in checks.items() if not passed)
    for raw_target in ASSET_RE.findall(html):
        target = _local_target(raw_target)
        if target is None or str(target) == "":
            continue
        if str(target).startswith("cedrus/"):
            target = Path(str(target).removeprefix("cedrus/"))
        if not (output / target).exists():
            missing.append(f"{raw_target} (referenced by index.html)")

    if missing:
        sys.stderr.write("site smoke check failed:\n")
        for item in missing:
            sys.stderr.write(f"  - {item}\n")
        return 1
    sys.stdout.write(f"site smoke check passed: {output}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
