// Import the Terms Of Use component
import { metaDataHelper } from '@/utils/metadata';
import TermsOfUse from './TermsOfUse';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Terms Of Use - WheelTireUSA',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://wheeltireusa.com/terms-of-use',
  },
});

// Component to render the Terms Of Use page
export default function Page() {
  return (
    // Render the Terms Of Use component
    <TermsOfUse />
  );
}
