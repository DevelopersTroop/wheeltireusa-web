'use client'; // Enabling client-side rendering for this component
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import useAuth from '@/hooks/use-auth';
import React, { useEffect } from 'react'; // React library and useEffect hook

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Log out the user after 1 second
    setTimeout(() => {
      logout(true);
    }, 1000);
  }, [logout]);
  return (
    <div className="w-full">
      <LoadingSpinner />
      <h1 className="text-center text-2xl text-primary mt-10">Please Wait</h1>
    </div>
  );
};

export default Logout;
