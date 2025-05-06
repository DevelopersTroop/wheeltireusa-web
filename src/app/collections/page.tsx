// Importing redirect utility from Next.js for navigation handling
import { redirect } from 'next/navigation';

// Defining the Page component
const Page = () => {
  redirect('/collections/product-category/wheels');
};

export default Page;
