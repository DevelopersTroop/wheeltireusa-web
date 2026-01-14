import { metaDataHelper } from '@/utils/metadata';
import SingleProductClient from './client-page';
import { normalizeImageUrl } from '@/utils/url';
import { Metadata } from 'next';
import { apiBaseUrl } from '@/utils/api';
import { TInventoryItem } from '@/types/product';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ singleProduct: string }>;
  searchParams: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  try {
    const { singleProduct } = await params;
    const { slug } = await searchParams;

    const response = await fetch(
      `${apiBaseUrl}/products/pair-details?slugOne=${singleProduct}&slugTwo=${slug ?? ''}`,
      {
        cache: 'force-cache',
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product metadata');
    }

    const result = await response.json();
    const products: TInventoryItem[] = result?.data?.product ?? [];

    if (!products.length) {
      throw new Error('No products found');
    }

    const isPair = products.length > 1;

    /* ---------- SEO CONTENT ---------- */
    const title = isPair
      ? `${products[0].title} & ${products[1].title}`
      : products[0].title || '';

    const description = isPair
      ? `${products[0].description} Pair with ${products[1].description}`
      : products[0].description;

    const images = products.map((product) => ({
      url: normalizeImageUrl(product.imageUrl ?? ''),
      width: 1200,
      height: 630,
      alt: product.title ?? '',
    }));

    const canonicalUrl = isPair
      ? `https://tirematic.com/collections/product/${singleProduct}?slug=${slug}`
      : `https://tirematic.com/collections/product/${singleProduct}`;

    /* ---------- METADATA ---------- */
    return metaDataHelper({
      title,
      description,
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        images,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  } catch (error) {
    return {
      title: 'Tirematic Product',
      description: 'Explore premium tire products at Tirematic.',
    };
  }
}

const SingleProduct = async ({
  params,
  searchParams,
}: {
  params: Promise<{ singleProduct: string }>;
  searchParams?: Promise<{ slug?: string }>;
}) => {
  const { singleProduct } = await params; // Get product ID.
  const { slug } = (await searchParams) || {}; // Get slug from search params if available.

  return <SingleProductClient slugOne={singleProduct} slugTwo={slug} />; // Render the client component.
};

export default SingleProduct;
