import { Metadata } from 'next';
import { apiBaseUrl } from './api';
import { TPost } from '@/types/post';

export const metaDataHelper = (metaData: Partial<Metadata>): Metadata => {
  const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max - 3) + '...' : str;

  const title = truncate(String(metaData?.title ?? 'Default Title'), 60);
  const description = truncate(
    metaData?.description ?? 'Default Description',
    160
  );

  const other = {
    other: {
      title: (metaData.openGraph?.title ?? 'test') as string,
    },
  };
  return {
    openGraph: {
      images: ['/images/logo.png'],
    },
    ...metaData,
    title,
    description,
    robots: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-video-preview': 'large',
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-video-preview': 'large',
      },
    },
    ...other,
  };
};

export async function generateBlogPostMetadata(
  slug: string,
  fallbackTitle = 'Blog - Amani Forged Wheels'
): Promise<Metadata> {
  try {
    const response = await fetch(`${apiBaseUrl}/posts/${slug}`, {
      cache: 'force-cache',
      next: { revalidate: 120 },
    });
    const result = await response.json();
    const post = result.data?.post as TPost;
    const canonicalUrl = `https://wheeltireusa.com/blog/${slug}`;

    return metaDataHelper({
      title: `${post?.metaTitle || post?.title} - Amani Forged Wheels`,
      description: post?.metaDescription || post?.title,
      openGraph: {
        title: `${post?.metaTitle} - Amani Forged Wheels`,
        description: post?.metaDescription,
        url: canonicalUrl,
      },
      alternates: { canonical: canonicalUrl },
    });
  } catch {
    return { title: fallbackTitle };
  }
}
