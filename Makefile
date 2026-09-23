.PHONY: setup test lint typecheck check build site-install site-check release-check

PYTHON ?= .venv/bin/python
PIP ?= .venv/bin/pip

setup:
	./scripts/bootstrap.sh

test:
	$(PYTHON) -m pytest --cov=cedrus --cov-report=term-missing --cov-fail-under=87

lint:
	$(PYTHON) -m ruff check .

typecheck:
	$(PYTHON) -m mypy

check: lint typecheck test

build:
	$(PYTHON) -m build
	$(PYTHON) -m twine check dist/*

site-install:
	cd site && npm ci

site-check:
	cd site && npm audit --audit-level=high
	cd site && npm run build && cp dist/index.html dist/404.html && touch dist/.nojekyll
	$(PYTHON) scripts/check_site.py site/dist

release-check:
	$(PYTHON) scripts/check_release_consistency.py
	$(PYTHON) scripts/check_markdown_links.py README.md CHANGELOG.md CONTRIBUTING.md SECURITY.md SUPPORT.md RELEASE_CHECKLIST.md
