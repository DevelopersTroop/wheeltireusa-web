"use client";
import { TInventoryBase } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

interface ImageGalleryProps {
  product: TInventoryBase;
  fallbackImage: string;
}

const ImageGallery = ({ product, fallbackImage }: ImageGalleryProps) => {
  const [productImages, setProductImages] = useState<
    { original: string; thumbnail: string }[]
  >([{ original: fallbackImage, thumbnail: fallbackImage }]); // 👈 prevent flicker

  // ✅ Browser-safe image validator
  const validateImage = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      if (!url) return resolve(fallbackImage);
      const img = new window.Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(fallbackImage);
      img.src = url;
    });
  };

  useEffect(() => {
    if (!product) return;

    const loadImages = async () => {
      // Collect possible image URLs
      const urls = new Set<string>();

      // Prioritize main thumbnail and image fields
      const mainImage = getProductThumbnail(product as any);
      if (mainImage) urls.add(mainImage);

      // Add gallery images if array
      //   if (Array.isArray(product.galleryImages)) {
      //     product.galleryImages.forEach((img) => {
      //       if (img) urls.add(img);
      //     });
      //   }

      // Validate URLs and build final image list
      const validated = await Promise.all(
        Array.from(urls).map((url) => validateImage(url))
      );

      const formatted =
        validated.length > 0
          ? validated.map((url) => ({
            original: url,
            thumbnail: url,
          }))
          : [{ original: fallbackImage, thumbnail: fallbackImage }];

      setProductImages(formatted);
    };

    loadImages();
    // Only rerun when these change
  }, [
    getProductThumbnail(product as any),
    // product.galleryImages,
    fallbackImage,
  ]);

  return (
    <div className="flex justify-center">
      <div className="w-4/5 md:w-3/5">
        <Gallery
          showPlayButton={false}
          showNav={true}
          showFullscreenButton={false}
          items={productImages}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
