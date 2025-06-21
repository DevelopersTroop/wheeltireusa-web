// Import the Safety Tips component
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

// Component to render the Safety Tips page
export default function Page() {
  return (
    // Render the Safety Tips component
    <SafetyTips />
  );
}
