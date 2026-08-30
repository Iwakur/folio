import type { CollectionEntry } from 'astro:content';

export interface NavigationItem {
  label: string;
  path?: string;
  order: number;
  children: NavigationItem[];
}

export function humanize(value: string): string {
  const text = value.replace(/[-_]/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function buildNavigation(entries: CollectionEntry<'knowledge'>[], language: string) {
  const root: NavigationItem[] = [];
  for (const entry of entries.filter(({ id }) => id.split('/')[0] === language)) {
    const parts = entry.id.split('/').slice(1);
    let level = root;
    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1;
      let item = level.find(({ label }) => label === humanize(part));
      if (!item) {
        item = {
          label: isLeaf ? (entry.data.title ?? humanize(part)) : humanize(part),
          path: isLeaf ? `/${entry.id}/` : undefined,
          order: isLeaf ? entry.data.order : 999,
          children: [],
        };
        level.push(item);
      }
      level = item.children;
    });
  }
  const sort = (items: NavigationItem[]) => items
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
    .forEach((item) => sort(item.children));
  sort(root);
  return root;
}
