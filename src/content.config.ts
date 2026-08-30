import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string().optional(),
    order: z.number().default(999),
    description: z.string().optional(),
  }),
});

export const collections = { knowledge };
