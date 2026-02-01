const ProductCardSkeleton = () => {
  return (
    <div className={"border border-white rounded-xl px-2 pb-8 w-[300px]"}>
      <div className={"relative"}>
        <div className="animate-color-pulse mx-auto d-block rounded-xl w-full h-[238px]"></div>
      </div>
      <div className={"mt-6"}>
        <div className="animate-color-pulse rounded-xl h-4 w-full"></div>
        <div className="animate-color-pulse rounded-xl mt-3 h-4 w-2/3"></div>
      </div>
      <div className={"mt-5"}>
        <div className="animate-color-pulse rounded-xl h-2 mt-2"></div>
        <div className="animate-color-pulse rounded-xl h-2 mt-2"></div>
        <div className="animate-color-pulse rounded-xl h-2 mt-2"></div>
        <div className="animate-color-pulse rounded-xl h-2 mt-2"></div>
        <div className="animate-color-pulse rounded-xl h-2 mt-2"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
