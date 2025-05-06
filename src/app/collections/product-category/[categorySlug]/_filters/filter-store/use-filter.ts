import { useContext } from 'react';
import { FilterContext } from './filter-provider';

const useFilter = () => {
  return useContext(FilterContext);
};

export default useFilter;
