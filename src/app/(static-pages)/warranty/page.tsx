// Import the Privacy Policy component
import TermsOfUse from './_components/warranty';

// Metadata for the page
export const metadata = {
  title: 'Warranty | Tirematic',
  description:
    'Learn about Tirematic’s warranty policy. Discover coverage details, terms, and how to claim warranty for your purchases.',
};

// Component to render the Privacy Policy page
export default function Page() {
  return (
    // Render the PrivacyPolicy component
    <TermsOfUse />
  );
}
