---
name: frontend-starter
description: Create or update PRODUCT.md and DESIGN.md, then build features in this React frontend boilerplate using its feature-based boundaries, ui-v1 components, local/HTTP model contracts, light/dark themes, SVG icons, 3D, motion and loading patterns. Use when starting a client frontend from this starter or extending its features and design guidance.
---

# Frontend starter

Support the requested frontend without choosing a business product on the user's behalf. The starter includes a technical collection example, not an approved domain for every client.

## Locate and choose the task

Identify the target project root and read its AGENTS.md, PRODUCT.md and DESIGN.md when present. Inspect package.json, app.config.json, design.tokens.json and the files being changed. If the target is outside the starter, use the caller's explicit paths; do not write into the source boilerplate by accident.

- **Brief/design request or new client project:** follow [references/briefs.md](references/briefs.md) and create/update both PRODUCT.md and DESIGN.md. Use the [product template](assets/PRODUCT.template.md) and [design template](assets/DESIGN.template.md) as coverage prompts; render actual project content, not literal placeholders. Existing confirmed requirements and identity take precedence.
- **Feature/code request:** follow [references/implementation.md](references/implementation.md). Read the project's docs/ARCHITECTURE.md, docs/CODE_GUIDE.md, docs/DATA_MODEL.md and docs/DESIGN_GUIDE.md before adding folders/files. For a narrow change, preserve relevant settled context rather than re-interviewing the whole product.
- **3D/motion/loading request:** also read docs/3D_MOTION_LOADING.md and inspect the existing shared implementation before adding libraries.
- **Research/review/proposal only:** inspect the relevant artifacts and selected upstream guidance, then return the requested findings or plan. Do not implement a proposed feature or rewrite PRODUCT/DESIGN unless requested. Determine the outcome from the whole request: a combined request to research and apply changes authorizes both within its stated scope.

Ask focused questions only for missing information that changes the work. Continue independent work while waiting. Record noncritical proposals/assumptions visibly, preserve open decisions, and never infer user approval from silence.

## Use the requested frontend skills

For implementation, component/design-system or QA work, read [the project skill routing and compatibility decisions](../../docs/AI_SKILLS.md). Load the relevant entrypoint in .agents/skills and only its needed references. The six source-pinned skills cover React performance, composition, shadcn, TypeScript, Tailwind v4 and browser testing. Apply them to the installed Vite/React/Query/Radix stack; preserve project public APIs, canonical tokens and build typechecking. A brief-only request still writes the requested documents without initializing another application or design-system showcase.

## Implementation invariants

- app -> pages -> features -> shared. Outside a feature consume its named public index.ts. Keep feature model pure, API independent of UI, and sibling features independent. The project architecture checker enforces important edges.
- Model/schema and ownership precede fixture/API integration. Infer TypeScript types from Zod. Keep the same contract across local and HTTP adapters; preserve errors, abort signals and failed saves. UI uses query/mutation hooks, not direct fetch/storage.
- Reuse all available ui-v1 primitives as needed. Keep original source provenance and runtime exports. Prefer the existing shared feedback, SVG Lucide icons, theme, local font and semantic tokens.
- No emoji or Unicode glyphs as icons. Decorative SVGs are aria-hidden; icon-only controls have accessible names. Do not add dead controls or decorative KPI/data claims.
- Provide actual loading/pending/empty/error/retry/success/disabled behavior. Both themes, keyboard/focus and reduced motion apply to every surface. Keep the whole word demo out of client-facing copy/exports; identify illustrative data honestly.
- Lazy-load 3D, bound DPR, use demand rendering, provide DOM information/fallback, and keep HTML loading/controls outside Canvas. Respect asset licensing/attribution and do not fetch arbitrary remote assets or use paid APIs without the required authorization.

## Finish with evidence

Run npm run check and npm run build when code changes. Run meaningful browser checks for the changed workflows, viewport sizes and both themes. Test fallback/error paths as well as success. A document-only task checks document completeness, links and unresolved placeholders; it does not claim runtime acceptance.

Summarize the documents/features changed, actual checks and remaining limits. Do not publish, install globally, send messages or change unrelated tool configuration unless the user requests it.
