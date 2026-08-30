# Project guide

This document explains how to understand, run, and extend Folio. Start with the
README for the shortest introduction, then read this guide, then consult the
full specification for product decisions.

## What the project is

Folio has two parts:

1. **Knowledge base:** curated `.mdx` files containing durable school knowledge.
2. **Rendering engine:** Astro components and CSS that turn those files into a
   navigable, responsive website and compact printable sheets.

The project exists because Word-like pages are too linear. Folio keeps long
explanations linear when that is clearest, but allows definitions, formulas,
examples, warnings, and diagrams to occupy the available width together.

```text
external Obsidian vault / documents
        drafts and research
                 ↓ manual editorial promotion
src/content/knowledge/**/*.mdx
        canonical knowledge
                 ↓ Astro static build
dist/
        website and printable pages
```

External drafts provide context but are never required to build the site.

## Repository map

```text
folio/
├── AGENTS.md                         Rules for coding agents
├── README.md                         Short project entry point
├── STATIC_SCHOOL_KNOWLEDGE_SPEC.md   Product and architecture specification
├── astro.config.mjs                  MDX, math, and static-build configuration
├── package.json                      Commands and JavaScript dependencies
├── package-lock.json                 Exact dependency resolution
├── tsconfig.json                     Strict TypeScript configuration
├── docs/
│   ├── AUTHORING.md                  Short note-writing tutorial
│   ├── PROJECT_GUIDE.md              This architecture and operation guide
│   └── SYNTAX_CONVENTIONS.md         Authoritative content-language reference
└── src/
    ├── components/
    │   ├── Card.astro                Shared semantic-card shell
    │   ├── Definition.astro          Semantic wrappers
    │   ├── Formula.astro
    │   ├── Example.astro
    │   ├── Note.astro
    │   ├── Warning.astro
    │   ├── CommonMistake.astro
    │   ├── Summary.astro
    │   ├── Grid.astro                Responsive content grid
    │   ├── Arrow.astro               Simple SVG relationship
    │   ├── Mermaid.astro             Mermaid diagram renderer
    │   ├── SidebarTree.astro         Recursive navigation UI
    │   └── index.ts                  Components exposed to every MDX page
    ├── content/knowledge/
    │   ├── fr/math/suites.mdx        French example note
    │   └── en/physics/newtons-laws.mdx
    ├── content.config.ts             Content location and frontmatter schema
    ├── layouts/KnowledgeLayout.astro Shared HTML shell
    ├── lib/navigation.ts             Folder tree to sidebar conversion
    ├── pages/
    │   ├── [...slug].astro           Generates one route per knowledge file
    │   ├── [language]/index.astro     Language-root redirect
    │   └── index.astro               Site-root redirect
    └── styles/global.css             Screen, grid, component, and print styles
```

Generated directories are not source:

- `node_modules/`: installed dependencies;
- `.astro/`: generated Astro types and content cache;
- `dist/`: final static build.

They can be recreated and are excluded from Git.

## How a note becomes a page

For `src/content/knowledge/fr/math/suites.mdx`:

1. `src/content.config.ts` discovers it through the `knowledge` collection.
2. Astro assigns the entry ID `fr/math/suites`.
3. `src/pages/[...slug].astro` creates `/fr/math/suites/` at build time.
4. The page passes the central component map to the MDX renderer.
5. `navigation.ts` converts all French entry paths into a folder tree.
6. `KnowledgeLayout.astro` combines the sidebar and rendered note.
7. `global.css` lays out the page for desktop, mobile, and A4 printing.

The header theme switcher stores the chosen screen theme in the browser. Print
styles always reset the document to the coherent light palette, regardless of
the selected screen theme; only navigation UI is removed from print.

Adding a normal note should require only adding its `.mdx` file.

## Requirements and commands

Install a current Node.js LTS release and npm. From the repository root:

```sh
npm install
```

Start the development server with live reload:

```sh
npm run dev
```

Check Astro and TypeScript diagnostics:

```sh
npm run check
```

Create the static production output:

```sh
npm run build
```

Preview the generated production site locally:

```sh
npm run preview
```

The deployable output is `dist/`. There is no server runtime or database.

## Common work

### Add a note

Create:

```text
src/content/knowledge/<language>/<subject>/<topic>.mdx
```

Follow `docs/SYNTAX_CONVENTIONS.md`. The file path determines its URL and
navigation location.

### Add a language or subject

Create the directory naturally by adding the first note. No registry is
required. For example, `uk/chemistry/atoms.mdx` introduces both the Ukrainian
language root and its Chemistry navigation group.

### Change all semantic cards

Edit `Card.astro` for shared structure or `global.css` for shared styling. Edit
a specific wrapper such as `Formula.astro` only when its semantics differ.

### Add a semantic component

1. Confirm the concept repeats and cannot use an existing component.
2. Create the component in `src/components/`.
3. Export it from `src/components/index.ts` so MDX can use it without imports.
4. Make it container-responsive, overflow-safe, accessible, and printable.
5. Add it to `docs/SYNTAX_CONVENTIONS.md` and test it in a real note.

### Change navigation

Path parsing and tree creation live in `src/lib/navigation.ts`. Rendering lives
in `SidebarTree.astro`. Keep those responsibilities separate.

### Change print behavior

Use the `@media print` section of `global.css`. Print should hide navigation,
retain semantic distinctions, use A4 space efficiently, and avoid splitting
important cards where practical.

## Languages and technologies to know

You do not need to master everything before writing notes.

The complete staged curriculum is maintained in `docs/LEARNING_PATH.md`. The
summary below exists only as a quick orientation.

### To write knowledge

Learn these first:

1. **Markdown:** headings, paragraphs, emphasis, lists, links, tables, images,
   and fenced code blocks.
2. **Basic TeX/LaTeX math notation:** fractions, powers, indices, symbols,
   vectors, matrices, and aligned equations. KaTeX renders the supported subset.
3. **The small Folio MDX vocabulary:** `Grid` and semantic components.
4. **Mermaid only when needed:** primarily flowcharts at first.

No JavaScript or Astro knowledge is needed for ordinary notes.

### To maintain the engine

Learn, roughly in this order:

1. **HTML semantics and accessibility** — the final document structure.
2. **CSS** — especially Grid, Flexbox, intrinsic sizing, responsive design,
   overflow, and print media rules. CSS is the most important engine skill for
   the non-linear layout goal.
3. **Astro components and content collections** — static page generation and
   component composition.
4. **TypeScript fundamentals** — props, interfaces, arrays, and typed content.
5. **MDX processing** — only when changing the authoring language.
6. **Small browser-side JavaScript** — currently needed mainly for Mermaid.
7. **Git and GitHub Pages** — history and deployment.

There is intentionally no React, database, API, backend, authentication, or CMS
to learn for the current architecture.

## Reading order for a new contributor or agent

1. `README.md` — purpose and first commands.
2. `docs/PROJECT_GUIDE.md` — structure and data flow.
3. `docs/SYNTAX_CONVENTIONS.md` — content language and provenance.
4. `docs/LEARNING_PATH.md` — authoring and whole-project learning paths.
5. `docs/AUTHORING.md` — concise writing examples.
6. `STATIC_SCHOOL_KNOWLEDGE_SPEC.md` — full goals, constraints, and acceptance
   criteria.
7. `AGENTS.md` — mandatory implementation rules for agents.
8. `src/content/knowledge/fr/math/suites.mdx` — representative real input.
9. `[...slug].astro`, `KnowledgeLayout.astro`, and `global.css` — the core
   rendering path.

## Architectural boundaries

- Content states meaning; CSS and components decide presentation.
- The filesystem is the navigation database.
- Git is the history system.
- MDX is an extension point, not a place for application code.
- Grid placement is automatic except for small semantic hints such as `wide`.
- Screen and print are two presentations of the same document, not duplicated
  renderers.
- A build must never depend on an external personal vault.
