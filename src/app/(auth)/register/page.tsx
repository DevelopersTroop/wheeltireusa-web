import { metaDataHelper } from '@/utils/metadata';
import ClientComponent from './ClientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Register - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/register',
  },
});

export default function Page() {
  return <ClientComponent />;
}
