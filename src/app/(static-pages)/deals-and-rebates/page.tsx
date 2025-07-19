// Import the Deals and rebates component
import { metaDataHelper } from '@/utils/metadata';
import DealsAndRebates from './DealsAndRebates';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Deals And Rebates - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/deals-and-rebates',
  },
});

// Component to render the Deals And Rebates page
export default function Page() {
  return (
    // Render the Deals And Rebates component
    <DealsAndRebates />
  );
}
