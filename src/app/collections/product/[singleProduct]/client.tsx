"use client";
import { trackEvent } from "@/lib/tracker";
import { useEffect, useRef } from "react";
import Tire from "./_tire/tire";
import "./single-product.css";
import { TInventoryItem } from "@/types/product";
import Container from "@/components/ui/container/container";

const SingleProductClient: React.FC<{ product: TInventoryItem }> = ({
  product,
}) => {
  const analyticsSend = useRef(false);

  useEffect(() => {
    // 2. Check the .current property
    if (analyticsSend.current) return;

    // 3. Ensure product data is loaded before tracking
    // if (product) {
    //   trackEvent("product_view", {
    //     productId: String(product.id),
    //     productName: product.title, // Good practice to include name for marketing logs
    //   });

    //   // 4. Update the .current property to true
    //   analyticsSend.current = true;
    // }
  }, [product]); // Dependency ensures this runs when data arrives

  if (!product) {
    return null;
  }

  let productBasedOnCategory = <></>;
//   if (product.category.title === "wheels") {
//     productBasedOnCategory = <Wheels product={product} />;
//   } else 
    if (product.category.title === "tires") {
    productBasedOnCategory = <Tire product={product} />;
  } 
//   else if (product.category.title === "accessories") {
//     productBasedOnCategory = <Accessory product={product} />;
//   } else {
//     productBasedOnCategory = <Wheels product={product} />;
//   }
  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProductClient;
