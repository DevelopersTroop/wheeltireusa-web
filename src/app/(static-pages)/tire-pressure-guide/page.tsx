// Import the Tire Pressure Guide component
import { metaDataHelper } from '@/utils/metadata';
import TirePressureGuide from './_components/tire-pressure-guide';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Tire Pressure Guide - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/tire-pressure-guide',
  },
});

// Component to render the Tire Pressure Guide page
export default function Page() {
  return (
    // Render the Tire Pressure Guide component
    <TirePressureGuide />
  );
}
