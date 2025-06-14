// Import the main Cart component
import { metaDataHelper } from '@/utils/metadata';
import Cart from './ClientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Shopping Cart - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/cart',
  },
});

// Component to render the shopping cart page
export default function Page() {
  return <Cart />;
}
