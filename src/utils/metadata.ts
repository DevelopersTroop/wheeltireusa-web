import { Metadata } from "next";

export const metaDataHelper = (metaData: Partial<Metadata>): Metadata => {
  const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max - 3) + "..." : str;

  const title = truncate(String(metaData?.title ?? "Default Title"), 60);
  const description = truncate(
    metaData?.description ?? "Default Description",
    160
  );

  const other = {
    other: {
      title: (metaData.openGraph?.title ?? "test") as string,
    },
  };
  return {
    openGraph: {
      images: ["/images/logo.png"],
    },
    ...metaData,
    title,
    description,
    robots: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-video-preview": "large",
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-video-preview": "large",
      },
    },
    ...other,
  };
};
