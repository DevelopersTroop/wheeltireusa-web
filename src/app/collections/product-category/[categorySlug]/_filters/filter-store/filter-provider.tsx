'use client';

// Importing necessary hooks from Next.js and React
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

// Type definition for the filter context
export type TFilter = {
  filters: { [k: string]: string | undefined };
  toggleFilterValue: (
    key: string,
    value: string | string[],
    acceptMultipleValue?: boolean
  ) => void;
  removeFilterValue: (key: string, value: string | string[]) => void;
  replaceFilterValue: (key: string, value: string) => void;
  clearAllFilters: () => void;
  removeSpecificFilters: (key: string[]) => void;
  addFilterValue: (key: string, value: string | string[]) => void;
  formatFilterValue: (value: string, key?: string) => string;
};

// Creating a context to manage filter states
export const FilterContext = React.createContext({} as TFilter);
const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = React.useState<TFilter['filters']>({}); // State to store filters
  const [shouldPaginationRemove, setShouldPaginationRemove] =
    React.useState(false); // Tracks if pagination needs reset

  useEffect(() => {
    console.log('filters', filters);
  }, [filters]);
  // Formats filter values by replacing separators (used for multi-value filters)
  const formatFilterValue = (
    value: string,
    key?: string,
    getFrontRearParamsJSON: boolean = false
  ) => {
    if (key === 'frontParams' || key === 'rearParams') {
      return getFrontRearParamsJSON
        ? value
        : `${JSON.parse(value).width}/${JSON.parse(value).ratio}-${JSON.parse(value).diameter}`;
    }
    return value.includes('|')
      ? value.replaceAll('|', ',')
      : value.replaceAll(',', '|');
  };

  // Clears all filters by resetting the state
  const clearAllFilters = () => {
    const minimumFilters: TFilter['filters'] = {};
    setFilters(minimumFilters);
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Syncs URL search parameters with the state when the component mounts or updates
  useEffect(() => {
    const keys = [];
    for (const key of searchParams.keys()) {
      keys.push(key);
    }
    for (const key of keys) {
      setFilters((prev) => {
        return {
          ...prev,
          [key]: searchParams.get(key) ?? '',
        };
      });
    }
  }, [searchParams]);

  // get splited values from the state
  const getSplitedValues = (
    state: { [k: string]: string | undefined },
    key: string
  ) => {
    if (key === 'frontParams' || key === 'rearParams') {
      return state[key] ? [state[key]] : [];
    }
    return state[key] ? state[key].split(',') : [];
  };

  // Removes a specific filter value or multiple values from the state
  const removeFilterValue = (key: string, value: string | string[]) => {
    setShouldPaginationRemove(true);
    setFilters((prev) => {
      const prevValues = getSplitedValues(prev, key);
      const finalValue = prevValues
        .filter((val) => {
          val = formatFilterValue(val, key, true);
          // for string, single value
          if (typeof value === 'string') {
            // if key === forging_style and value === passenger, remove all passenger forging
            if (key === 'forging_style' && value === 'Passenger') {
              return (
                val !== value &&
                val !== 'Signature Series' &&
                val !== 'Signature XL Series' &&
                val !== 'Wire Wheels' &&
                val !== 'AXL Concave'
              );
            }
            return val !== value;
          }
          // for array, multiple value
          else if (Array.isArray(value)) {
            return !value.includes(val);
          }
        })
        .join(',');
      // console.log("finalValue", finalValue)
      if (finalValue === '') {
        delete prev[key];
        return {
          ...prev,
        };
      }
      return {
        ...prev,
        [key]: finalValue,
      };
    });
  };

  // Toggles a filter value (adds/removes it based on the current state)
  const toggleFilterValue = (
    key: string,
    value: string | string[],
    acceptMultipleValue: boolean = true
  ) => {
    setShouldPaginationRemove(true);
    setFilters((prev) => {
      const prevValues = getSplitedValues(prev, key);
      let finalValue = prev[key] ?? '';

      // For Single Value
      if (typeof value === 'string') {
        value = formatFilterValue(value, key, true);
        if (acceptMultipleValue) {
          if (prevValues.includes(value)) {
            finalValue = prevValues.filter((val) => val !== value).join(',');
          } else {
            finalValue = [...prevValues, value].join(',');
          }
        } else {
          if (prevValues.includes(value)) {
            finalValue = '';
          } else {
            finalValue = value;
          }
        }
      }
      // For Multiple Values
      else {
        if (acceptMultipleValue) {
          const haveToBeRemoved: string[] = [];
          const haveToBeAdded: string[] = [];
          for (let item of value) {
            item = formatFilterValue(item, key);
            if (prevValues.includes(item)) {
              haveToBeRemoved.push(item);
            } else {
              haveToBeAdded.push(item);
            }
          }
          // remove neceessary items
          const removedItems = prevValues.filter(
            (val) => !haveToBeRemoved.includes(val)
          );
          finalValue = [...removedItems, ...haveToBeAdded].join(',');
        } else {
          if (
            Array.isArray(value) &&
            prevValues.some((val) => (value as string[]).some((v) => v === val))
          ) {
            finalValue = '';
          } else {
            finalValue = [...value].join(',');
          }
        }
      }
      if (
        key === 'forging_style' &&
        typeof prev['custom_diameter'] === 'string'
      ) {
        delete prev['custom_diameter'];
      }

      return {
        ...prev,
        [key]: finalValue,
      };
    });
  };

  // Adds a new filter value to the existing filters
  const addFilterValue = (key: string, value: string | string[]) => {
    setShouldPaginationRemove(true);
    setFilters((prev) => {
      const prevValues = getSplitedValues(prev, key);
      let finalValue = prev[key] ?? '';

      if (typeof value === 'string') {
        if (!prevValues.includes(value)) {
          finalValue = [...prevValues, value].join(',');
        } else {
          finalValue = prevValues.join(',');
        }
      } else {
        const newValues = value.filter((v) => !prevValues.includes(v));
        finalValue = [...prevValues, ...newValues].join(',');
      }

      return {
        ...prev,
        [key]: finalValue,
      };
    });
  };

  // Updates the URL with the latest filters whenever the filters state changes
  useEffect(() => {
    // generate query string from filters.
    const query = Object.keys(filters).reduce((prev, key) => {
      if (filters[key]) {
        prev.append(key, filters[key]);
      }
      return prev;
    }, new URLSearchParams());
    const updatedPathname = shouldPaginationRemove
      ? pathname.replace(/\/\d+$/, '')
      : pathname;
    setShouldPaginationRemove(false);
    router.push(`${updatedPathname}?${query.toString()}`, { scroll: false });
  }, [filters]);

  // Removes multiple specific filters from the state
  const removeSpecificFilters = (key: string[]) => {
    setShouldPaginationRemove(true);
    setFilters((prev) => {
      const newFilters = { ...prev };
      key.forEach((k) => {
        delete newFilters[k];
      });
      return newFilters;
    });
  };

  // Replaces a filter value completely
  const replaceFilterValue = (key: string, value: string) => {
    setShouldPaginationRemove(true);
    setFilters((prev) => {
      if (value === '') {
        delete prev[key];
        return {
          ...prev,
        };
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        formatFilterValue,
        toggleFilterValue,
        addFilterValue,
        removeFilterValue,
        replaceFilterValue,
        clearAllFilters,
        removeSpecificFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
