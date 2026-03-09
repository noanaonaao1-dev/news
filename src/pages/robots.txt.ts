export const prerender = false;

export async function GET(context: any) {
  // @ts-ignore
  const runtime = context.locals.runtime;
  const siteUrl = import.meta.env.SITE_URL || runtime?.env?.SITE_URL || context.site?.toString().replace(/\/$/, '') || 'https://news-8ea.pages.dev';

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.txt
Sitemap: ${siteUrl}/news-sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
  });
}
