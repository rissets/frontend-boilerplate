# Write PRODUCT.md and DESIGN.md

## Gather only what is needed

Read the request, existing documents, supplied references/assets and current code. Establish the product/audience, problem/job, primary workflow, scope, data/backend stage, platforms/devices, roles/sensitivity, and identity constraints. Ask a compact question for consequential gaps; a missing font preference can use the starter default as an explicit proposal, while an unknown business domain must not be invented.

Distinguish:

- confirmed: user statement or inspected artifact, with its source;
- proposed/assumed: a choice to validate, never called approved;
- open: a missing fact that affects dependent work.

For a known narrow implementation task, use the settled brief; do not require a new approval ritual. For brief-only work, write the two documents without building an unsolicited application.

## PRODUCT.md

Use assets/PRODUCT.template.md. Replace all template tokens with project-specific prose. Cover positioning/audience, operating context, primary workflows and outcomes, actors/permissions when relevant, data entities/relationships/states, integration state, scope/non-goals, product principles, evidence/open decisions and observable acceptance.

Use the user's vocabulary. Include the real source and lifecycle of data. Frontend-local illustrative records do not imply a connected server, payment, authentication, or collaboration. Do not invent testimonials, savings, adoption metrics, client names or backend capability. If data facts remain unknown, state the open question instead of inventing a schema or customer record.

## DESIGN.md

Use assets/DESIGN.template.md and the project's DESIGN_GUIDE. Record actual decisions the next developer can implement: task/information hierarchy, layout/density, font and type scale, semantic light/dark tokens, spacing/radius, component/interaction mapping, icon treatment, motion/loading/fallback, asset provenance, responsive behavior and accessibility checks.

Inspect existing style before choosing a new one. Preserve identity when extending a surface. Choose the interface from the audience's work rather than a generic landing/dashboard template. Reference real UI/code/assets and explain which property matters. Without supplied references, propose a coherent direction and mark it proposed; do not label it user approved.

Use a shipped local font unless another font has been sourced and licensed for the project. Keep design.tokens.json canonical; identify any requested token change explicitly. Use SVG Lucide icons. Both themes, loading/error states and reduced motion are part of the decision, not a later appendix.

When documenting an implemented design, align existing derived metadata such as .impeccable/design.json with the observed system. For a proposal-only brief, label the proposed differences; do not change implementation tokens or claim that the proposal is already applied.

## Validate before returning

Read the generated files end-to-end. Ensure PRODUCT and DESIGN agree about users, workflows, data status and scope. Replace all {{template_tokens}}; no TODO/TBD scaffold pretending to be finished. Open questions may remain when explicitly labeled and tied to dependent work. Check referenced local paths, package availability, provenance/URLs and acceptance claims against the inspected evidence.

Do not replace existing confirmed content wholesale for a small update. Do not start implementation unless it is included in the user's request.
