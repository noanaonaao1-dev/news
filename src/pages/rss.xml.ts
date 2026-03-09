import rss from '@astrojs/rss';
import { getMergedPosts } from '../utils/posts';

export const prerender = false;

export async function GET(context: any) {
  // @ts-ignore
  const runtime = context.locals.runtime;
  const posts = await getMergedPosts(runtime?.env);
  const siteUrl = import.meta.env.SITE_URL || runtime?.env?.SITE_URL || context.site?.toString() || 'https://news-8ea.pages.dev';

  return rss({
    title: '芸能フロントライン',
    description: 'エンタメの最前線を速報でお届け',
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/post/${post.slug}`,
    })),
  });
}
