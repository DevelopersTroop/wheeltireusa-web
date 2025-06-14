// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import Careers from './_components/careers';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Careers - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/careers',
  },
});

// Component to render the Services page
export default function Page() {
  return (
    // Render the Services component
    <Careers />
  );
}
