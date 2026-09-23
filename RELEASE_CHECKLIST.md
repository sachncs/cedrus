# Release checklist

Use this checklist for every tagged release. The release workflow is the
authoritative publisher; manual steps are required for the final operator
verification.

## Before tagging

- [ ] Update `CHANGELOG.md` with user-visible changes and migration notes.
- [ ] Confirm the version in `cedrus/__init__.py`, `site/package.json`, and
      the README agrees with `python scripts/check_release_consistency.py`.
- [ ] Run `./scripts/bootstrap.sh` and `make check`.
- [ ] Run `make build` and inspect both sdist and wheel with `twine check`.
- [ ] Run `make site-check` and verify the generated canonical URL, 404 page,
      favicon, PyPI link, and GitHub release link.
- [ ] Review dependency and secret-scan results.
- [ ] Confirm the release environment requires approval and PyPI trusted
      publishing is configured for this repository.

## Tag and publish

- [ ] Create and push the `vX.Y.Z` tag from the reviewed commit.
- [ ] Confirm the tag workflow passes Python 3.11, 3.12, and 3.13 tests.
- [ ] Confirm sdist and wheel names match the tag.
- [ ] Confirm the SBOM is generated and every distribution has a Sigstore
      signature alongside it.
- [ ] Confirm PyPI and GitHub Release uploads complete successfully.
- [ ] Confirm the Pages deployment is built from the same tag and the site
      smoke check passes.

## After publish

- [ ] Install the published wheel and sdist in clean virtual environments.
- [ ] Run `python -c "import cedrus"` and `cedrus --help` from each install.
- [ ] Verify the PyPI metadata, GitHub Release assets, signatures, and SBOM.
- [ ] Open the production Pages URL and verify navigation, canonical URL,
      favicon, 404 handling, install link, and release link.
- [ ] Record any rollback decision and retain the prior known-good bundle.
