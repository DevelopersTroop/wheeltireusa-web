'use client';

import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { FaGoogle } from 'react-icons/fa';
import { useGoogleAuth } from './hooks/useGoogleAuth';

export interface GoogleAuthProps {
  role: string;
}

/**
 * Google OAuth Authentication Button
 * Dispatches auth actions via Redux; Saga handles async flow
 * Shows loading spinner and error state
 */
const GoogleAuth: React.FC<GoogleAuthProps> = ({ role }) => {
  const { loading, error, handleGoogleLogin } = useGoogleAuth({ role });

  return (
    <div className="mt-5 w-full">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 h-14 border cursor-pointer rounded-lg hover:bg-gray-50 transition-all bg-white w-full relative overflow-hidden"
        aria-label="Continue with Google"
      >
        <img
          src="/google-logo-white.webp"
          alt="Google"
          className="absolute left-2 w-10 h-10 bg-white"
        />
        {loading ? (
          <ImSpinner2 className="w-6 h-6 m-auto animate-spin text-[#DB1922]" />
        ) : (
          <p className="text-center w-full text-black font-semibold">
            Continue with Google
          </p>
        )}
      </button>

      {error && (
        <p className="mt-4 text-red-500" role="alert">
          Authentication failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default GoogleAuth;
