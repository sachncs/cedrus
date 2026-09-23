.PHONY: setup test lint typecheck check build site-install site-check

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
	cd site && npm run build
