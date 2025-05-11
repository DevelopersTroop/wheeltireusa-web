import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search as SearchIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

type SearchProps = {
  [K in Exclude<
    keyof React.ComponentProps<'div'>,
    'onFocus' | 'onBlur' | 'tabIndex' | 'className'
  >]?: React.ComponentProps<'div'>[K];
} & {
  search: string;
  setSearch: (search: string) => void;
  className?: string;
};

const useSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const onDivFocus = () => {
    inputRef.current?.focus();
    setIsInputFocused(true);
  };
  const onDivBlur = () => setIsInputFocused(false);

  return {
    inputRef,
    isInputFocused,
    onDivFocus,
    onDivBlur,
  };
};

const Search = ({ search, setSearch, ...props }: SearchProps) => {
  const { inputRef, isInputFocused, onDivFocus, onDivBlur } = useSearch();
  return (
    <div
      tabIndex={0}
      onFocus={onDivFocus}
      onBlur={onDivBlur}
      className={cn(
        'bg-white border-muted-dark border-1 rounded px-4 py-[9.5px] inline-flex text-lg text-muted-foreground justify-between items-center z-50 relative',
        isInputFocused && 'border-1 border-gray-500',
        props.className
      )}
      {...props}
    >
      <Input
        ref={inputRef}
        placeholder="Search"
        value={search}
        //reset existing style fron input shadcn class
        className={cn(
          'bg-transparent border-none focus-visible:ring-0',
          'placeholder:text-muted-dark shadow-none p-0 leading-none h-auto rounded-none'
        )}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIcon className="w-6 h-6" />
    </div>
  );
};

export default Search;
