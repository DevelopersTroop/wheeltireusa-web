'use client';

import { setIsAccountCreated } from '@/redux/features/checkoutSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

// Props interface for the CreateAccountSection component
interface CreateAccountSectionProps {
  orderSuccessData: any;
}

// CreateAccountSection Component
export const CreateAccountSection: React.FC<CreateAccountSectionProps> = ({
  orderSuccessData,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [password, setPassword] = useState(''); // State to store the user's password
  const dispatch = useDispatch(); // Redux dispatch hook
  // const { signUp } = useAuth() // Authentication function for signing up users

  // Function to handle account creation
  const handleCreateAccount = async () => {
    setIsLoading(true);

    try {
      if (!orderSuccessData) {
        return;
      }

      const { shippingAddress, billingAddress } = orderSuccessData.data;

      const name = billingAddress?.name ?? shippingAddress?.name ?? '';
      const email = billingAddress?.email ?? shippingAddress?.email ?? '';
      const [firstName = '', lastName = ''] = name.split(' ');

      // const res = await signUp({ firstName, lastName, email, password });

      // if (res?.user) {
      //     dispatch(setIsAccountCreated(true));
      //     toast({
      //         title: "Account Created!",
      //         description: "Account has been created successfully.",
      //         variant: "default",
      //     });
      // }
    } catch (error: any) {
      console.error('Throwing error');
      toast('Error', {
        description: error?.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F7F7] px-6 py-5 rounded-xs flex flex-col gap-y-4">
      {/* Section Title */}
      <h2 className="font-bold text-lg">
        Create an account and save your info!
      </h2>

      {/* Description */}
      <p className="text-[#210203]">
        Creating an account lets you personalize your shopping experience --
        save your vehicle info and preferred installers, create a wish list,
        share photos, submit product reviews, review your order history, and
        more!
      </p>

      {/* Display Email Address */}
      <div>
        <Label>Email:</Label>
        <p className="text-[#210203] font-bold">
          {orderSuccessData?.data?.shippingAddress?.email ||
            orderSuccessData?.data?.billingAddress?.email}
        </p>
      </div>

      {/* Password Input */}
      <div className="flex justify-between items-end">
        <div className="grid gap-y-3 error-wrapper w-full">
          <Label className="font-medium">Create password</Label>
          <div className="relative h-14">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[10px] h-14 bg-white"
              type="password"
              disabled={isLoading}
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <Lock className="h-5 w-5 text-[#504949]" />
            </div>
          </div>
        </div>
      </div>

      {/* Create Account Button */}
      <Button
        onClick={handleCreateAccount}
        className="h-14 rounded-xs font-bold mt-1"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <User className="h-5 w-5 mr-2" />
        )}
        <span className="text-[18px]">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </span>
      </Button>
    </div>
  );
};
