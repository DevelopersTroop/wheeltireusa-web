// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import SafetyTips from './_components/safety-tips';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Safety Tips - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/return-policy/safety-tips',
  },
});

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <SafetyTips />
  );
}
