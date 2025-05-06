'use client';
import { TSingleFilter } from '@/app/types/filter';
import Select from '@/app/ui/input/select';
import { capitalizeWords } from '@/app/utils/string';

type SingleValuedFilterProps = {
  defaultOption: string;
  filterData: TSingleFilter[];
  filterKey: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
          <Select value={defaultOption} onChange={onChange} name={filterKey}>
            <option value={''}>
              Select {capitalizeWords(filterKey).replace('Custom', '')}
            </option>
            {filterData.map((data) => (
              <option
                key={`custom-wheel-forging-filter-${data.value}`}
                value={data.value}
              >
                {data.value}
              </option>
            ))}
          </Select>
        </form>
      </div>
    </>
  );
};

export default SingleFilter;
