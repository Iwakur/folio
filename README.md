# Folio

A static school knowledge base that turns curated MDX notes into responsive,
space-efficient study pages and printable A4 sheets.

The source of truth is `src/content/knowledge/`. External Obsidian vaults and
document folders are drafting spaces; the site does not depend on them.

## Start

```sh
npm install
npm run dev
```

Then open the local URL printed by Astro. Use `npm run build` to create the
static site in `dist/`.

## Documentation

- `docs/PROJECT_GUIDE.md` explains the structure, runtime flow, commands, and
  technologies to learn.
- `docs/LEARNING_PATH.md` separates the minimum knowledge-author skills from the
  complete path for maintaining the entire project.
- `docs/SYNTAX_CONVENTIONS.md` is the authoritative reference for Markdown,
  MDX, math, frontmatter, Mermaid, and custom Folio syntax.
- `docs/AUTHORING.md` is the short note-writing tutorial.
- `STATIC_SCHOOL_KNOWLEDGE_SPEC.md` is the complete product brief.
- `AGENTS.md` contains mandatory guidance for coding agents.
