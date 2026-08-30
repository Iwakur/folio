# Learning path

You do not need to learn the whole stack before using Folio. Learn only the
authoring layer first, then move deeper into the engine when you want to change
how the knowledge is processed or displayed.

## Priority for writing knowledge

Learn these first, in this order:

1. **Markdown**
   - headings and paragraphs;
   - bold and italic text;
   - ordered and unordered lists;
   - links and images;
   - tables, quotations, and fenced code blocks.

2. **Basic TeX/LaTeX mathematical notation**
   - inline math with `$...$`;
   - display math with `$$...$$`;
   - powers and indices;
   - fractions and roots;
   - Greek letters and mathematical symbols;
   - sums, vectors, matrices, and units;
   - the subset of commands supported by KaTeX.

3. **Folio's small MDX vocabulary**
   - `Grid`;
   - `Definition`;
   - `Formula`;
   - `Example`;
   - `Note`;
   - `Warning`;
   - `CommonMistake`;
   - `Summary`;
   - `Arrow` and `Mermaid` when needed.

4. **Mermaid, only when a note needs diagrams**
   - begin with flowcharts;
   - later learn sequence, state, timeline, or other diagram types as required.

This is enough to create normal knowledge pages. Writing notes does not require
JavaScript, TypeScript, Astro, React, backend development, or database skills.

## Learning path for the whole project

The following path covers everything needed to understand, maintain, and
extend Folio. The order follows the way a knowledge file becomes a page.

### 1. Markdown and document structure

Learn:

- CommonMark and GitHub Flavoured Markdown;
- semantic heading hierarchy;
- links, images, tables, code blocks, and quotations;
- accessible alternative text;
- the difference between portable Markdown and Obsidian-specific syntax.

Why: Markdown contains most of the actual knowledge and should remain the most
portable part of the project.

### 2. TeX/LaTeX notation and KaTeX

Learn:

- how mathematical expressions are written in TeX notation;
- the difference between inline and display mathematics;
- common commands and environments;
- which features KaTeX supports;
- how long equations behave on narrow screens and paper.

Why: TeX-like notation is the source syntax, while KaTeX is the renderer that
turns supported notation into web output.

### 3. MDX fundamentals

Learn:

- how MDX combines Markdown with JSX-like components;
- component opening, closing, nesting, and properties;
- how Markdown behaves inside components;
- why Folio deliberately forbids most JavaScript and imports inside notes;
- the boundary between portable content and custom Folio semantics.

Why: MDX provides the controlled escape hatch that ordinary Markdown lacks.

### 4. HTML semantics and accessibility

Learn:

- document landmarks such as `header`, `nav`, `aside`, `main`, and `article`;
- correct heading structure;
- lists, figures, captions, and asides;
- accessible labels and alternative text;
- keyboard navigation and focus states;
- why meaning should not depend only on colour.

Why: Astro ultimately generates HTML. Good source content cannot compensate for
incorrect or inaccessible HTML structure in the engine.

### 5. CSS—the most important engine skill

Learn:

- the box model, cascade, inheritance, and custom properties;
- typography, spacing, colour, and readable line length;
- CSS Grid and Flexbox;
- intrinsic sizing, `minmax()`, `auto-fit`, and `clamp()`;
- responsive breakpoints and container-aware thinking;
- overflow handling for math, code, tables, and diagrams;
- print styles with `@media print` and `@page`;
- page-breaking controls such as `break-inside`;
- the limitations of A4 paper compared with responsive screens.

Why: Folio exists primarily to solve Word's linear use of space. CSS decides
how semantic blocks share width, reflow on mobile, and fit onto printable pages.

### 6. Astro fundamentals

Learn:

- `.astro` component structure;
- component props and slots;
- layouts and file-based pages;
- static site generation;
- dynamic routes and `getStaticPaths()`;
- content collections, glob loaders, schemas, `getCollection()`, and `render()`;
- passing a shared component map into MDX content;
- the difference between build-time code and browser-side scripts.

Why: Astro is the rendering engine that converts the filesystem knowledge base
into static routes without requiring a server or client framework.

### 7. TypeScript fundamentals

Learn:

- primitive, object, array, and union types;
- interfaces and optional properties;
- function parameter and return types;
- imports and exports;
- generics at a basic reading level;
- narrowing possibly missing values;
- how Astro generates types for content collections.

Why: TypeScript protects component contracts, frontmatter, navigation data, and
engine changes. Advanced type-level programming is not needed.

### 8. JavaScript fundamentals

Learn:

- variables, functions, arrays, objects, and modules;
- `map`, `filter`, `sort`, and `Set`;
- DOM selection and attributes;
- promises, `async`/`await`, and dynamic imports;
- the difference between server/build execution and browser execution.

Why: Navigation construction uses ordinary JavaScript/TypeScript, and Mermaid
requires a small browser-side script. Folio should otherwise ship as little
client JavaScript as possible.

### 9. Mermaid and SVG

Learn:

- Mermaid diagram syntax and accessibility labels;
- SVG `viewBox`, paths, text, scaling, and coordinate systems;
- responsive SVG sizing;
- print-safe strokes, colours, and contrast;
- when to create a reusable component instead of inline artwork.

Why: Some knowledge is clearer visually, but diagrams must remain textual or
vector-based, responsive, printable, and safe inside grids.

### 10. Node.js and npm basics

Learn:

- what `package.json` and `package-lock.json` do;
- installing dependencies with `npm install`;
- running package scripts;
- semantic version ranges at a basic level;
- checking dependency updates and security reports carefully;
- the difference between source, dependencies, cache, and build output.

Why: Node and npm operate the toolchain, although they are not part of the
static site runtime delivered to readers.

### 11. Git and GitHub

Learn:

- repository status, diffs, commits, branches, and merges;
- ignoring generated files;
- reviewing changes before committing;
- resolving conflicts in MDX and code;
- GitHub repositories and Actions;
- deploying static output to GitHub Pages;
- Astro's `site` and `base` settings for project-site URLs.

Why: Git is the history system, collaboration mechanism, and eventual trigger
for static deployment.

### 12. Testing and quality assurance

Learn:

- running `npm run check` and `npm run build`;
- interpreting Astro, MDX, and TypeScript errors;
- checking representative real notes rather than artificial examples;
- browser developer tools;
- responsive viewport testing;
- keyboard and basic accessibility testing;
- print preview and PDF inspection;
- testing long equations, unequal card lengths, tables, and diagrams.

Why: A technically successful build does not prove that a page studies or
prints well.

### 13. Performance and static-web fundamentals

Learn:

- HTML/CSS/JavaScript asset delivery;
- bundle size and lazy loading;
- image and font costs;
- caching and relative/base-aware asset paths;
- progressive enhancement;
- why Mermaid should load only when a diagram is present.

Why: The knowledge base should stay fast and usable without turning into a
large client-side application.

## What is intentionally unnecessary now

Do not spend project-learning time on these unless the project scope changes:

- React, Vue, Svelte, or another client framework;
- databases and SQL;
- backend APIs or server frameworks;
- authentication and user management;
- CMS architecture;
- state-management libraries;
- analytics, tracking, dashboards, or productivity systems;
- PWA and offline synchronization;
- advanced JavaScript framework tooling.

## Practical milestones

### Milestone 1: Knowledge author

You can write Markdown, formulas, and existing semantic components. You can add
a note and verify it in the development server and print preview.

### Milestone 2: Visual maintainer

You understand HTML and CSS well enough to adjust typography, cards, responsive
grid behavior, mobile navigation, and A4 print output.

### Milestone 3: Engine maintainer

You understand Astro, content collections, TypeScript, and the navigation/render
flow. You can add a semantic component without requiring imports in every note.

### Milestone 4: Project maintainer

You can manage dependencies, tests, Git history, performance, accessibility,
and GitHub Pages deployment while preserving the content-language contract.

## Where to learn each subject

Use primary documentation whenever possible:

- Markdown: <https://spec.commonmark.org/> and GitHub's Markdown documentation.
- MDX: <https://mdxjs.com/docs/what-is-mdx/>.
- Astro: <https://docs.astro.build/>.
- CSS and HTML: <https://developer.mozilla.org/>.
- TypeScript: <https://www.typescriptlang.org/docs/>.
- KaTeX: <https://katex.org/docs/supported>.
- Mermaid: <https://mermaid.js.org/intro/>.
- Git: <https://git-scm.com/doc>.
- GitHub Pages: <https://docs.github.com/pages>.

For project-specific syntax, always follow `docs/SYNTAX_CONVENTIONS.md`.
