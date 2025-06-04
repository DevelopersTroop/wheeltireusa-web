// Import the Privacy Policy component
import StoreLocator from './_components/store-locator';

// Metadata for the page
export const metadata = {
  title: 'Store Locator | Tirematic',
  description:
    'Find the nearest Tirematic store location. Use our store locator to discover addresses, contact details, and operating hours for all Tirematic outlets near you.',
};

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <StoreLocator />
  );
}
