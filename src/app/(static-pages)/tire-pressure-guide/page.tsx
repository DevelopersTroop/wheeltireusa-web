// Import the Privacy Policy component
import TirePressureGuide from './_components/tire-pressure-guide';

// Metadata for the page
export const metadata = {
  title: 'Tire Pressure Guide | Tirematic',
  description:
    'Discover the recommended tire pressures for your vehicle with Tirematic’s comprehensive tire pressure guide. Learn how to check, maintain, and optimize tire pressure for safety, performance, and fuel efficiency.',
};

// Component to render the store-locator page
export default function Page() {
  return (
    // Render the store-locator component
    <TirePressureGuide />
  );
}
