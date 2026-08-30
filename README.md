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

- [Project guide](docs/PROJECT_GUIDE.md) explains the structure, runtime flow,
  commands, and technologies to learn.
- [Learning path](docs/LEARNING_PATH.md) separates the minimum knowledge-author
  skills from the complete path for maintaining the project.
- [Syntax conventions](docs/SYNTAX_CONVENTIONS.md) is the authoritative
  reference for Markdown, MDX, math, media, Mermaid, and custom Folio syntax.
- [Agent guidance](AGENTS.md) contains mandatory instructions for coding agents.
