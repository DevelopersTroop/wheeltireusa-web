import { redirect } from 'next/navigation'; // Import the redirect function from Next.js for server-side navigation

// Page Component
const page = () => {
  redirect('/');
};

export default page;
