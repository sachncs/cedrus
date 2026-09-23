export const site = {
  name: "cedrus",
  tagline: "The compiler for authorization intent",
  description:
    "cedrus is the operating system for versioning, drafting, validating, verifying, and deploying Cedar policies at enterprise scale.",
  repo: "https://github.com/sachncs/cedrus",
  url: "https://sachncs.github.io/cedrus",
  version: "v0.8.0",
  license: "Apache 2.0",
};

export const heroStats = [
  { label: "Python", value: "3.11+" },
  { label: "License", value: "Apache 2.0" },
];

export const pipelineStages = [
  {
    id: "need",
    title: "Need",
    summary: "A requirement Markdown with stable id and front matter.",
    detail: "The unit of governance. The contract that gates schema validation and the verify-domain pass.",
    artifact: "hr/requirements/HR-042.md",
  },
  {
    id: "draft",
    title: "Draft",
    summary: "A scope-typed proposal bound to a Need.",
    detail: "Principal, action, resource — typed up front. No regex, no string templating, no prose in the compiler.",
    artifact: "Draft(id=\"hr-hr-042\")",
  },
  {
    id: "intent",
    title: "Intent",
    summary: "The typed intermediate representation.",
    detail: "The single contract between every generator and the deterministic compiler. The compiler never sees prose.",
    artifact: "Intent(...)",
  },
  {
    id: "compile",
    title: "Cedar",
    summary: "Schema-validated, deterministic source.",
    detail: "Intent.compile() is the only code that emits Cedar. Calling it twice with the same intent produces identical source.",
    artifact: "permit(principal, action, resource);",
  },
  {
    id: "verify",
    title: "Verify",
    summary: "AST-based static checks.",
    detail: "Flags shadowed forbids, redundant duplicates, missing coverage, malformed Cedar. Exact-signature match only.",
    artifact: "Verifier(schema).verify(...)",
  },
  {
    id: "deploy",
    title: "Deploy",
    summary: "SHA-256-signed bundles, DNS-pinned HTTP.",
    detail: "Atomic writes, SSRF guard rejects loopback and RFC1918. Audit row records body_sha256, idempotency_key, retry_count.",
    artifact: "Client.push(bundle)",
  },
];

export const features = [
  {
    id: "typed-ir",
    label: "01",
    title: "A typed intermediate representation.",
    body: "Intent is the single contract between every generator and the deterministic compiler. The compiler never sees prose — only typed scopes.",
    accent: "amber",
  },
  {
    id: "deterministic",
    label: "02",
    title: "Deterministic Cedar compiler.",
    body: "Intent.compile() is the only code that emits Cedar syntax. Same intent in, byte-identical source out. Schema-validated before persistence.",
    accent: "amber",
  },
  {
    id: "verifier",
    label: "03",
    title: "Static symbolic verifier.",
    body: "Verifier(schema).verify() flags shadowing, redundancy, missing action / need / entity-type coverage, and malformed Cedar. No silent failures.",
    accent: "amber",
  },
  {
    id: "ssrf",
    label: "04",
    title: "SSRF-safe deployer.",
    body: "Every HTTP target is checked against loopback, link-local, and RFC1918 by Guard.check(url). DNS is resolved once and pinned for the connection's lifetime.",
    accent: "amber",
  },
  {
    id: "audit",
    label: "05",
    title: "Tamper-evident audit chain.",
    body: "Every state transition is recorded in the deployments table. body_sha256, idempotency_key, and retry_count travel with the row.",
    accent: "amber",
  },
  {
    id: "prompt-fence",
    label: "06",
    title: "Prompt-fenced LLM.",
    body: "User-controlled content is wrapped in <<<…>>> markers with a data-only preamble. Hostile requirement text cannot impersonate instructions.",
    accent: "amber",
  },
];

export const useCases = [
  {
    title: "Enterprise authorization",
    body: "Versioned, reviewable Cedar policies gated through CI. Every policy is a typed, addressable object.",
  },
  {
    title: "Multi-team governance",
    body: "Domain-scoped workspaces, per-domain schemas, and a verify-domain pass before any deploy is allowed.",
  },
  {
    title: "Regulated industries",
    body: "Auditable deploys with idempotency keys, retry counts, and SHA-256 bundle integrity. Built for compliance review.",
  },
];

export const cliSnippets = {
  init: `# Initialize a workspace at the current directory.
$ cedrus init --path .`,

  requirement: `# Write a requirement Markdown file.
$ cat > hr/requirements/HR-042.md <<'EOF'
---
id: HR-042
domain: hr
---

Only the album owner can view private photos.
EOF`,

  add: `# Register the requirement.
$ cedrus requirement add hr/requirements/HR-042.md --domain hr`,

  generate: `# Generate a draft policy deterministically (no LLM needed).
$ cedrus policy generate HR-042 \\
    --domain hr \\
    --principal specific --principal-type User --entity-id alice \\
    --action named --action-name viewPhoto \\
    --resource is_type --resource-type Photo \\
    --offline`,

  verify: `# Verify statically and build a deployment bundle.
$ cedrus verify --domain hr
$ cedrus deploy bundle --domain hr --output dist/hr
$ cedrus deploy push --domain hr --target dist/hr`,
};

export const apiSnippet = `from pathlib import Path
from cedrus import (
    Space, Schema, Need,
    Draft, Principal, Action, Resource,
    Verifier, Offline,
)

# Open a workspace (SQLite-backed).
ws = Space.open(Path("./acme"))

# Load the schema and the requirement.
schema = Schema.from_json_file(Path("./acme/hr/schema.json"))
need = ws.add_requirement_file(Path("./acme/hr/requirements/HR-042.md"))

# Build a scope-typed draft.
draft = Draft(
    id="hr-hr-042",
    requirement=need,
    principal=Principal(kind="specific", type="User", id="alice"),
    action=Action(kind="named", name="viewPhoto", namespace="PhotoFlash"),
    resource=Resource(kind="is_type", type="PhotoFlash::Photo"),
)

# Generate a typed proposal deterministically.
proposal = draft.generate(schema, Offline())
cedar = proposal.intent.compile().cedar

# Verify statically before any deploy is allowed.
policies = ws.list_compiled_policies("hr")
report = Verifier(schema).verify(
    policies,
    requirement_ids=["HR-042"],
    action_names=sorted(schema.action_names()),
    entity_type_names=sorted(schema.entity_type_names()),
    domain="hr",
)
assert report.passed`;

export const cedarOutput = `permit (
    principal == PhotoFlash::User::"alice",
    action    == PhotoFlash::Action::"viewPhoto",
    resource  == PhotoFlash::Photo::*
);`;

export const footerLinks = {
  product: [
    { label: "Overview", href: "#top" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Features", href: "#features" },
    { label: "Quick start", href: "#quickstart" },
  ],
  project: [
    { label: "Repository", href: "https://github.com/sachncs/cedrus" },
    { label: "Documentation", href: "https://github.com/sachncs/cedrus/blob/main/README.md" },
    { label: "CHANGELOG", href: "https://github.com/sachncs/cedrus/blob/main/CHANGELOG.md" },
    { label: "Roadmap", href: "https://github.com/sachncs/cedrus/blob/main/todo.md" },
  ],
  governance: [
    { label: "License", href: "https://github.com/sachncs/cedrus/blob/main/LICENSE" },
    { label: "Security", href: "https://github.com/sachncs/cedrus/blob/main/SECURITY.md" },
    { label: "Contributing", href: "https://github.com/sachncs/cedrus/blob/main/CONTRIBUTING.md" },
    { label: "Code of Conduct", href: "https://github.com/sachncs/cedrus/blob/main/CODE_OF_CONDUCT.md" },
  ],
};
