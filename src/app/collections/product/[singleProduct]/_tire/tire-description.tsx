import { TTireProduct } from "@/types/product";

const TireDescription = ({ product }: { product: TTireProduct }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-gray-900 mb-3">
        About The {product.brand}
      </h2>
      <p className="text-gray-600 text-base leading-relaxed">{product?.title}</p>
    </div>
  );
};

export default TireDescription;
