'use client'; // Enabling client-side rendering for this component
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'; // React library and useEffect hook

const Logout = () => {
  // const {logout} = useAuth()
  const router = useRouter(); // Accessing router from useAuth hook
  useEffect(() => {
    // Log out the user after 1 second
    setTimeout(() => {
      // logout(true)
      console.log('User logged out successfully');
      router.push('/login'); // Redirect to login page
    }, 1000);
  }, []);
  return (
    <div className="w-full">
      <LoadingSpinner />
      <h1 className="text-center text-2xl text-primary mt-10">Please Wait</h1>
    </div>
  );
};

export default Logout;
