import { useRef, useState } from 'react';

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

export default useSearch;
