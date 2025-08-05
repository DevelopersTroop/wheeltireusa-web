'use client';
import { apiInstance } from '@/redux/apis/base';
import { removeUser, setUserDetails } from '@/redux/features/userSlice';
import { RootState } from '@/redux/store';
import { TUser } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

// Custom hook for managing user authentication
const useAuth = () => {
  const dispatch = useDispatch(); // Dispatch function to trigger Redux actions
  const router = useRouter(); // Router instance for navigation
  const user = useSelector((state: RootState) => state.persisted.user); // Access the current user state from Redux
  // Function to refresh the current user's details
  const refreshUser = async () => {
    // Fetch the current user's details from the API
    const getUser = async () => {
      const { data } = await apiInstance.get<{ data: { user: TUser } }>(
        `/auth/current-user`
      );
      return data.data.user;
    };

    const refreshedUser = await getUser();
    if (refreshedUser) {
      // If user data is successfully fetched, update the Redux store
      dispatch(
        setUserDetails({
          userDetails: refreshedUser,
        })
      );
      return refreshedUser;
    } else {
      return null;
    }
  };
  // Function to log out the user
  const logout = (redirectToLoginPage: boolean = false) => {
    dispatch(removeUser());
    if (redirectToLoginPage) {
      router.push('/login');
    }
  };

  // Function to sign up a new user
  const signUp = async (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<unknown> => {
    const { data } = await apiInstance.post<{ data: { user: TUser } }>(
      `/auth/signup`,
      { ...input, role: 'customer' }
    );
    return data.data.user;
  };

  // Return the functions and user state for external use
  return {
    refreshUser,
    logout,
    user:
      user.userDetails !== null
        ? { ...user?.userDetails, accessToken: user?.accessToken }
        : null,
    signUp,
  };
};

export default useAuth; // Export the custom hook as the default export
