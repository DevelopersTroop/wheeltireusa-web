// Import the Privacy Policy component
import Deals from './_components/deals';

// Metadata for the page
export const metadata = {
  title: 'Deals | Tirematic',
  description:
    'Discover the latest deals and special offers on tires and services at Tirematic. Save more with exclusive discounts and promotions tailored just for you.',
};

// Component to render the Services page
export default function Page() {
  return (
    // Render the Services component
    <Deals />
  );
}
