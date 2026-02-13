import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const allPosts = await getCollection('posts');

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const newsPosts = allPosts.filter(post => post.data.date >= twoDaysAgo);
  const displayPosts = newsPosts.length > 0 ? newsPosts : allPosts.slice(0, 10);

  const siteUrl = context.site?.toString().replace(/\/$/, '') || 'https://geino-frontline.jp';
  const siteName = '芸能フロントライン';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${displayPosts.map(post => `<url><loc>${siteUrl}/post/${post.slug}</loc><news:news><news:publication><news:name>${siteName}</news:name><news:language>ja</news:language></news:publication><news:publication_date>${post.data.date.toISOString().split('.')[0]}Z</news:publication_date><news:title>${post.data.title}</news:title></news:news></url>`).join('')}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    },
  });
}
