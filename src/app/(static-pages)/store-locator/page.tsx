// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import StoreLocator from './_components/store-locator';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Store Location - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/store-locator',
  },
});

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <StoreLocator />
  );
}
