import { TCartProduct } from '@/redux/features/cartSlice';
import { TUser } from './user';

export type TOrderInfo = {
  phone: string;
  orderInfoText: boolean;
  newsLetterText: boolean;
  newsLetter: string;
  salesSpecialistName: string;
  fitmentDetails: string;
  termsAndConditions: boolean;
};

export type TDealer = {
  address: string;
  address1: string;
  address2: string;
  addressPhone: string;
  city: string;
  coordinates: { latitude: number; longitude: number };
  country: string;
  countryCode: string;
  createdAt: string;
  deletedBy: null | string;
  distance: null | number;
  isDelete: boolean;
  customer_internal_id: string;
  address_internal_id: string;
  stateProvince: string;
  stateProvinceDisplayName: string;
  updatedAt: string;
  updatedBy: null | string;
  zipCode: string;
};

export type TBillingAddress = {
  name: string;
  fname: string;
  lname: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  cityState: string;
  phone: string;
  email: string;
  zipCode: string;
};

export type TAddress = TBillingAddress & {
  isPrimaryPhone?: boolean;
  password?: string;
  primaryPhone?: string;
};

export type TProductInfo = TCartProduct;

export type TRequestedDealer = {
  businessName: string;
  website: string;
  contact: string;
};

export type SelecteOptionTitle =
  | 'Direct to Customer'
  | 'Local Dealer'
  | 'Requested Dealer';

export type TOrderData = {
  orderInfo: TOrderInfo;
  shippingAddress: TAddress;
  billingAddress: TBillingAddress;
  productsInfo: TProductInfo[];
  affiliateDiscount: number;
  discount: number;
  cartType: string;
  totalCost: string;
  isAccountCreated: any;
  netCost: string;
  selectedDealer?: string;
  selectedOptionTitle?: SelecteOptionTitle;
  selectedDealerInfo?: TDealer;
  requestedDealer?: TRequestedDealer;
  paymentStatus: string;
  selectedOption: number;
  deliveryCharge: number;
  isCouponApplied: boolean;
  couponCode: string;
  shippingMethod?: {
    option: number;
    title: SelecteOptionTitle | undefined;
  };
  couponDiscount: number;
  localDealerSelected: boolean;
  taxAmount?: number;
  totalWithTax?: number;
  productBasedDiscount: number;
  paymentMethod?: string;
  productBasedDiscountApplied: boolean;
  localDealerInfo?: {
    name: string;
    phone: string;
    website: string;
    address: string;
  };
  user?: TUser;
  dealerDiscountApplied: boolean;
  vehicleInformation: string;
  existingOrderId: string;
  referralCode: string;
};

export type TOrder = {
  _id: string;
  email: string;
  data: TOrderData;
  orderId: string;
  status: string;
  updatedBy: string | null;
  deletedBy: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
};
