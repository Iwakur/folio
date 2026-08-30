# Syntax and conventions

This is the authoritative reference for writing knowledge files. When examples
elsewhere disagree with this document, follow this document and correct the
outdated example.

## The syntax stack

Every construct in a knowledge file comes from one of these layers:

| Layer | Established by | Purpose | Portable outside Folio? |
| --- | --- | --- | --- |
| Markdown | CommonMark and GitHub Flavoured Markdown | Prose structure | Yes |
| MDX | MDX specification | Components inside Markdown | Usually readable, but components need Folio |
| Math notation | TeX/LaTeX conventions | Mathematical source notation | Usually |
| Math delimiters | `remark-math` convention | Marks inline and display math | Common, including Obsidian |
| Math rendering | KaTeX | Converts supported TeX notation to HTML | Rendering depends on KaTeX |
| Frontmatter | YAML-style Markdown frontmatter, interpreted by Astro | Page metadata | Common convention |
| Content loading and routes | Astro Content Collections | Builds files into typed static pages | Folio engine |
| Semantic components | Folio | Knowledge meaning and responsive layout | Custom to Folio |
| Diagrams | Mermaid | Textual diagram language | Portable to Mermaid-aware tools |

Primary references:

- [CommonMark specification](https://spec.commonmark.org/)
- [GitHub Markdown syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [MDX documentation](https://mdxjs.com/docs/what-is-mdx/)
- [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Astro content loader reference](https://docs.astro.build/en/reference/content-loader-reference/)
- [KaTeX supported functions](https://katex.org/docs/supported)
- [Mermaid syntax reference](https://mermaid.js.org/intro/syntax-reference.html)

## Canonical knowledge file

Knowledge files use `.mdx`, live below `src/content/knowledge/`, and follow this
shape:

```mdx
---
title: Arithmetic sequences
order: 10
description: A short optional description.
---

# Arithmetic sequences

Ordinary **Markdown** remains the default.

<Grid>
  <Definition title="Common difference">
    The difference $u_{n+1}-u_n$ is constant.
  </Definition>

  <Formula wide>
    $$u_n=u_0+nr$$
  </Formula>
</Grid>
```

## 1. Markdown conventions

These are established Markdown/GFM constructs, not Folio inventions.

````md
# Page title
## Major section
### Subsection

Normal paragraph with **bold**, *emphasis*, and `inline code`.

- unordered item
- another item

1. ordered item
2. another item

[Link text](https://example.com)
![Useful alternative text](./image.svg)

> A quotation or cited statement.

| Quantity | Unit |
| --- | --- |
| Force | N |

```text
fenced code or literal text
```
````

Conventions:

- Use one `#` heading as the visible page title.
- Increase heading depth one level at a time.
- Separate paragraphs and blocks with blank lines.
- Prefer Markdown constructs over raw HTML.
- Use descriptive link text and meaningful image alternative text.
- Do not use spaces to align page layout; layout belongs to the engine.
- Avoid Obsidian-only wiki links (`[[note]]`), embeds (`![[file]]`), callouts,
  tags-as-metadata, or block references in canonical knowledge. Convert them to
  portable Markdown or Folio semantics when promoting a draft.

## 2. MDX conventions

MDX combines Markdown with JSX-like component syntax. Folio uses only the
component part as a controlled extension point.

Allowed in normal notes:

```mdx
<Definition>...</Definition>
<Arrow from="Cause" to="Effect" />
```

Do not normally use:

- `import` or `export` statements;
- JavaScript variables, functions, or data fetching;
- event handlers or client-side application logic;
- raw layout `<div>` elements;
- inline `style` values;
- direct imports of engine components.

This restriction is a Folio convention. MDX itself permits more JavaScript,
but using it would make knowledge files fragile and less portable.

## 3. Frontmatter conventions

Frontmatter is optional metadata between `---` lines at the beginning of a
file. The current Folio schema accepts:

```yaml
---
title: Human-readable page title
order: 10
description: Optional short summary
---
```

- `title`: overrides the filename-derived display name.
- `order`: smaller numbers appear first; omitted pages default to `999`.
- `description`: optional description for future navigation or metadata use.

Do not add fields speculatively. Add a field to `src/content.config.ts` only
when the engine has a concrete use for it.

## 4. Mathematics conventions

The notation inside math is TeX/LaTeX-like; KaTeX is the actual renderer and
supports a large, documented subset of TeX. Check the KaTeX support table before
depending on an unusual command.

Inline math uses one dollar sign on each side:

```md
The value of $u_n$ depends on $n$.
```

Display math uses two dollar signs:

```md
$$
u_n=u_0+nr
$$
```

Conventions:

- Use `$...$` and `$$...$$`; do not mix in `\(...\)` or `\[...\]`.
- Put important or long equations in display math.
- Write units with `\mathrm{}` and a thin space where useful:
  `$3\,\mathrm{m\,s^{-2}}$`.
- Use semantic commands such as `\vec{F}`, `\frac{a}{b}`, and `\sum` rather
  than Unicode lookalikes when the expression is mathematical.
- Long display equations may scroll on screen; they must never widen the page.

KaTeX is not the syntax itself. TeX-like source is the notation; KaTeX is the
engine that renders the supported notation into accessible web output.

## 5. Folio semantic components

These names and their behavior are custom to this repository:

| Component | Meaning | Main options |
| --- | --- | --- |
| `Grid` | Allow adjacent semantic blocks to share available width | none |
| `Definition` | Definition of a concept | `title`, `wide` |
| `Formula` | Important mathematical relation | `title`, `wide` |
| `Example` | Concrete application | `title`, `wide` |
| `Note` | Supporting information | `title`, `wide` |
| `Warning` | High-attention warning | `title`, `wide` |
| `CommonMistake` | Frequent misconception or error | `title`, `wide` |
| `Summary` | Concluding synthesis | `title`, `wide` (defaults to true) |
| `Arrow` | Simple named relationship | `from`, `to` |
| `Mermaid` | Text-defined diagram | `chart`, optional `label` |

Example:

```mdx
<Grid>
  <Definition title="Velocity">...</Definition>
  <Example>...</Example>
  <Formula wide>$$v=\frac{d}{t}$$</Formula>
</Grid>
```

`wide` is semantic guidance meaning “give this block the full available row.”
All other column decisions belong to responsive CSS. Never encode a column
count, percentage, or pixel width in content.

## 6. Mermaid and SVG

Mermaid syntax belongs to Mermaid; only the surrounding `<Mermaid>` component
is custom to Folio:

```mdx
<Mermaid
  label="Reaction flow"
  chart={`flowchart LR
    A[Reactants] --> B[Reaction]
    B --> C[Products]`}
/>
```

Simple relationships should use `<Arrow>`. Repeated subject-specific visuals
should become engine components. A truly unique inline SVG is acceptable only
when it:

- has a meaningful accessible label;
- uses a responsive `viewBox` rather than fixed page dimensions;
- cannot overflow its container;
- remains legible in monochrome print;
- does not position surrounding note content.

## 7. Portability boundary

A `.mdx` file should remain understandable as plain text when Folio is absent.
Markdown and math carry most information. Custom components add explicit
meaning, but their names and children should still explain the content.

When moving an Obsidian draft into Folio:

1. Replace wiki links and embeds with ordinary Markdown links/images.
2. Replace Obsidian callouts with the closest Folio semantic component.
3. Normalize math delimiters to `$` and `$$`.
4. Move repeated custom presentation into an engine component.
5. Confirm the note works on mobile and in print.

## Changing these conventions

Syntax is a public interface for every knowledge file. Before changing or
removing it:

1. update the engine with backward compatibility where practical;
2. migrate existing notes;
3. update this document and `docs/AUTHORING.md`;
4. run `npm run check` and `npm run build`;
5. visually check screen and print output.
