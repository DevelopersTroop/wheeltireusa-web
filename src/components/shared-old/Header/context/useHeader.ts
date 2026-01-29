// Import React and the useContext hook for accessing context
import { useContext } from 'react';
// Import the HeaderContext from the header-provider file
import { HeaderContext } from './header-provider';

// useHeader Hook
// This custom hook provides access to the HeaderContext, allowing components to consume header-related state and actions.
const useHeader = () => {
  return useContext(HeaderContext); // Access and return the HeaderContext
};

export default useHeader;
