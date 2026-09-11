"""Check that local Markdown links resolve to existing files.

Extracts ``[text](target)`` links from each Markdown file passed on
the command line and verifies that local targets (anything that does
not start with ``http://`` / ``https://`` / ``mailto:``) point to a
file that exists on disk. Pure-stdlib, no network access, intended
for the CI ``docs`` job.

Exits with status 0 when every local link resolves; status 1 with a
report of missing targets otherwise.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
IMAGE_RE = re.compile(r"!\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
INLINE_CODE_BLOCK = re.compile(r"`[^`\n]+`")


def _extract_targets(markdown: str) -> list[str]:
    """Return every link / image target in ``markdown`` in source order."""
    text = INLINE_CODE_BLOCK.sub("", markdown)
    return LINK_RE.findall(text) + IMAGE_RE.findall(text)


def _is_external(target: str) -> bool:
    """Return ``True`` when ``target`` is not a local filesystem path."""
    lowered = target.lower().strip()
    return (
        lowered.startswith(("http://", "https://", "mailto:", "tel:", "#"))
    )


def _check(markdown_paths: list[Path]) -> tuple[int, list[str]]:
    """Return ``(exit_code, missing_targets)`` for every link seen."""
    missing: list[str] = []
    for md_path in markdown_paths:
        text = md_path.read_text(encoding="utf-8")
        for target in _extract_targets(text):
            if _is_external(target):
                continue
            anchor_removed = target.split("#", 1)[0].split("?", 1)[0]
            if not anchor_removed:
                continue
            resolved = (md_path.parent / anchor_removed).resolve()
            if not resolved.exists():
                missing.append(f"{md_path}: missing link target {target!r}")
    return (0 if not missing else 1), missing


def main(argv: list[str]) -> int:
    """CLI entry point."""
    if not argv:
        return 2
    code, missing = _check([Path(arg) for arg in argv])
    if code != 0:
        for _line in missing:
            pass
    return code


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
