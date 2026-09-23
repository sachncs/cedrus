"""Validate the versions used by the package, site, and release tag."""

from __future__ import annotations

import json
import re
import sys
import tomllib
from pathlib import Path


def _read_versions(root: Path) -> dict[str, str]:
    with (root / "pyproject.toml").open("rb") as stream:
        project = tomllib.load(stream)["project"]
    package_text = (root / "cedrus" / "__init__.py").read_text(encoding="utf-8")
    package_match = re.search(
        r'^__version__\s*=\s*["\']([^"\']+)', package_text, re.MULTILINE
    )
    if package_match is None:
        raise ValueError("cedrus/__init__.py does not declare __version__")
    package_version = package_match.group(1)
    with (root / "site" / "package.json").open(encoding="utf-8") as stream:
        site_version = json.load(stream)["version"]
    readme = (root / "README.md").read_text(encoding="utf-8")
    readme_match = re.search(
        r"authorization intent — v([0-9.]+)", readme, flags=re.IGNORECASE
    )
    if readme_match is None:
        raise ValueError("README.md does not declare a release version")
    site_data = (root / "site" / "src" / "content" / "data.ts").read_text(
        encoding="utf-8"
    )
    homepage = project["urls"]["Homepage"]
    if f'repo: "{homepage}"' not in site_data:
        raise ValueError("site metadata repository does not match project Homepage")
    if 'url: "https://sachncs.github.io/cedrus"' not in site_data:
        raise ValueError("site metadata URL is not the production Pages URL")
    return {
        "package": str(package_version),
        "site": str(site_version),
        "readme": readme_match.group(1),
    }


def main(argv: list[str]) -> int:
    root = Path(__file__).resolve().parents[1]
    expected_tag = argv[0].removeprefix("v") if argv else None
    try:
        versions = _read_versions(root)
    except (OSError, KeyError, TypeError, ValueError) as error:
        sys.stderr.write(f"release consistency check failed: {error}\n")
        return 1

    values = set(versions.values())
    if len(values) != 1:
        sys.stderr.write(f"release versions diverge: {versions}\n")
        return 1
    version = values.pop()
    if expected_tag is not None and expected_tag != version:
        sys.stderr.write(
            f"tag {expected_tag} does not match release version {version}\n"
        )
        return 1
    sys.stdout.write(f"release version consistent: {version}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
