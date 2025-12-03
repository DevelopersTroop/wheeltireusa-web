'use client';

import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { cn, removeDuplicateDataWithRemovingFloatingPoint } from '@/lib/utils';
import { X } from 'lucide-react';

type SelectBoxProps = {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  onClear?: () => void;
  isDismissable?: boolean;
  size?: 'sm' | 'default';
  className?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value = '',
  options,
  onChange,
  onClear,
  isDismissable = true,
  size = 'default',
  className,
}) => {
  const uniqueOptions = removeDuplicateDataWithRemovingFloatingPoint(options);
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {isDismissable && value ? (
        <button
          type="button"
          aria-label="Clear"
          className="absolute left-2 z-10 inline-flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
        >
          <X className="size-4 text-muted-foreground" />
        </button>
      ) : null}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger size={size} className={cn('w-fit pl-6')}>
          <span className="text-muted-foreground">{label}:</span>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {uniqueOptions.map((opt) => (
            <SelectItem key={opt} value={opt.toString()}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBox;
