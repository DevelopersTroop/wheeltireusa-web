// Import the Installation tips component
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

// Component to render the Installation tips page
export default function Page() {
  return (
    // Render the Installation tips component
    <TirePressureGuide />
  );
}
