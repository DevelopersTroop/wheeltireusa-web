import { TCategory } from './category';
import { TInventoryItem } from './product';

// export type TPostBlock = {
//   id: string;
//   type: string; // e.g., "p", "img", etc.
//   value?: string | {
//     data: string[][];
//   };
//   text?: string;
//   styles?: {
//     color?: string;
//     // Add more style properties as needed, e.g.:
//     // fontSize?: string;
//     // fontWeight?: string;
//     // backgroundColor?: string;
//   };
//   isUploadMode?: boolean;
// };

export interface HeaderBlock {
  id: string;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  value: string;
}

export interface ParagraphBlock {
  id: string;
  type: 'p';
  value: string;
}

export interface RichTextBlock {
  id: string;
  type: 'rich';
  value: string;
}

export interface ImageBlock {
  id: string;
  type: 'image';
  value: string;
  isUploadMode?: boolean;
}

export interface LinkBlock {
  id: string;
  type: 'link';
  value: string;
  text: string;
}

export interface TableBlock {
  id: string;
  type: 'table';
  value: { data: string[][] };
}

export type BlogBlock =
  | HeaderBlock
  | ParagraphBlock
  | RichTextBlock
  | ImageBlock
  | LinkBlock
  | TableBlock;

export type TPost = {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  blocks?: BlogBlock[];
  relatedProducts?: TInventoryItem[];
  description?: string;
  categoryId?: TCategory;
  updatedBy: string | null;
  deletedBy: string | null;
  isDelete: boolean;
  createdAt: string; // or Date, depending on your use case
  updatedAt: string; // or Date
  category?: TCategory;
  faq?: TFaq;
};

export type TFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type TFaq = {
  _id: string;
  items: TFaqItem[];
  isActive: boolean;
  isDelete: boolean;
  postId: string;
  createdBy: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
};
