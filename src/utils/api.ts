export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
export const s3BucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
export const env = process.env.NEXT_PUBLIC_ENV;
export const getCategories = async () => {
  const response = await fetch(`${apiBaseUrl}/categories/list`);
  const {
    data: { categories },
  } = await response.json();
  return categories;
};
