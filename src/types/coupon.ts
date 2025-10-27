import { TUser } from './user';

export type TCoupon = {
  id: number;
  title?: string | null;
  code: string;
  percentage?: number | null;
  amount?: number;
  expiredAt?: Date | null;
  oneTime: boolean;
  selectedItems?: any | null;
  minimumQuantity?: number | null;
  couponType: string;
  updatedBy?: TUser | null;
  deletedBy?: TUser | null;
  isDelete: boolean;
  deletedAt?: Date | null;
  appliedBy?: AppliedBy[];
  offerText?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface AppliedBy {
  id: number;
  email: string;
  coupon: TCoupon;
  usedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
