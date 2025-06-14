// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import ReturnPolicy from './_components/return-policy';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Return Policy - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/return-policy',
  },
});

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <ReturnPolicy />
  );
}
