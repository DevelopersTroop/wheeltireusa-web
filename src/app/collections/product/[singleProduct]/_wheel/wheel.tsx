import { TWheelProduct } from "@/types/product";
import ImageGallery from "../ImageGallery";
import WheelActionButtons from "./wheel-action-buttons";
import WheelDescription from "./wheel-description";
import WheelDetails from "./wheel-details";
import WheelSpecifications from "./wheel-specifications";
import WheelTitle from "./wheel-title";
import WheelProvider from "./context/WheelProvider";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import { Reviews } from "@/components/shared/Reviews/Reviews";

const Wheel = ({ product }: { product: TWheelProduct }) => {
    return (
        <WheelProvider>
            <Breadcrumb>
                <Item href={"/"}>Home</Item>
                <Item href={"/collections/product-category/wheels"}>Collection</Item>
                <Item href={"/collections/product-category/wheels"}>Wheels</Item>
                <Item href={`/collections/product/${product.slug}`}>
                    {product?.partNumber}
                </Item>
            </Breadcrumb>
            <div className="mt-4 flex w-full flex-col gap-4 sm:p-4 lg:border">
                <WheelTitle product={product} />
                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* image gallery */}
                    <div className="w-full">
                        <div>
                            <ImageGallery product={product} fallbackImage="/wheel-not-available.webp" />
                        </div>
                        <div className="mt-4 hidden lg:block">
                            <WheelSpecifications product={product} />
                        </div>
                    </div>
                    {/* product details */}
                    <div className="mx-auto flex max-w-[330px] flex-col gap-4 p-2">
                        <WheelDetails product={product} />
                        <div>
                            <WheelActionButtons product={product} />
                        </div>
                    </div>
                </div>

                <div className="lg:hidden">
                    <WheelSpecifications product={product} />
                </div>

                <div className="mt-4">
                    <WheelDescription product={product} />
                </div>
                <div className="mt-4">
                    <Reviews productId={product.id} />
                </div>
            </div>
        </WheelProvider>
    );
};

export default Wheel;
