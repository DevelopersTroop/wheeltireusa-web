import { metaDataHelper } from '@/utils/metadata';
import OrderTracking from './client';

export function generateMetadata() {
  return metaDataHelper({
    title: 'Track Your Order - Tirematic',
    alternates: {
      canonical: 'https://tirematic.com/track-order',
    },
  });
}

export default function Page() {
  return <OrderTracking />;
}
