import Collection from "../page";

const ProductNavigation = async ({
  params,
  searchParams,
}: {
  params: Promise<{ page: string; categorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined; page?: string }>;
}) => {
  return <Collection params={params} searchParams={searchParams} />;
};

export default ProductNavigation;
