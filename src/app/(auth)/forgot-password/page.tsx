// Import the ClientComponent, which handles the forgot password functionality

import { metaDataHelper } from '@/utils/metadata';
import ClientComponent from './ClientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Forgot Password - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/forgot-password',
  },
});

// Page Component
export default function Page() {
  return <ClientComponent />;
}
