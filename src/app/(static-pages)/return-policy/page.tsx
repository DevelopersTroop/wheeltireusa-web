// Import the Privacy Policy component
import ReturnPolicy from './_components/return-policy';

// Metadata for the page
export const metadata = {
  title: 'Return Policy | Tirematic',
  description:
    'Read Tirematic’s return policy to learn about our process for returns, exchanges, and refunds. Find out how to initiate a return and review important terms and conditions.',
};

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <ReturnPolicy />
  );
}
