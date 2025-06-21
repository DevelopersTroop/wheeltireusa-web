// Import the Deals component
import { metaDataHelper } from '@/utils/metadata';
import Deals from './_components/deals';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Deals - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/deals',
  },
});

// Component to render the Deals page
export default function Page() {
  return (
    // Render the Deals component
    <Deals />
  );
}
