#!/usr/bin/env bash
# End-to-end PhotoFlash workflow driven through the cedrus CLI.
#
# Usage: bash scripts/run.sh
#
# All commands run offline (no LLM calls) so this script is safe to
# execute in CI.

set -euo pipefail

SCOPE_GENERATE=(
    --principal specific
    --principal-type User
    --principal-id alice
    --action named
    --action-name viewPhoto
    --resource is_type
    --resource-type Photo
    --offline
)

SCOPE_APPLY=(
    --principal specific
    --principal-type User
    --principal-id alice
    --action named
    --action-name viewPhoto
    --resource is_type
    --resource-type Photo
)

cedrus --workspace . requirement add hr/requirements/HR-001.md --domain hr
cedrus --workspace . requirement add hr/requirements/HR-042.md --domain hr

cedrus --workspace . policy generate HR-042 \
    --domain hr "${SCOPE_GENERATE[@]}"

cedrus --workspace . policy apply HR-042 \
    --domain hr "${SCOPE_APPLY[@]}" \
    --no-scenarios

cedrus --workspace . policy generate HR-001 \
    --domain hr "${SCOPE_GENERATE[@]}"

cedrus --workspace . policy apply HR-001 \
    --domain hr "${SCOPE_APPLY[@]}" \
    --no-scenarios

cedrus --workspace . --json check
cedrus --workspace . --json verify --domain hr
cedrus --workspace . deploy bundle --domain hr --output ./dist/hr

echo "Workspace ready. Bundle written to dist/hr."
