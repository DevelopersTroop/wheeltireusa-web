// Import the Return Policy component
import { metaDataHelper } from '@/utils/metadata';
import ReturnPolicy from './ReturnPolicy';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Return Policy - WheelTireUSA',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://wheeltireusa.com/return-policy',
  },
});

// Component to render the sReturn Policy page
export default function Page() {
  return (
    // Render the Return Policy component
    <ReturnPolicy />
  );
}
