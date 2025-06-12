import SingleProductClient from './client-page';

const SingleProduct = async ({
  params,
  searchParams,
}: {
  params: Promise<{ singleProduct: string }>;
  searchParams?: Promise<{ slug?: string }>;
}) => {
  const { singleProduct } = await params; // Get product ID.
  const { slug } = (await searchParams) || {}; // Get slug from search params if available.

  return <SingleProductClient slugOne={singleProduct} slugTwo={slug} />; // Render the client component.
};

export default SingleProduct;
