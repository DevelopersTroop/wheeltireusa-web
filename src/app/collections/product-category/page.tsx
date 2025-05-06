// Importing the 'redirect' function from Next.js to perform client-side redirection
import { redirect } from 'next/navigation';

// Defining the Page component
const Page = () => {
  redirect('/collections/product-category/tire');
};

export default Page;
