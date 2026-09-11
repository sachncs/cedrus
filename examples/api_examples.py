"""Runnable Python API recipes for cedrus.

Run with::

    python examples/api_examples.py

Each example uses an in-memory workspace, so no files are written to
disk. The examples are intentionally short so you can read the whole
file top to bottom.
"""

from __future__ import annotations

from pathlib import Path

from cedrus import (
    Action,
    Case,
    Draft,
    Intent,
    Llm,
    Need,
    Offline,
    Principal,
    Report,
    Resource,
    Run,
    Schema,
    Space,
    Validator,
    Verifier,
)

PHOTOFLASH_SCHEMA = {
    "PhotoFlash": {
        "entityTypes": {
            "User": {
                "shape": {
                    "type": "Record",
                    "attributes": {"role": {"type": "String"}},
                }
            },
            "Photo": {
                "shape": {
                    "type": "Record",
                    "attributes": {"private": {"type": "Boolean"}},
                }
            },
        },
        "actions": {
            "viewPhoto": {
                "appliesTo": {
                    "principalTypes": ["User"],
                    "resourceTypes": ["Photo"],
                }
            }
        },
    }
}


def make_workspace() -> Space:
    """Build a fresh in-memory workspace for the recipes."""
    return Space.in_memory(Path("/tmp/cedrus-example"))


def make_schema() -> Schema:
    """Build a Schema from the PhotoFlash mapping."""
    return Schema.from_mapping(PHOTOFLASH_SCHEMA)


def make_requirement(identifier: str, body: str) -> Need:
    """Build a Need object with the given identifier and body."""
    return Need(
        id=identifier,
        text=body,
        domain="hr",
        source_path=Path(f"/tmp/{identifier}.md"),
    )


def recipe_compile() -> None:
    """Compile a typed Intent into Cedar source."""
    intent = Intent(
        id="hr-hr-001",
        requirement_id="HR-001",
        effect="permit",
        principal=Principal(kind="is_type", type_name="PhotoFlash::User"),
        action=Action(kind="named", name="viewPhoto", namespace="PhotoFlash"),
        resource=Resource(kind="is_type", type_name="PhotoFlash::Photo"),
    )
    source = intent.compile()
    print("compile ->", source.cedar.replace("\n", " "))


def recipe_validate() -> None:
    """Validate a hand-written Cedar policy against the schema."""
    cedar = (
        'permit (principal is PhotoFlash::User, '
        'action == PhotoFlash::Action::"viewPhoto", '
        'resource is PhotoFlash::Photo);'
    )
    report = Validator(make_schema()).validate([cedar])
    print("validate ->", report.passed, report.formatted)


def recipe_offline_generator() -> Draft:
    """Run the deterministic Offline on a draft policy."""
    schema = make_schema()
    draft = Draft(
        id="hr-hr-042",
        requirement=make_requirement(
            "HR-042",
            "Only admins can view photos when accessed from the office network.",
        ),
        principal=Principal(kind="is_type", type_name="PhotoFlash::User"),
        action=Action(kind="named", name="viewPhoto", namespace="PhotoFlash"),
        resource=Resource(kind="is_type", type_name="PhotoFlash::Photo"),
    )
    proposal = draft.generate(schema, Offline())
    print("offline_generator ->", proposal.intent.effect, proposal.unresolved)
    return draft


def recipe_litellm_generator_factory() -> Llm:
    """Build a Llm bound to a specific model."""
    return Llm(
        model="openai/gpt-4o",
        timeout=30,
        retries=2,
        max_tokens=1024,
        fallbacks=("anthropic/claude-3-5-sonnet",),
    )


def recipe_run(cedar: str) -> None:
    """Run a small scenario suite against the compiled policy."""
    schema = make_schema()
    scenarios = [
        Case(
            name="alice-can-view",
            principal='PhotoFlash::User::"alice"',
            action='PhotoFlash::Action::"viewPhoto"',
            resource='PhotoFlash::Photo::"p1"',
            context={},
            expected="Allow",
        ),
        Case(
            name="bob-denied",
            principal='PhotoFlash::User::"bob"',
            action='PhotoFlash::Action::"viewPhoto"',
            resource='PhotoFlash::Photo::"p1"',
            context={},
            expected="Deny",
        ),
    ]
    report = Run(scenarios).evaluate(schema, [cedar])
    print("run ->", report.passed, [(r.scenario.name, r.actual) for r in report.results])


def recipe_verify(policies: list, requirement_ids: list) -> Report:
    """Run static verification on the compiled policies."""
    schema = make_schema()
    report = Verifier(schema).verify(
        policies,
        requirement_ids=requirement_ids,
        action_names=sorted(schema.action_names()),
        entity_type_names=sorted(schema.entity_type_names()),
        domain="hr",
    )
    print(
        "verify ->",
        report.passed,
        [(f.kind, f.message) for f in report.findings],
    )
    return report


def recipe_deployment(workspace: Space) -> None:
    """Build a deployment bundle and write it to a local directory."""
    workspace.init_domain("hr")
    manifest = workspace.build_bundle("hr", metadata={"channel": "staging"})
    target = Path("/tmp/cedrus-example/dist")
    workspace.write_bundle(manifest, target)
    print(
        "deployment ->",
        target,
        "hash=",
        manifest.bundle_hash,
        "policies=",
        list(manifest.policy_ids),
    )


def main() -> None:
    workspace = make_workspace()
    workspace.init_domain("hr")
    workspace.repository.add_requirement(make_requirement("HR-042", "..."))

    print("== compile ==")
    recipe_compile()
    print("== validate ==")
    recipe_validate()
    print("== offline_generator ==")
    draft = recipe_offline_generator()
    print("== litellm_generator_factory ==")
    generator = recipe_litellm_generator_factory()
    print("litellm_generator ->", generator.model, generator.fallbacks)
    print("== run ==")
    cedar = (
        'permit (principal is PhotoFlash::User, '
        'action == PhotoFlash::Action::"viewPhoto", '
        'resource is PhotoFlash::Photo);'
    )
    recipe_run(cedar)
    print("== verify ==")
    recipe_verify([], ["HR-042"])
    print("== deployment ==")
    recipe_deployment(workspace)


if __name__ == "__main__":
    main()

