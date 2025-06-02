'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TSingleFilter } from '@/types/filter';
import { capitalizeWords } from '@/utils/string';

type SingleValuedFilterProps = {
  defaultOption: string;
  filterData: TSingleFilter[];
  filterKey: string;
  onChange: (v: string) => void;
};

// SingleFilter component to display a dropdown filter with single-value options
const SingleFilter = ({
  defaultOption,
  filterData,
  filterKey,
  onChange,
}: SingleValuedFilterProps) => {
  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Select
            value={defaultOption}
            onValueChange={(value) => onChange(value)}
            name={filterKey}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                Select {capitalizeWords(filterKey).replace('Custom', '')}
              </SelectItem>
            </SelectContent>
            {filterData.map((data) => (
              <SelectItem
                key={`custom-wheel-forging-filter-${data.value}`}
                value={data.value.toString()}
              >
                {data.value}
              </SelectItem>
            ))}
          </Select>
        </form>
      </div>
    </>
  );
};

export default SingleFilter;
