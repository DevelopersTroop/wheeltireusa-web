'use client';
import { Search, SearchIcon, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SearchSuggestion from './SearchSuggestion';

// HeaderSearchButton Component
// This component renders a search button that opens a search bar for users to search for wheels.
const HeaderSearchButton: React.FC<{
  isHomepage: boolean;
}> = ({ isHomepage }) => {
  const [open, setOpen] = React.useState(false); // State to manage the visibility of the search bar

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true);
  };
  // press esc to close the search bar
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    if (open) {
      // Focus the input when search is opened
      const input = document.querySelector('input[name="search"]');
      if (input) {
        (input as HTMLInputElement).focus();
      }
      // press esc to close the search bar
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const onSubmit = (data: { search: string }) => {
    // if (data.search.trim() !== "") {
    //     console.log("Search submitted:", data.search.trim());
    // }
  };

  const searchInput = watch('search');

  return (
    <div>
      {/* Render the search bar if `open` is true */}
      {open && (
        <div className="">
          {/* Overlay to close the search bar when clicked */}
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-900/20 border-none cursor-default h-dvh w-full fixed left-0"
          ></button>
          {/* Search bar container */}
          <div className="bg-white h-20 z-[150] fixed top-0  left-1/2 -translate-x-1/2 w-full max-w-7xl">
            <form
              className=" h-full flex items-center border-b border-gray-300"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full h-full">
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Search Wheel"
                      className="px-10 font-medium bg-white text-2xl h-full border-none focus:outline-none w-full text-black"
                    />
                  )}
                />
              </div>
              {/* Submit button */}
              <div className="w-max h-full flex gap-4 items-center px-10">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-full flex items-center"
                >
                  <X className="text-3xl h-full text-black" />
                </button>
                <button type="button" className="h-full flex items-center">
                  <SearchIcon className="text-3xl h-full text-black" />
                </button>
              </div>
            </form>
            {/* Search results as a list of links like suggestion which contain a link, image, title and price */}
            <SearchSuggestion setOpen={setOpen} searchInput={searchInput} />
          </div>
        </div>
      )}
      {/* Search button */}
      <button onClick={onClick} className="border-none  foucs:outline-none">
        {' '}
        <Search />
      </button>
    </div>
  );
};

export default HeaderSearchButton; // Export the component as the default export
