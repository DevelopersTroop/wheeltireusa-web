// Import the Privacy Policy component
import CustomerSupport from './_components/customer-support';

// Metadata for the page
export const metadata = {
  title: 'Customer Support | Tirematic',
  description:
    'Get dedicated customer support from Tirematic. Contact us for assistance with your orders, services, or any inquiries. Our team is here to help you with prompt and reliable solutions.',
};

// Component to render the Customer Support page
export default function Page() {
  return (
    // Render the Customer Support component
    <CustomerSupport />
  );
}
