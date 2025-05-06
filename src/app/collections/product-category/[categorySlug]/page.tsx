// Importing necessary components and types

import { Metadata } from 'next'; // Metadata handling for page SEO
import { PageProps } from '@/app/types/page';
import TireCategory from './_tire/tire-category';
import FilterProvider from './_filters/filter-store/filter-provider';

// Defining type for the page props
type ProductsPageProps = {
  params: Promise<{ categorySlug: string }>; // Category slug is extracted from params
  page?: number;
};

// Async function to generate metadata for the page based on category
export async function generateMetadata(
  props: PageProps<{ categorySlug: string }>
): Promise<Metadata> {
  try {
    // Destructuring categorySlug from params
    const { categorySlug } = await props.params;
    console.log('categorySlug', categorySlug);
    return {
      // Set the page title dynamically based on the category
      title: `tire${categorySlug} - TireMatic`,
    };
  } catch (error) {
    // Return default metadata in case of error
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
    };
  }
}

// Main Collection component that renders the appropriate category collection based on categorySlug
const Collection = async ({ params, page = 1 }: ProductsPageProps) => {
  // Extracting categorySlug from params
  const { categorySlug } = await params;
  console.log('categorySlug', categorySlug);
  // Variable to hold the collection component to render based on category
  const collection = <TireCategory page={page} />;

  // Wrapping the selected collection with FilterProvider to apply filters
  return (
    <FilterProvider>
      {collection} {/* Render the appropriate collection */}
    </FilterProvider>
  );
};

export default Collection;
