'use client'; // Enables client-side rendering for this component
import Container from '@/components/ui/container/container';
import React, { useEffect } from 'react';
import DashbaordSidebar from './_components/DashbaordSidebar'; // Sidebar component for dashboard
import DashboardBreadcrumb from './_components/DashboardBreadcrumb'; // Breadcrumb navigation for dashboard
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Dashboard layout component that wraps the dashboard pages
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // Get user authentication status
  const router = useRouter(); // Initialize Next.js router

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <>
      <Container>
        <DashboardBreadcrumb />
        <div className="flex flex-col lg:flex-row w-full gap-7 pt-6 mb-16">
          <div className={'w-full lg:w-1/4 border-x border-b '}>
            <DashbaordSidebar />
          </div>
          <div className={'w-full lg:w-3/4 '}>
            {children} {/* Render dynamic dashboard content */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default DashboardLayout;
