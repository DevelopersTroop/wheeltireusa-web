// Import the Privacy Policy component
import TirePressureGuide from './_components/installation-tips';

// Metadata for the page
export const metadata = {
  title: 'Installation Tips | Tirematic',
  description:
    'Get expert installation tips for your tires with Tirematic. Learn best practices for mounting, balancing, and maintaining your tires to ensure safety, longevity, and optimal performance.',
};

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <TirePressureGuide />
  );
}
