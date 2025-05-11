import { cn } from '@/lib/utils';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

type SearchWithAlphabetProps = {
  setAlphabets: Dispatch<SetStateAction<string[]>>;
  alphabets: string[];
};

const SearchWithAlphabet = ({
  setAlphabets,
  alphabets,
}: SearchWithAlphabetProps) => {
  const isSelected = (alphabet: string) => {
    return alphabets.includes(alphabet.toLowerCase());
  };
  const selectAlphabet = (e: MouseEvent<HTMLButtonElement>) => {
    const targetAlphabet = e?.currentTarget?.value?.toLowerCase();
    if (isSelected(targetAlphabet)) {
      setAlphabets((prev) =>
        prev.filter((alphabet) => alphabet !== targetAlphabet)
      );
    } else {
      setAlphabets((prev) => [...prev, targetAlphabet]);
    }
  };
  const alphabetList = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  return (
    <div className={cn('flex items-center justify-between w-[calc(75%-40px)]')}>
      {alphabetList.map((alphabet) => (
        <button
          key={alphabet}
          value={alphabet}
          onClick={selectAlphabet}
          className={cn(
            'cursor-pointer text-[18px]',
            isSelected(alphabet) ? 'text-gray-400/80' : ''
          )}
        >
          {alphabet}
        </button>
      ))}
    </div>
  );
};

export default SearchWithAlphabet;
