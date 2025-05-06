'use client';

// NoProductsFound component displays a message when no products are found based on user selection
const NoProductsFound = () => {
  return (
    <div className="w-full flex-col flex items-center gap-4">
      {/* <div className="mx-auto">
        <Image className="block" src={"/images/product/no-product-found.webp"} width={400} height={332} alt="No Product Found" />
      </div> */}
      {/* Display a message informing the user that no products were found */}
      <h1 className="p-5 pb-0 font-semibold  sm:text-2xl rounded-md text-btext text-center">
        No products were found matching your selection.
      </h1>
    </div>
  );
};

export default NoProductsFound;
