import { useEffect, useState } from 'react';
import useFilter from '../../filter-store/useFilter';
import FilterHeading from '../../template/FilterHeading';
import { Switch } from '@/components/ui/switch';
import { useSearchParams } from 'next/navigation';

//SaleFilter Component
export const SaleFilter = () => {
  // Retrieve search parameters from the URL
  const searchParams = useSearchParams();

  // Destructure the toggle function from the custom filter hook
  const { toggleFilterValue } = useFilter();

  // State to track whether the "Sale Only" filter is enabled
  const [showSaleOnly, setShowSaleOnly] = useState(
    searchParams.get('sale') === 'true' ? true : false
  );

  // State to manage the visibility of the filter section
  const [showFilter, setShowFilter] = useState(true);

  // Function to toggle the visibility of the filter section
  const toggleFilter = () => setShowFilter((prev) => !prev);

  // Placeholder useEffect (not currently performing any action)
  useEffect(() => {}, []);
  return (
    <div className="px-5 py-3 border-b">
      {/* Filter heading with toggle functionality */}
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Sale"
      />
      {showFilter && (
        <div className="flex items-center gap-2">
          {/* Switch component to toggle "Sale Only" filter */}
          <Switch
            checked={showSaleOnly}
            onCheckedChange={(e) => {
              toggleFilterValue(
                'sale',
                e.toString() === 'true' ? 'true' : '',
                false
              );
              setShowSaleOnly(e);
            }}
          />
          <span>Sale Only</span>
        </div>
      )}
    </div>
  );
};
