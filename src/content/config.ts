import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['actress', 'actor', 'idol', 'movie', 'tv', 'music', 'scandal']),
    tags: z.array(z.string()),
    author: z.string().default('編集部'),
    description: z.string(),
    image: z.string(),
    canonical: z.string().optional(),
  }),
});

export const collections = {
  'posts': postsCollection,
};
