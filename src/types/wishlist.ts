// import { RootState } from "../globalRedux/store";
// import { TCategory } from "./product";

// import { RootState } from "@/redux/store";
import { TCategory } from './category';

export type WishList = {
  _id: string;
  slug: string;
  data: {
    title: string;
    category: TCategory;
    sku: string;
    item_image: string;
    // currentCustomWheel: RootState["persisted"]["customWheel"]["customWheels"][string];
  };
};

// Type definition for wishlist data
export type TWishListData = {
  wishlist_id: string;
  title: string;
  item_image: string;
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
  _id: string;
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
  category: TCategory;
  item_image: string;
  sku: string;
};
