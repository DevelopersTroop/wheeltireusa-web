import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const FilterFooter = () => {
  return (
    <>
      <div>
        <div className="p-4 border-t-1 border-muted-dark">
          <div className="flex justify-end items-center">
            <Button className="bg-primary rounded !px-12 py-6 font-normal cursor-pointer">
              <span>
                <Search
                  color={'#ffffff'}
                  size={20}
                  className="!h-[20px] !w-[20px]"
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
