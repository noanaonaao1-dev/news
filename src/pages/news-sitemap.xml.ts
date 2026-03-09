import { getMergedPosts } from '../utils/posts';

export const prerender = false;

export async function GET(context: any) {
  // @ts-ignore
  const runtime = context.locals.runtime;
  const allPosts = await getMergedPosts(runtime?.env);

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const newsPosts = allPosts.filter(post => post.data.date >= twoDaysAgo);
  const displayPosts = newsPosts.length > 0 ? newsPosts : allPosts.slice(0, 10);

  const siteUrl = import.meta.env.SITE_URL || runtime?.env?.SITE_URL || context.site?.toString().replace(/\/$/, '') || 'https://news-8ea.pages.dev';
  const siteName = '芸能フロントライン';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

  displayPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}/post/${post.slug}</loc>\n`;
    xml += '    <news:news>\n';
    xml += '      <news:publication>\n';
    xml += `        <news:name>${siteName}</news:name>\n`;
    xml += '        <news:language>ja</news:language>\n';
    xml += '      </news:publication>\n';
    xml += `      <news:publication_date>${post.data.date.toISOString().replace(/\.\d+Z$/, 'Z')}</news:publication_date>\n`;
    xml += `      <news:title>${post.data.title}</news:title>\n`;
    xml += '    </news:news>\n';
    xml += '  </url>\n';
  });

  xml += '  </urlset>\n';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    },
  });
}
