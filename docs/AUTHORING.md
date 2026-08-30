# Authoring knowledge

Write durable knowledge in `src/content/knowledge/<language>/<subject>/`.
Folders define navigation and URLs. For example:

```text
src/content/knowledge/fr/math/suites.mdx → /fr/math/suites/
```

Use standard Markdown for prose and `$...$` / `$$...$$` for mathematics. MDX
exists to provide a small semantic vocabulary:

```mdx
---
title: Suites
order: 10
---

# Suites

Une suite est une succession ordonnée de nombres.

<Grid title="Suites arithmétiques">
  <Definition title="Suite arithmétique">
    La différence entre deux termes consécutifs est constante.
  </Definition>

  <Formula wide>
    $$u_n = u_0 + nr$$
  </Formula>

  <Example>Si $u_0=3$ et $r=4$, alors $u_1=7$.</Example>
</Grid>
```

Available components are `Grid`, `Definition`, `Formula`, `Example`, `Note`,
`Warning`, `CommonMistake`, `Summary`, `DataTable`, `Mermaid`, and `Arrow`.

Use `<Grid>` only where adjacent ideas benefit from sharing horizontal space.
Long explanation remains ordinary Markdown flow. Add `wide` to a semantic card
when it should span the grid. Never assign columns or pixel widths in a note.

Give a grid an optional section title with `<Grid title="...">`. The engine
chooses the correct heading level; authors do not configure it.

Put a Markdown table in `DataTable` when it belongs to the knowledge grid:

```mdx
<Grid title="Comparison">
  <DataTable title="Sequence types" wide compact lines="rows">

    | Type | Formula |
    | --- | --- |
    | Arithmetic | $u_n=u_1+(n-1)r$ |
    | Geometric | $u_n=u_1q^{n-1}$ |

  </DataTable>
</Grid>
```

`DataTable` accepts an optional `title`, the card option `wide`, `compact` for
tighter cells, and `lines="rows"`, `lines="all"`, or `lines="none"`. It does
not expose widths, font sizes, or column counts.

For Mermaid, keep the source textual and readable:

```mdx
<Mermaid chart={`flowchart LR
  A[Réactifs] --> B[Réaction]
  B --> C[Produits]`} />
```

For a simple relationship:

```mdx
<Arrow from="Force" to="Accélération" />
```

If a visual concept repeats, add a reusable engine component instead of
copying custom markup between notes. A new component must be responsive,
overflow-safe, usable in a grid, and printable.
