import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { createContext, useContext } from 'react';

type MergedBrickBoxContextType = {
  marged: boolean;
};

const MergedBrickBoxContext = createContext<MergedBrickBoxContextType | null>(
  null
);

type MergedBrickBoxProviderProps = {
  [K in Exclude<
    keyof React.ComponentProps<'div'>,
    'className'
  >]?: React.ComponentProps<'div'>[K];
} & {
  children: React.ReactNode;
  className?: string;
  onClear?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  shouldShowClearButton?: boolean;
};

const MergedBrickBoxProvider = ({
  children,
  className,
  onClear,
  shouldShowClearButton = true,
  ...props
}: MergedBrickBoxProviderProps) => {
  return (
    <MergedBrickBoxContext.Provider value={{ marged: true }}>
      <div
        className={cn(
          'mergedBrickBox',
          'bg-white border-muted-dark border rounded px-3 py-[7.5px] inline-flex items-center space-x-2 text-lg text-muted-foreground cursor-pointer hover:text-black hover:border-black h-full',
          className
        )}
        {...props}
      >
        <div className="space-x-5 flex items-center">{children}</div>
        {shouldShowClearButton && (
          <button className="pl-10 cursor-pointer h-full" onClick={onClear}>
            <X size={16} />
          </button>
        )}
      </div>
    </MergedBrickBoxContext.Provider>
  );
};

export default MergedBrickBoxProvider;

export const useMergedBrickBoxContext = () => {
  const context = useContext(MergedBrickBoxContext);
  return context?.marged;
};
