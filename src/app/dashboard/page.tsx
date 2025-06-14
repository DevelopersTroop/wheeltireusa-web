// Import the redirect function from Next.js navigation
import { metaDataHelper } from '@/utils/metadata';
import { redirect } from 'next/navigation';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'DashBoard - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/dashboard/orders',
  },
});

// Dashboard component that automatically redirects users to the orders page
const Dashboard = () => {
  redirect('/dashboard/orders');
};

export default Dashboard;
