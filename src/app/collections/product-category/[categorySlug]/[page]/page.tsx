import Collection from "../page";

const ProductNavigation = async ({
  params,
}: {
  params: Promise<{ page: string; categorySlug: string }>;
}) => {
  return <Collection params={params} />;
};

export default ProductNavigation;
