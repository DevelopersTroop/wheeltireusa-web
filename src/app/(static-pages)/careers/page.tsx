// Import the Careers component
import { metaDataHelper } from '@/utils/metadata';
import Careers from './_components/Careers/Careers';

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

// Component to render the Careers page
export default function Page() {
  return (
    // Render the Careers component
    <Careers />
  );
}
