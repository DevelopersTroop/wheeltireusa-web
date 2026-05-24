// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import PrivacyPolicy from './PrivacyPolicy';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Privacy Policy - WheelTireUSA',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://wheeltireusa.com/privacy-policy',
  },
});

// Component to render the Privacy Policy page
export default function Page() {
  return (
    // Render the PrivacyPolicy component
    <PrivacyPolicy />
  );
}
