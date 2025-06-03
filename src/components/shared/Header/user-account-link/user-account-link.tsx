'use client';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { UserCircle } from 'lucide-react';

// UserAccountLink Component
// This component renders a link to the user's account or login page, depending on their authentication status.
const UserAccountLink = () => {
  const [link, setLink] = React.useState('/login'); // State to manage the link destination
  const { user } = useAuth(); // Access the authenticated user
  // Update the link destination based on the user's authentication status
  useEffect(() => {
    if (user) {
      setLink('/dashboard/orders'); // Link to the dashboard if the user is logged in
    } else {
      setLink('/login'); // Link to the login page if the user is not logged in
    }
  }, [user]); // Re-run the effect whenever the `user` changes

  // Determine the tooltip content based on the user's authentication status
  let content;

  if (user) {
    content = 'My Account';
  } else {
    content = 'User Login';
  }

  return (
    <Link
      href={link}
      data-tooltip-id="my-tooltip"
      data-tooltip-content={content}
      data-tooltip-place="top"
    >
      <UserCircle />
    </Link>
  );
};

export default UserAccountLink;
