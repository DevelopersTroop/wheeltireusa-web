// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import TermsOfUse from './_components/warranty';

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

// Component to render the Privacy Policy page
export default function Page() {
  return (
    // Render the PrivacyPolicy component
    <TermsOfUse />
  );
}
