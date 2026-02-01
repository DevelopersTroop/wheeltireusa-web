import debounce from "debounce";
import { useEffect, useState } from "react";
import { useFilterSync } from "./useFilterSync";


export const useSearchFilter= (searchKey:string,setSearchKey:React.Dispatch<React.SetStateAction<string>>,query:string)=>{
  const {handleSearch}= useFilterSync()
const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const debouncedToggle = debounce(() => {
      handleSearch("q", searchKey);
    }, 500);
    debouncedToggle();
    return () => {
      debouncedToggle.clear();
    };
  }, [searchKey]);

  // Run on the first load
  useEffect(() => {
    if (!isMounted && query.length) {
      handleSearch("q", query);
      setSearchKey(query);
    }
  }, [query, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
}
