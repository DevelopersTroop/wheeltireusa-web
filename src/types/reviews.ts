export type TReviewStatus = 'pending' | 'approved' | 'rejected';

interface TUserSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface TProductSummary {
  id: string;
}

export interface TReview {
  id: string;
  productId: TProductSummary;
  userId: TUserSummary;
  rating: number;
  comment: string;
  status: TReviewStatus;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}
