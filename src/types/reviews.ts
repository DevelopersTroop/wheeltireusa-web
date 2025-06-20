export type TReviewStatus = 'pending' | 'approved' | 'rejected';

interface TUserSummary {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface TProductSummary {
  _id: string;
}

export interface TReview {
  _id: string;
  productId: TProductSummary;
  userId: TUserSummary;
  rating: number;
  comment: string;
  status: TReviewStatus;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}
