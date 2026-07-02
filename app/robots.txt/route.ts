export const revalidate = 3600;

const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://greaseguardpros.com/sitemaps.xml
`;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
