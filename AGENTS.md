# Repository guidance

This repository is a static, MDX-first school knowledge base and its Astro
rendering engine. Read `docs/PROJECT_GUIDE.md` before architectural changes and
`docs/SYNTAX_CONVENTIONS.md` before content-format changes.

Use `docs/PROJECT_GUIDE.md` as the repository map and
`docs/SYNTAX_CONVENTIONS.md` as the authoritative content-language contract.
`docs/LEARNING_PATH.md` describes the intended knowledge boundaries for authors
and maintainers.

## Non-negotiable principles

- Keep knowledge in `src/content/knowledge/` and presentation in the engine.
- Preserve the portable MDX subset: Markdown, `$`/`$$` math, and the documented
  semantic components. Do not put imports, scripts, inline styles, or manual
  layout hacks in ordinary notes.
- Treat responsive grid use and clean A4 printing as core functionality.
- New note components must obey the content/component contract in the spec.
- Prefer build-time Astro and CSS. Add browser JavaScript only for features that
  cannot work without it.
- Do not couple the build to external Obsidian vaults or document folders.
- Keep the architecture small; do not introduce a CMS, database, accounts,
  tracking, or a client framework without an explicit change in scope.

## Before finishing a change

- Run `npm run check` and `npm run build` when dependencies are available.
- Test a representative note, not only an isolated component.
- For layout changes, consider narrow mobile, wide desktop, overflowing math,
  unequal card lengths, and print preview.
- Update both `docs/SYNTAX_CONVENTIONS.md` and `docs/PROJECT_GUIDE.md` when the
  public MDX vocabulary changes.
