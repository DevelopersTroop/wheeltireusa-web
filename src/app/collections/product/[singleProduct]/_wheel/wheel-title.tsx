import { ProductRating } from "@/components/shared/Reviews/components/ProductRating/ProductRating";
import { TWheelProduct } from "@/types/product";

const WheelTitle = ({ product }: { product: TWheelProduct }) => {
    return (
        <div className="flex flex-col">
            <div>
                <p className="text-2xl font-semibold text-gray-800">
                    {product.title} {product.brand} <br />
                    <span className="text-lg">
                        {product.wheelSize || `${product.diameter}" x ${product.width}"`}
                    </span>
                </p>
            </div>
            <ProductRating productId={product.id} />
        </div>
    );
};

export default WheelTitle;
