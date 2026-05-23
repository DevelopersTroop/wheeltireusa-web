"use client";
import Container from "@/components/ui/container/container";
import { TInventoryItem } from "@/types/product";
import { productsByCategory } from "@/utils/product";
import { useEffect, useRef } from "react";
import Tire from "./_tire/tire";
import Wheel from "./_wheel/wheel";
import "./single-product.css";



const SingleProductClient: React.FC<{ product: TInventoryItem }> = ({
  product,
}) => {
  const analyticsSend = useRef(false);

  useEffect(() => {
    if (analyticsSend.current) return;

    // if (product) {
    //   trackEvent("product_view", {
    //     productId: String(product.id),
    //     productName: product.title,
    //   });
    //   analyticsSend.current = true;
    // }
  }, [product]);

  if (!product) {
    return null;
  }

  let productBasedOnCategory = <></>;

  const categorySlug = product.category?.slug;



  if (categorySlug === "wheels") {
    productBasedOnCategory = <Wheel product={productsByCategory(categorySlug, product)} />;
  } else if (categorySlug === "tire") {
    productBasedOnCategory = <Tire product={productsByCategory(categorySlug, product)} />;
  }

  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProductClient;
