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

type SelectBoxProps = {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  size?: 'sm' | 'default';
  className?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value = '',
  options,
  onChange,
  size = 'default',
  className,
}) => {
  const uniqueOptions = removeDuplicateDataWithRemovingFloatingPoint(options);
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger size={size} className={cn('w-fit', className)}>
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
  );
};

export default SelectBox;

