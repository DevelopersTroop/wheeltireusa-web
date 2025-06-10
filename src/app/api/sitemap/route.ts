import { NextResponse } from 'next/server';

const sitemapLinks: {
  href: string;
}[] = [
  { href: '/' },
  {
    href: '/collections/product-category/tires',
  },
  {
    href: '/financing',
  },
  {
    href: '/contact-us',
  },
  {
    href: '/about-us',
  },
  {
    href: '/frequently-asked-questions',
  },
  {
    href: '/customer-support',
  },
  {
    href: '/safety-tips',
  },
  {
    href: '/return-policy',
  },
  {
    href: '/store-locator',
  },
  {
    href: '/tire-pressure-guide',
  },
  {
    href: '/installation-tips',
  },
  {
    href: '/blog-resources',
  },
  {
    href: '/become-an-installer',
  },
  {
    href: '/careers',
  },
  {
    href: '/military-discount',
  },
  {
    href: '/services',
  },
  {
    href: '/privacy-policy',
  },
  {
    href: '/terms-of-use',
  },
  {
    href: '/warranty',
  },
];

function generateSitemap(pages: typeof sitemapLinks, baseUrl: string) {
  const styleHeader = `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="${baseUrl}/xsl/index.xsl"?>
      `;

  const urls = pages.map((page) => {
    return `<url>
      <loc>${baseUrl}${page.href}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  `;
  });

  return (
    styleHeader +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${urls.join('\n')}
    </urlset>
    `
  );
}

export async function GET() {
  // Combine static and dynamic pages

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const sitemapXml = generateSitemap(sitemapLinks, baseUrl);

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml', // Ensure XML content type
    },
  });
}
