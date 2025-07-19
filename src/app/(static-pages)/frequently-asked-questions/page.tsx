import { metaDataHelper } from '@/utils/metadata';
import FAQs from './_components/Faqs'; // Import the FAQs component to display the list of frequently asked questions

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Frequently Asked Questions - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/frequently-asked-questions',
  },
});

// Component to render the Frequently Asked Questions page
const FrequentlyAskedQuestions = () => {
  return (
    <div>
      {/* Render the FAQs component */}
      <FAQs />
    </div>
  );
};

export default FrequentlyAskedQuestions;
