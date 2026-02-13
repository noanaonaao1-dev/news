import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts');
  return rss({
    title: '芸能フロントライン',
    description: 'エンタメの最前線を速報でお届け',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/post/${post.slug}`,
    })),
  });
}
