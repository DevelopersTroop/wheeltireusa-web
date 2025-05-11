import { Button } from '@/components/ui/button';
import BrickBox from '../BrickBox/BrickBox';
import useFilterByVehicle from './useFilterByVehicle';
import SelectMake from './components/SelectMake/SelectMake';
import SelectModel from './components/SelectModel/SelectModel';
import SelectYear from './components/SelectYear/SelectYear';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Component
const FilterByVehicle = () => {
  const { year, make, model, clearYear, clearMake, clearModel } =
    useFilterByVehicle();

  return (
    <>
      <ScrollArea className="h-[calc(70dvh-90px)] pb-3">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 px-6 order-2">
            {year && (
              <BrickBox
                checked={true}
                text={year}
                isDismissable={true}
                onClick={clearYear}
              />
            )}
            {make && (
              <BrickBox
                checked={true}
                text={make}
                isDismissable={true}
                onClick={clearMake}
              />
            )}
            {model && (
              <BrickBox
                checked={true}
                text={model}
                isDismissable={true}
                onClick={clearModel}
              />
            )}
          </div>
          {!year && <SelectYear />}
          {year && !make && <SelectMake />}
          {year && make && <SelectModel />}
        </div>
      </ScrollArea>
      {year && make && model && (
        <div>
          <div className="fixed -bottom-[80px] left-0 right-0 bg-white p-4 border-1 border-white outline-1 outline-t-0 outline-muted-dark rounded-lg rounded-t-none">
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
      )}
    </>
  );
};

export default FilterByVehicle;
