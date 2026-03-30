'use client';

import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { FaFacebook } from 'react-icons/fa';
import { useFacebookAuth } from './hooks/useFacebookAuth';

export interface FacebookAuthProps {
  role: string;
}

/**
 * Facebook OAuth Authentication Button
 * Dispatches auth actions via Redux; Saga handles async flow
 * Shows loading spinner and error state
 */
const FacebookAuth: React.FC<FacebookAuthProps> = ({ role }) => {
  const { loading, error, handleFacebookLogin } = useFacebookAuth({ role });

  return (
    <div className="mt-5 w-full">
      <button
        onClick={handleFacebookLogin}
        className="flex items-center gap-2 w-full h-14 bg-[#1877f2] rounded-lg hover:bg-[#1877f2]/80 transition-all relative cursor-pointer"
        aria-label="Continue with Facebook"
      >
        <FaFacebook className="absolute left-2 w-7 h-7 text-white" />
        {loading ? (
          <ImSpinner2 className="w-6 h-6 m-auto animate-spin text-[#DB1922]" />
        ) : (
          <p className="text-center w-full text-white font-semibold">
            Continue with Facebook
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

export default FacebookAuth;
