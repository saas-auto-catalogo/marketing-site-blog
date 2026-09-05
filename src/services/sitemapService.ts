import { SAMPLE_ARTICLES } from '../data/sampleArticles.js';

export function generateSitemapXml(): string {
  const baseUrl = 'https://drivesync.me';
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/#planos`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/#calculadora-roi`, priority: '0.8', changefreq: 'monthly' },
  ];

  const articlePages = SAMPLE_ARTICLES.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allUrls = [...staticPages, ...articlePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}
