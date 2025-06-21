// Import the Blog Resources component
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

// Component to render the Blog Resources page
export default function Page() {
  return (
    // Render the Blog Resources component
    <BlogResources />
  );
}
