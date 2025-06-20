'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'cursor-pointer data-[state=checked]:bg-white data-[state=checked]:border-primary data-[state=unchecked]:bg-white focus-visible:border-black data-[state=checked]:focus-visible:border-black data-[state=unchecked]:focus-visible:border-black border border-[#CCC9CF]  inline-flex h-6 w-10 shrink-0 items-center rounded shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-[#F5F4F6] pointer-events-none block size-4 rounded-[0.125rem] ring-0 transition-transform data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-1 border border-[#CCC9CF]  data-[state=checked]:border-primary  data-[state=checked]:bg-primary'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
