// Import the ClientComponent, which handles the reset password functionality

import { metaDataHelper } from '@/utils/metadata';
import ClientComponent from './ClientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Reset - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/reset-password',
  },
});

// Page Component
export default function Page() {
  return <ClientComponent />;
}
