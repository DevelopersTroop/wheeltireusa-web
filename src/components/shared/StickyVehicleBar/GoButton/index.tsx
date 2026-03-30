import { cn } from "@/lib/utils";

interface GoButtonProps {
  onSubmit: () => void;
  disabled: boolean;
  variant?: "desktop" | "mobile";
}

export default function GoButton({ onSubmit, disabled, variant = "desktop" }: GoButtonProps) {
  const baseClass = "text-white font-bold uppercase rounded shadow transition-opacity";
  const desktopClass = "h-9 px-4 text-xs";
  const mobileClass = "w-full py-3 text-sm";

  const variantClass = variant === "desktop" ? desktopClass : mobileClass;

  return (
    <div className={variant === "desktop" ? undefined : "lg:w-32 shrink-0"}>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={cn(
          baseClass,
          variantClass,
          disabled
            ? "bg-primary/50 cursor-not-allowed opacity-80"
            : "bg-primary hover:bg-primary/90"
        )}
      >
        GO
      </button>
    </div>
  );
}
