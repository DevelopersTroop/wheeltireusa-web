export type TCategory = {
  id: number;
  title: string;
  slug: string;
  description: string;
  topDescription: string;
  bottomDescription: string;
  parent: string | null;
  isDelete: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
