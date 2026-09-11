#!/usr/bin/env bash
# End-to-end Todo workflow driven through the cedrus CLI.
#
# Usage: bash run.sh

set -euo pipefail

SCOPE_GENERATE=(
    --principal is_type
    --principal-type User
    --action named
    --action-name createTask
    --resource is_type
    --resource-type Task
    --offline
)

SCOPE_APPLY_OWNER=(
    --principal is_type
    --principal-type User
    --action named
    --action-name completeTask
    --resource is_type
    --resource-type Task
)

cedrus --workspace . requirement add tasks/requirements/TSK-001.md --domain tasks
cedrus --workspace . requirement add tasks/requirements/TSK-002.md --domain tasks

cedrus --workspace . policy generate TSK-001 \
    --domain tasks "${SCOPE_GENERATE[@]}"

cedrus --workspace . policy apply TSK-001 \
    --domain tasks "${SCOPE_GENERATE[@]}" \
    --no-scenarios

cedrus --workspace . policy generate TSK-002 \
    --domain tasks "${SCOPE_APPLY_OWNER[@]}"

cedrus --workspace . policy apply TSK-002 \
    --domain tasks "${SCOPE_APPLY_OWNER[@]}" \
    --no-scenarios

cedrus --workspace . --json check
cedrus --workspace . --json verify --domain tasks
cedrus --workspace . deploy bundle --domain tasks --output ./dist/tasks

echo "Workspace ready. Bundle written to dist/tasks."
