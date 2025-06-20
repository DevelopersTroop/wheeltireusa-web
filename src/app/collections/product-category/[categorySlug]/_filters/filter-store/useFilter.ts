import { useContext } from 'react';
import { FilterContext } from './FilterProvider';

const useFilter = () => {
  return useContext(FilterContext);
};

export default useFilter;
