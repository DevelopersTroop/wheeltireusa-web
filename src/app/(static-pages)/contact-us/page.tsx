import { metaDataHelper } from '@/utils/metadata';
import Contact from './Contact';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Contact Us - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/contact-us',
  },
});

// Component to render the Contact Us page
const ContactUs = () => {
  return (
    <div className="z-40">
      {/* Render the Contact component */}
      <Contact />
    </div>
  );
};

export default ContactUs;
