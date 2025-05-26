import { Metadata } from 'next';

export const metaDataHelper = (metaData: Partial<Metadata>): Metadata => {
  return {
    ...metaData,
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
  };
};
