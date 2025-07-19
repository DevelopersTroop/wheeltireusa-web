// import { RootState } from "../globalRedux/store";
// import { TCategory } from "./product";

// import { RootState } from "@/redux/store";
import { TCategory } from './category';

export type WishList = {
  id: string;
  slug: string;
  data: {
    title: string;
    image_url: string;
    part_number: string;
    category: TCategory;
    slug: string;
    // currentCustomWheel: RootState["persisted"]["customWheel"]["customWheels"][string];
  };
};

// Type definition for wishlist data
export type TWishListData = {
  wishlist_id: string;
  title: string;
  image_url: string;
  part_number: string;
  category: TCategory;
  slug: string;
};

// Type definition for API response
export type TWishListResult = {
  statusCode: number;
  response: boolean;
  message: string;
  data: {
    total: number;
    pages: number;
    wishlists: TWishlistItem[];
  };
};

export type TWishlistItem = {
  id: string;
  slug: string;
  data: TWishlistItemData;
  updatedBy: string;
  deletedBy: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TWishlistItemData = {
  title: string;
  image_url: string;
  part_number: string;
  category: TCategory;
  slug: string;
};
