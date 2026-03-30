"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

type Props = {
  steps: Step[];
};

export default function SizeStepIndicator({ steps }: Props) {
  return (
    <div className="flex items-center justify-center w-fit mx-auto mb-8 relative">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            type="button"
            onClick={step.onClick}
            disabled={step.isDisabled}
            className={cn(
              "flex items-center gap-2",
              step.isDisabled && "cursor-not-allowed opacity-60"
            )}
          >
            <span
              className={cn(
                "w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm rounded-full flex items-center justify-center text-white font-bold transition-colors",
                step.isActive
                  ? "bg-primary"
                  : step.isCompleted
                  ? "bg-green-500"
                  : "bg-gray-300"
              )}
            >
              {step.isCompleted && !step.isActive ? (
                <Check className="w-4 h-4" />
              ) : (
                step.id
              )}
            </span>
            <span
              className={cn(
                "text-sm sm:text-base font-bold transition-colors",
                step.isActive || step.isCompleted ? "text-black" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </button>
          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div className="hidden sm:block w-8 lg:w-12 h-0.5 bg-gray-200 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}
