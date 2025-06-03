import FAQs from './_components/faqs'; // Import the FAQs component to display the list of frequently asked questions

export const metadata = {
  title: 'Frequently Asked Questions | Tirematic',
  description:
    'Find answers to common questions about our products, services, and policies.',
};

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
