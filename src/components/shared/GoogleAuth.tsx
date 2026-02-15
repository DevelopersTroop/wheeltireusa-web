"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "@/redux/features/userSlice";
import { apiBaseUrl } from "@/utils/api";
import { FaGoogle } from "react-icons/fa";

export default function GoogleAuth() {
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
    window.location.href = `${apiBaseUrl}/auth/signin-with-google`;
  };

  return (
    <div className='mt-5 w-full'>
      <button
        onClick={handleGoogleLogin}
        className='flex items-center gap-2  h-14 border cursor-pointer rounded-lg hover:bg-gray-50 transition-all bg-white w-full relative overflow-hidden'
      >
        <img src="/google-logo-white.webp" alt="Google" className="absolute left-2 w-10 h-10 bg-white" />
        {loading ? (
          <ImSpinner2 className='w-6 h-6 m-auto animate-spin text-[#DB1922]' />
        ) : (
          <p className="text-center w-full text-black font-semibold">Continue with Google</p>
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
