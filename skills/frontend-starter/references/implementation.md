# Feature implementation workflow

Read the target project's CODE_GUIDE and inspect features/example-items as a complete working example when it is present. For a fresh client, define the intended feature from PRODUCT; do not promote the collection sample into the client's business domain.

Read docs/AI_SKILLS.md for task-based upstream skill routing and the Vite/ui-v1 adaptations before changing implementation or tests. Do not transplant Next.js, a second query library, a Base UI preset, or uncompiled advanced-type snippets into this stack.

1. Define ownership and the data model: identity, relationships/scope, state transitions, validation, time/decimal handling, source and error shape. Place schemas/types in feature/model.
2. Define feature/api repository contracts, the requested local/HTTP adapter, and query/mutation hooks. Validate at boundaries. Add tenant/user scope to keys when required, with real backend enforcement tracked separately.
3. Add pure feature/lib helpers only for real calculations/filtering. Keep tests close to the feature. Do not create empty directories to suggest completeness.
4. Add PascalCase UI components for container/form/list/detail. Use shared ui-v1, icons and feedback. Keep loading/pending and validation behavior real, handle errors without fake local success, and preserve IME/focus.
5. Export a minimal named public API at index.ts; compose it in pages and register the route in app. Avoid peer feature imports and deep imports from pages/app.
6. Use semantic CSS and the local font in both themes. Keep controls accessible, write task-specific copy and avoid generic cards/KPIs/decorative effects. For scene work use the shared wrappers and documented asset policy.
7. Test meaningful rules, storage/network failures and actual browser workflows. Run architecture, typecheck, lint, tests and build. Report the difference between local sample behavior and actual external backend verification.

For a future repo that has already removed the example, follow this ownership pattern and its existing code rather than recreating illustrative data unasked.
