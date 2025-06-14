// Import the Privacy Policy component
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

// Component to render the Privacy Policy page
export default function Page() {
  return (
    // Render the PrivacyPolicy component
    <TermsOfUse />
  );
}
