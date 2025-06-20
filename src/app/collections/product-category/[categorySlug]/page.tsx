// Importing necessary components and types

// import { Metadata } from 'next'; // Metadata handling for page SEO
// import { PageProps } from '@/app/types/page';
import { PageProps } from '@/types/page';
import FilterProvider from './_filters/filter-store/FilterProvider';
import TireCategory from './_tires/TireCategory';
import { metaDataHelper } from '@/utils/metadata';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Tires - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/tires',
  },
});

// Main Collection component that renders the appropriate category collection based on categorySlug
const Collection = async ({
  params,
  searchParams,
}: PageProps<{
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page: string }>;
}>) => {
  // Extracting categorySlug from params
  const { categorySlug } = await params;
  console.log('Category Slug:', categorySlug);
  const { page } = await searchParams;
  // Variable to hold the collection component to render based on category
  const collection = <TireCategory page={Number(page) || 1} />;

  // Wrapping the selected collection with FilterProvider to apply filters
  return (
    <FilterProvider>
      {collection} {/* Render the appropriate collection */}
    </FilterProvider>
  );
};

export default Collection;
