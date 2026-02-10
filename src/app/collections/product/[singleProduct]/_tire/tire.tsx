import { TTireProduct } from "@/types/product";
import ImageGallery from "../ImageGallery";
import ActionButtons from "./action-buttons";
import TireDescription from "./tire-description";
import TireDetails from "./tire-details";
import TireSpecifications from "./tire-specifications";
import TireTitle from "./tire-title";
import TireProvider from "./context/TireProvider";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import { Reviews } from "@/components/shared/Reviews/Reviews";

export const step = 4;
export const duallyStep = 6;

const Tire = ({ product }: { product: TTireProduct }) => {
  return (
    <TireProvider>
      <Breadcrumb>
        <Item href={"/"}>Home</Item>
        <Item href={"/collections/product-category/tires"}>Collection</Item>
        <Item href={"/collections/product-category/tires"}>Tire</Item>
        <Item href={`/collections/product/${product.slug}`}>
          {product?.partNumber}
        </Item>
      </Breadcrumb>
      <div className="mt-4 flex w-full flex-col gap-4 sm:p-4 lg:border">
        <TireTitle product={product} />
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* image gallery */}
          <div className="w-full">
            <div>
              <ImageGallery product={product} fallbackImage="/tire-not-available.webp" />
            </div>
            <div className="mt-4 hidden lg:block">
              <TireSpecifications product={product} />
            </div>
          </div>
          {/* product details */}
          <div className="mx-auto flex max-w-[330px] flex-col gap-4 p-2">
            <TireDetails product={product} />
            <div>
              <ActionButtons product={product} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <TireSpecifications product={product} />
        </div>

        <div className="mt-4">
          <TireDescription product={product} />
        </div>
        <div className="mt-4">
          <Reviews productId={product.id} />
        </div>
      </div>
    </TireProvider>
  );
};

export default Tire;
