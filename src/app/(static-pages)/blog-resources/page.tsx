// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import BlogResources from './_components/blog-resources';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Blog - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/blog-resources',
  },
});

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <BlogResources />
  );
}
