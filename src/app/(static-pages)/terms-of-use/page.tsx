// Import the Privacy Policy component
import TermsOfUse from './_components/terms-of-use';

// Metadata for the page
export const metadata = {
  title: 'Terms of Use | Tirematic',
  description:
    'Read the Terms of Use for Tirematic. Understand your rights, responsibilities, and the conditions for using our services.',
};

// Component to render the Privacy Policy page
export default function Page() {
  return (
    // Render the PrivacyPolicy component
    <TermsOfUse />
  );
}
