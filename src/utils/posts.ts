import { getCollection } from 'astro:content';

export interface Post {
  slug: string;
  data: {
    title: string;
    date: Date;
    category: string;
    tags: string[];
    author: string;
    description: string;
    image?: string;
    canonical?: string;
  };
  body: string;
}

export async function getMergedPosts(env: any): Promise<Post[]> {
  // 1. Get local posts
  const localPosts = await getCollection('posts');
  const normalizedLocal: Post[] = localPosts.map(p => ({
    slug: p.slug,
    data: {
      ...p.data,
      date: new Date(p.data.date)
    },
    body: p.body
  }));

  // 2. Get KV posts
  const kv = env?.POSTS_KV;
  if (!kv) return normalizedLocal;

  try {
    const list = await kv.list({ prefix: 'post:' });
    const kvPosts = await Promise.all(
      list.keys.map(async (key: any) => {
        const val = await kv.get(key.name);
        if (!val) return null;
        const parsed = JSON.parse(val);
        return {
          ...parsed,
          data: {
            ...parsed.data,
            date: new Date(parsed.data.date)
          }
        };
      })
    );

    const validKvPosts = kvPosts.filter(p => p !== null) as Post[];

    // 3. Merge (KV overrides local with same slug)
    const mergedMap = new Map<string, Post>();
    normalizedLocal.forEach(p => mergedMap.set(p.slug, p));
    validKvPosts.forEach(p => mergedMap.set(p.slug, p));

    return Array.from(mergedMap.values()).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  } catch (e) {
    console.error('KV Error:', e);
    return normalizedLocal;
  }
}

export async function getPostBySlug(slug: string, env: any): Promise<Post | undefined> {
  const kv = env?.POSTS_KV;
  if (kv) {
    const val = await kv.get(`post:${slug}`);
    if (val) {
      const parsed = JSON.parse(val);
      return {
        ...parsed,
        data: {
          ...parsed.data,
          date: new Date(parsed.data.date)
        }
      };
    }
  }

  const localPosts = await getCollection('posts');
  const found = localPosts.find(p => p.slug === slug);
  if (found) {
    return {
      slug: found.slug,
      data: {
        ...found.data,
        date: new Date(found.data.date)
      },
      body: found.body
    };
  }

  return undefined;
}
