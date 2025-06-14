// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import BecomeAnInstaller from './_components/become-an-installer';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Become An Installer - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/become-an-installer',
  },
});

// Component to render the Services page
export default function Page() {
  return (
    // Render the Services component
    <BecomeAnInstaller />
  );
}
