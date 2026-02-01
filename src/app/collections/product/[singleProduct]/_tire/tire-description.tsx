import { TInventoryItem } from "@/types/product";

const TireDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl text-gray-700 font-bold">
        {" "}
        About The {product.brand}{" "}
      </h2>
      <p className="text-base text-gray-600 mt-2">{product?.title}</p>
    </div>
  );
};

export default TireDescription;
