export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  verified: boolean;
  role: TRole;
  iat: number;
  exp: number;
  iss: string;
};

export type TRole = {
  id: string;
  name: string;
  slug: string;
  description: string;
  updatedBy: string | null;
  deletedBy: string | null;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
};
