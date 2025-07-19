// Import the Warranty component
import { metaDataHelper } from '@/utils/metadata';
import Warranty from './Warranty';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Warranty - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/warranty',
  },
});

// Component to render the Warranty page
export default function Page() {
  return (
    // Render the Warranty component
    <Warranty />
  );
}
