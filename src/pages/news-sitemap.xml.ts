import { getCollection } from 'astro:content';

export async function GET() {
  const allPosts = await getCollection('posts');

  // Google News sitemap should only contain articles from the last 2 days
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const newsPosts = allPosts.filter(post => post.data.date >= twoDaysAgo);

  // If there are no recent posts, still include at least the latest 10 to avoid empty sitemap issues in some tools
  // (though technically Google says 2 days)
  const displayPosts = newsPosts.length > 0 ? newsPosts : allPosts.slice(0, 10);

  const siteUrl = 'https://geino-frontline.jp';
  const siteName = '芸能フロントライン';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${displayPosts.map(post => `
  <url>
    <loc>${siteUrl}/post/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${siteName}</news:name>
        <news:language>ja</news:language>
      </news:publication>
      <news:publication_date>${post.data.date.toISOString()}</news:publication_date>
      <news:title>${post.data.title}</news:title>
    </news:news>
  </url>`).join('')}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
