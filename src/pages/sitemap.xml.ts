import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const pages = [
    '',
    '/about',
    '/contact',
    '/policy',
  ];

  const categories = ['actress', 'actor', 'idol', 'movie', 'tv', 'music', 'scandal'];
  categories.forEach(cat => pages.push(`/category/${cat}`));

  const siteUrl = 'https://geino-frontline.jp';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page === '' ? '/' : page}</loc>
  </url>`).join('\n')}
${posts.map(post => `  <url>
    <loc>${siteUrl}/post/${post.slug}</loc>
    <lastmod>${post.data.date.toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`.trim();

  return new Response(sitemap + '\n', {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
