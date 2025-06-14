// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import TirePressureGuide from './_components/installation-tips';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Installation Tips - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/installation-tips',
  },
});

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <TirePressureGuide />
  );
}
