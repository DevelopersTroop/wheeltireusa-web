// Import the Privacy Policy component
import PrivacyPolicy from './_components/privacy-policy';

// Metadata for the page
export const metadata = {
  title: 'Privacy Policy | Tirematic',
  description:
    'Learn about how we handle your personal information and your rights regarding your data.',
};

// Component to render the Privacy Policy page
export default function Page() {
  return (
    // Render the PrivacyPolicy component
    <PrivacyPolicy />
  );
}
