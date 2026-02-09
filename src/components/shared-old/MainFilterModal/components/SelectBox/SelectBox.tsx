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
  disabled?: boolean;
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
  disabled = false,
  size = 'default',
  className,
}) => {
  const uniqueOptions = removeDuplicateDataWithRemovingFloatingPoint(options);
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn('w-fit pl-6')} disabled={disabled}>
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
