const NoProductsFound = () => {
  return (
    <div className="w-full lg:w-3/4 flex-col flex items-center gap-4">
      <h1 className="p-5 font-semibold  sm:text-2xl rounded-md text-btext">
        No products were found matching your selection.
      </h1>
    </div>
  );
};

export default NoProductsFound;
