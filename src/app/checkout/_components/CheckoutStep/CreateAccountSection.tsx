"use client";

import { Button } from "@/components/ui/button";
import { Input } from "./Input";
import { Label } from "@/components/ui/label";
import { Lock, User, Loader2 } from "lucide-react";
import { useState } from "react";

interface CreateAccountSectionProps {
  email?: string;
  onPasswordChange: (password: string) => void;
  onCreateAccount: () => Promise<void>;
}

export const CreateAccountSection: React.FC<CreateAccountSectionProps> = ({
  email,
  onPasswordChange,
  onCreateAccount,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      await onCreateAccount();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F7F7] px-6 py-5 rounded-xs flex flex-col gap-y-4">
      <h2 className="font-bold text-lg">
        Create an account and save your info!
      </h2>

      <p className="text-[#210203]">
        Creating an account lets you personalize your shopping experience -- save
        your vehicle info and preferred installers, create a wish list, share
        photos, submit product reviews, review your order history, and more!
      </p>

      <div>
        <Label>Email:</Label>
        <p className="text-[#210203] font-bold">{email}</p>
      </div>

      <div className="flex justify-between items-end">
        <div className="w-full">
          <Input
            label="Create password"
            onChange={(e) => onPasswordChange(e.target.value)}
            type="password"
            disabled={isLoading}
          />
        </div>
      </div>

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