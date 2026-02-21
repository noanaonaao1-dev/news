import rss from '@astrojs/rss';
import { getMergedPosts } from '../utils/posts';

export async function GET(context: any) {
  // @ts-ignore
  const runtime = context.locals.runtime;
  const posts = await getMergedPosts(runtime?.env);

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
