// Import the redirect function from Next.js navigation
import { redirect } from 'next/navigation';

// Dashboard component that automatically redirects users to the orders page
const Dashboard = () => {
  redirect('/dashboard/orders');
};

export default Dashboard;
