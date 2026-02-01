import { ProductRating } from "@/components/shared/Reviews/components/ProductRating/ProductRating";
import { TInventoryItem } from "@/types/product";

const TireTitle = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-2xl font-semibold text-gray-800">
          {product.title} {""}
          {product.brand} <br />{" "}
          <span className="text-lg">{product?.tireSize}</span>
        </p>
      </div>
      <ProductRating productId={product.id}/>
    </div>
  );
};

export default TireTitle;
