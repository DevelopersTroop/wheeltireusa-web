import { metaDataHelper } from "@/utils/metadata";
import { Metadata } from "next";
import TireCategory from "./_tire/TireCategory";
import AccessoriesCategory from "./_accessories/AccessoriesCategory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  try {
    const { categorySlug } = await params;
    const categoryCase = `${categorySlug[0].toUpperCase()}${categorySlug.slice(
      1
    )}`;
    return {
      ...metaDataHelper({
        title: `${categoryCase} - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/collections/product-category/${categorySlug}`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

const Collection = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; page: string }>;
}) => {
  const { categorySlug, page } = await params;

  let categoryDetails = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/details-by-slug/${categorySlug}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data?.statusCode === 200) {
      categoryDetails = data.data.category;
    }
  } catch (error) {
    console.error("Error fetching category details:", error);
  }

  const topDescription = categoryDetails?.topDescription || "";
  const bottomDescription = categoryDetails?.bottomDescription || "";

  let collection = <></>;
  // if (categorySlug === "wheels") {
  //   collection = (
  //     <WheelsCategory
  //       page={Number(page)}
  //       topDescription={topDescription}
  //       bottomDescription={bottomDescription}
  //     />
  //   );
  // } else
     if (categorySlug === "tires") {
    collection = (
      <TireCategory
        page={Number(page)}
        topDescription={topDescription}
        bottomDescription={bottomDescription}
      />
    );
  } 
  // else if (categorySlug === "suspension") {
  //   collection = (
  //     <SuspensionCategory
  //       topDescription={topDescription}
  //       bottomDescription={bottomDescription}
  //     />
  //   );
  // }
   else if (categorySlug === "accessories") {
    collection = (
      <AccessoriesCategory
        page={Number(page)}
        topDescription={topDescription}
        bottomDescription={bottomDescription}
      />
    );
  }

  return collection;
};

export default Collection;
