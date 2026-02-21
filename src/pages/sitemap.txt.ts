import { getMergedPosts } from '../utils/posts';

export const prerender = false;

export async function GET(context: any) {
  // @ts-ignore
  const runtime = context.locals.runtime;
  const posts = await getMergedPosts(runtime?.env);

  const pages = [
    '',
    '/about',
    '/contact',
    '/policy',
  ];

  const categories = ['actress', 'actor', 'idol', 'movie', 'tv', 'music', 'scandal'];
  categories.forEach(cat => pages.push(`/category/${cat}`));

  const siteUrl = context.site?.toString().replace(/\/$/, '') || 'https://news-8ea.pages.dev';

  let txt = pages.map(page => `${siteUrl}${page === '' ? '/' : page}`).join('\n');
  txt += '\n';
  txt += posts.map(post => `${siteUrl}/post/${post.slug}`).join('\n');

  return new Response(txt.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
  });
}
