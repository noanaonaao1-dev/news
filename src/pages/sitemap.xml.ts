import { getCollection } from 'astro:content';

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

  const siteUrl = context.site?.toString().replace(/\/$/, '') || 'https://geino-frontline.jp';
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Pages
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${page === '' ? '/' : page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>\n`;
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });

  // Posts
  posts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}/post/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.data.date.toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  });

  xml += '  </urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    },
  });
}
