import { metaDataHelper } from '@/utils/metadata';
import ClientComponent from './ClientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Login - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/login',
  },
});

export default function Page() {
  return <ClientComponent />;
}
