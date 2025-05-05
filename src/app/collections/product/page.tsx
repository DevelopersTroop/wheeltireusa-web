import { redirect } from 'next/navigation'; // Import the redirect function from Next.js for server-side navigation.

const page = () => {
  // Immediately redirects the user to the specified URL when this component is rendered.
  // Note: This only works in a **server component**.
  redirect('/');
};

export default page; // Export the component as default.
