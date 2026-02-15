"use client";
import { normalizeImageUrl } from "@/lib/utils";
import { IGallery } from "@/types/gallery";
import { TInventoryItem } from "@/types/product";
import { useEffect, useState } from "react";
import Gallery from "react-image-gallery";

interface ImageItem {
  original: string;
  thumbnail: string;
}

const ImageGallery = ({ product }: { product: TInventoryItem | IGallery }) => {
  const [items, setItems] = useState<ImageItem[]>([]);

  // Type Guard to check if it's an Inventory Item vs a Gallery Build
  const isInventoryItem = (
    item: TInventoryItem | IGallery
  ): item is TInventoryItem => {
    return (item as TInventoryItem).itemImage !== undefined;
  };

  useEffect(() => {
    const formattedImages: ImageItem[] = [];

    // 1. Handle Main Image / Thumbnail
    let mainImg = "";
    if (isInventoryItem(product)) {
      mainImg = product.itemImage || "";
    } else {
      mainImg = product.mainImage || product.thumbnail || "";
    }

    if (mainImg) {
      const url = normalizeImageUrl(mainImg);
      formattedImages.push({ original: url, thumbnail: url });
    }

    // 2. Handle Gallery / Additional Images
    let additional: string[] = [];
    if (isInventoryItem(product)) {
      additional = product.galleryImages || [];
    } else {
      // Use images array or additionalImages array from IGallery
      additional = product.additionalImages || [];
    }

    additional.forEach((img) => {
      const url = normalizeImageUrl(img);
      // Avoid duplicating the main image if it's also in the gallery array
      if (url !== normalizeImageUrl(mainImg)) {
        formattedImages.push({ original: url, thumbnail: url });
      }
    });

    setItems(formattedImages);
  }, [product]);

  const imageNotFound = [
    {
      original: "/not-available.webp",
      thumbnail: "/not-available.webp",
    },
  ];

  return (
    <div className="custom-gallery mx-2 flex justify-center">
      <div className="w-full md:w-4/5 lg:w-3/5">
        <Gallery
          showPlayButton={false}
          showNav={true}
          showFullscreenButton={true}
          additionalClass="custom-gallery-container"
          items={items.length > 0 ? items : imageNotFound}
          renderLeftNav={(onClick, disabled) => (
            <button
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-4xl text-white drop-shadow-md hover:scale-110 transition-transform disabled:opacity-30"
              disabled={disabled}
              onClick={onClick}
            >
              &#10094;
            </button>
          )}
          renderRightNav={(onClick, disabled) => (
            <button
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-4xl text-white drop-shadow-md hover:scale-110 transition-transform disabled:opacity-30"
              disabled={disabled}
              onClick={onClick}
            >
              &#10095;
            </button>
          )}
          renderThumbInner={(item) => {
            return (
              <div>
                <img
                  className="h-20 object-contain w-full"
                  src={item.thumbnail}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
