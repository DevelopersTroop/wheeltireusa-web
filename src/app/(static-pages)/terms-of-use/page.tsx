// Import the Terms Of Use component
import { metaDataHelper } from '@/utils/metadata';
import TermsOfUse from './_components/terms-of-use';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Terms Of Use - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/terms-of-use',
  },
});

// Component to render the Terms Of Use page
export default function Page() {
  return (
    // Render the Terms Of Use component
    <TermsOfUse />
  );
}
