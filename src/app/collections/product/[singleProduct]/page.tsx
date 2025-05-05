import SingleProductClient from './client-page';

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) => {
  const { singleProduct } = await params; // Get product ID.
  return <SingleProductClient singleProduct={singleProduct} />; // Render the client component.
};

export default SingleProduct;
