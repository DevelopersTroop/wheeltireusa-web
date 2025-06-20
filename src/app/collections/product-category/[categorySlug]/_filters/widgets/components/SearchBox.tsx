import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

const SearchBox = ({
  onChange,
  value,
  placeholder,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
}) => {
  const [showFocusBorder, setShowFocusBorder] = useState(false);
  return (
    <div
      className={cn(
        'mb-2 flex h-full w-full overflow-hidden rounded border border-[#CCC9CF] bg-white',
        showFocusBorder ? 'border-primary' : ''
      )}
    >
      <Input
        onChange={onChange}
        value={value}
        type="text"
        placeholder={placeholder}
        onFocus={() => setShowFocusBorder(true)}
        onBlur={() => setShowFocusBorder(false)}
        className="w-full grow rounded-none border-none bg-white focus-visible:ring-0 focus-visible:border-none"
      />
      <div className="flex items-center justify-center p-2 bg-white">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBox;
