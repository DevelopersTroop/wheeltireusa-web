'use client';

import { useGetProductQuery } from '@/redux/apis/product';
import Tire from './_tires/tire';
import { SingleProductSkeleton } from '@/components/shared-old/SingleProductSkeleton';
/**
 * SingleProductClient Component
 * Fetches product details based on the route params and displays the corresponding product component.
 */
const SingleProductClient = ({
  slugOne,
  slugTwo,
}: {
  slugOne: string;
  slugTwo?: string;
}) => {
  const { data, isLoading } = useGetProductQuery({
    slugOne,
    slugTwo: slugTwo ?? '',
  }); // Fetch product data using the singleProduct slug.

  if (isLoading) {
    return <SingleProductSkeleton />;
  }
  if (!data?.product) {
    return <div>Product not found</div>; // Handle case where product data is not available.
  }
  return <Tire product={data?.product} />; // Wrap the product component inside the container.
};

export default SingleProductClient;
