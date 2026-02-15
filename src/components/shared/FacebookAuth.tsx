"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "@/redux/features/userSlice";
import { apiBaseUrl } from "@/utils/api";
import { ImSpinner2 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";

export default function FacebookAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userDetails = searchParams.get("userDetails");

    if (accessToken && refreshToken && userDetails) {
      setLoading(true);
      const parsedUser = JSON.parse(decodeURIComponent(userDetails));
      console.log(parsedUser);
      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));
      dispatch(setUserDetails({ userDetails: parsedUser }));
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/signin-with-facebook`;
  };

  return (
    <div className='mt-5 w-full'>
      <button
        onClick={handleGoogleLogin}
        className='flex items-center gap-2 w-full h-14 bg-[#1877f2] rounded-lg hover:bg-[#1877f2]/80 transition-all relative cursor-pointer'
      >
        <FaFacebook className="absolute left-2 w-7 h-7 text-white" />
        {loading ? (
          <ImSpinner2 className='w-6 h-6 m-auto animate-spin text-[#DB1922]' />
        ) : (
          <p className="text-center w-full text-white font-semibold">Continue with Facebook</p>
        )}
      </button>

      {searchParams.get("error") && (
        <p className='mt-4 text-red-500'>
          Authentication failed. Please try again.
        </p>
      )}
    </div>
  );
}
