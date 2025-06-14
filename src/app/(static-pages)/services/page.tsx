// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import Services from './_components/services';

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
