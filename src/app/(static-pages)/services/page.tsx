// Import the Services component
import { metaDataHelper } from '@/utils/metadata';
import Services from './Services';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Services - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/services',
  },
});

// Component to render the Services page
export default function Page() {
  return (
    // Render the Services component
    <Services />
  );
}
