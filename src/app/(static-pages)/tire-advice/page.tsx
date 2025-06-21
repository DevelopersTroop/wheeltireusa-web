// Import the Tire Advic component
import { metaDataHelper } from '@/utils/metadata';
import TireAdvice from './_components/tire-advice';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Tire Advice - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/tire-advice',
  },
});

// Component to render the Tire Advice page
export default function Page() {
  return (
    // Render the Tire advice component
    <TireAdvice />
  );
}
