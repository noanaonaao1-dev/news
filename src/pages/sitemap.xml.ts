import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context: any) {
  const posts = await getCollection('posts');
  const pages = [
    '',
    '/about',
    '/contact',
    '/policy',
  ];

  const categories = ['actress', 'actor', 'idol', 'movie', 'tv', 'music', 'scandal'];
  categories.forEach(cat => pages.push(`/category/${cat}`));

  const siteUrl = context.site?.toString().replace(/\/$/, '') || 'https://news-8ea.pages.dev';
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page === '' ? '/' : page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${posts.map(post => `  <url>
    <loc>${siteUrl}/post/${post.slug}</loc>
    <lastmod>${post.data.date.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8'
    },
  });
}
