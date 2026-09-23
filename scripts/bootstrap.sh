#!/usr/bin/env bash
set -Eeuo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

python_bin="${PYTHON_BIN:-python3}"
venv_dir="${VIRTUAL_ENV:-$repo_root/.venv}"

if [[ ! -x "$venv_dir/bin/python" ]]; then
  "$python_bin" -m venv "$venv_dir"
fi

"$venv_dir/bin/python" -m pip install --upgrade pip
"$venv_dir/bin/python" -m pip install --editable ".[dev,llm]"

if command -v npm >/dev/null 2>&1; then
  npm --prefix site ci
else
  printf '%s\n' "npm is required to set up the Astro site dependencies." >&2
  exit 1
fi

printf '%s\n' "Environment ready. Run: make check"
