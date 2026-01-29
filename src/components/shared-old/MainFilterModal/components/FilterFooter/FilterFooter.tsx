'use client';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { MouseEvent } from 'react';

type TFilterFooter = {
  isDisabled: boolean;
  submitFilter: (e: MouseEvent<HTMLButtonElement>) => void;
};
const FilterFooter = ({ isDisabled, submitFilter }: TFilterFooter) => {
  return (
    <>
      <div>
        <div className="p-4 border-t border-muted-dark">
          <div className="flex justify-end items-center">
            <Button
              disabled={isDisabled}
              className="bg-primary rounded px-12! py-6 font-normal cursor-pointer disabled:cursor-not-allowed"
              onClick={submitFilter}
            >
              <span>
                <Search
                  color={'#ffffff'}
                  size={20}
                  className="h-[20px]! w-[20px]!"
                />
              </span>
              <span className="text-white text-[20px]">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterFooter;
