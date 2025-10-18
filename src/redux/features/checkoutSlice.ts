import {
  SelecteOptionTitle,
  TAddress,
  TBillingAddress,
  TDealer,
  TOrder,
  TOrderData,
  TOrderInfo,
  TRequestedDealer,
} from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCheckoutState = TOrderData & {
  orderSuccessData: TOrder | undefined;
  newCoupon: string | undefined | null;
  orderId: string;
};

const initialState: TCheckoutState = {
  discount: 0,
  selectedDealer: undefined,
  referralCode: "",
  billingAddress: {
    address1: "",
    cityState: "",
    country: "",
    email: "",
    fname: "",
    lname: "",
    name: "",
    phone: "",
    city: "",
    zipCode: "",
    address2: "",
    company: "",
  },
  shippingAddress: {
    address1: "",
    cityState: "",
    country: "",
    email: "",
    fname: "",
    lname: "",
    name: "",
    city: "",
    phone: "",
    zipCode: "",
    address2: "",
    company: "",
  },
  isAccountCreated: false,
  netCost: "",
  totalCost: "",
  orderInfo: {
    fitmentDetails: "",
    newsLetter: "yes",
    newsLetterText: false,
    orderInfoText: false,
    phone: "",
    salesSpecialistName: "",
    termsAndConditions: false,
  },
  vehicleInformation: "",
  paymentStatus: "",
  productsInfo: [],
  selectedOption: 1,
  shippingMethod: undefined,
  selectedOptionTitle: undefined,
  requestedDealer: undefined,
  selectedDealerInfo: undefined,
  cartType: "",
  orderSuccessData: undefined,
  deliveryCharge: 0,
  isCouponApplied: false,
  couponCode: "",
  couponDiscount: 0,
  dealerDiscountApplied: false,
  localDealerSelected: false,
  localDealerInfo: undefined,
  productBasedDiscount: 0,
  productBasedDiscountApplied: false,
  existingOrderId: "",
  newCoupon: null,
  affiliateDiscount: 0,
  orderId: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setBillingAddress: (
      state: TCheckoutState,
      action: PayloadAction<TBillingAddress>
    ) => {
      state.billingAddress = action.payload;
    },
    setShippingAddress: (
      state: TCheckoutState,
      action: PayloadAction<Partial<TAddress>>
    ) => {
      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      };
    },
    setSelectedDealerInfo: (
      state: TCheckoutState,
      action: PayloadAction<TDealer | undefined>
    ) => {
      state.selectedDealer =
        action.payload?.address || action.payload?.addressPhone
          ? `${action.payload?.address}-${action.payload?.addressPhone}`
          : "";
      state.localDealerSelected = false;
      state.selectedDealerInfo = action.payload;
      state.shippingAddress = {
        address1: "",
        cityState: "",
        country: "",
        email: "",
        fname: "",
        lname: "",
        name: "",
        phone: "",
        zipCode: "",
        address2: "",
        city: "",
        company: "",
        primaryPhone: "",
        password: "",
      };
    },
    setRequestedDealer: (
      state: TCheckoutState,
      action: PayloadAction<TRequestedDealer>
    ) => {
      state.requestedDealer = action.payload;
    },
    setSelectedOptionTitle: (
      state: TCheckoutState,
      action: PayloadAction<SelecteOptionTitle>
    ) => {
      state.selectedOptionTitle = action.payload;
    },
    setSelectedOption: (
      state: TCheckoutState,
      action: PayloadAction<number>
    ) => {
      state.selectedOption = action.payload;
    },
    setShippingMethod: (
      state: TCheckoutState,
      action: PayloadAction<{
        option: number;
        title: SelecteOptionTitle | undefined;
      }>
    ) => {
      state.shippingMethod = action.payload;
    },
    updateDiscount: (
      state,
      action: PayloadAction<{ clearDealer?: boolean; amount: number }>
    ) => {
      if (state.isCouponApplied) {
        state.discount = action.payload.amount + state.couponDiscount;
      } else if (state.productBasedDiscount) {
        state.discount = action.payload.amount + state.productBasedDiscount;
      } else if (state.affiliateDiscount) {
        state.discount = action.payload.amount + state.affiliateDiscount;
      } else {
        state.discount = action.payload.amount;
      }
    },
    clearDealerDiscount: (state, action: PayloadAction<number>) => {
      state.discount = Math.max(0, state.discount - action.payload);
    },
    updateProductFromCart: (state, action: PayloadAction<any[]>) => {
      state.productsInfo = action.payload;
    },
    initiateCheckout: (state) => { },
    setOrderInfo: (state, action: PayloadAction<TOrderInfo>) => {
      state.orderInfo = {
        ...state.orderInfo,
        ...action.payload,
      };
    },
    setIsAccountCreated: (state, action: PayloadAction<boolean>) => {
      state.isAccountCreated = action.payload;
    },
    updateOrderSuccessData: (state, action: PayloadAction<TOrder>) => {
      return {
        ...initialState,
        referralCode: state.referralCode,
        orderSuccessData: action.payload,
      };
    },
    updateCouponCode: (
      state,
      action: PayloadAction<{ couponDiscount: number; couponCode: string }>
    ) => {
      if (state.isCouponApplied) return;
      state.isCouponApplied = true;
      state.couponCode = action.payload.couponCode;
      state.couponDiscount = action.payload.couponDiscount;
      state.discount += state.couponDiscount;
    },
    revokeCouponCode: (state) => {
      if (state.isCouponApplied) {
        state.isCouponApplied = false;
        state.couponCode = "";
        if (state.discount >= state.couponDiscount) {
          state.discount -= state.couponDiscount;
        } else {
          state.discount = 0;
        }
      }
    },
    updateDealerDiscountApplied: (state, action: PayloadAction<boolean>) => {
      state.dealerDiscountApplied = action.payload;
    },
    clearDiscount: (state) => {
      state.discount = 0;
      state.dealerDiscountApplied = false;
      state.isCouponApplied = false;
      state.couponCode = "";
      state.couponDiscount = 0;
      state.productBasedDiscount = 0;
      state.productBasedDiscountApplied = false;
      state.affiliateDiscount = 0;
    },
    updateLocalDealer: (
      state,
      action: PayloadAction<{
        name: string;
        phone: string;
        website: string;
        address: string;
      }>
    ) => {
      state.localDealerSelected = true;
      state.localDealerInfo = action.payload;
      state.selectedDealerInfo = undefined;
      state.requestedDealer = undefined;
      state.selectedDealer = undefined;
      state.shippingAddress = {
        address1: "",
        cityState: "",
        country: "",
        email: "",
        fname: "",
        lname: "",
        name: "",
        city: "",
        phone: "",
        zipCode: "",
        address2: "",
        company: "",
        primaryPhone: "",
        password: "",
      };
    },
    updateVechicleInformation: (state, action: PayloadAction<string>) => {
      state.vehicleInformation = action.payload;
    },
    updateProductBasedDiscount: (state, action: PayloadAction<number>) => {
      state.productBasedDiscount = action.payload;
      state.discount += action.payload;
      state.productBasedDiscountApplied = true;
    },
    clearProudctBasedDiscount: (state) => {
      if (state.discount > 0) {
        state.discount = state.discount - state.productBasedDiscount;
      }
      state.productBasedDiscount = 0;
      state.productBasedDiscountApplied = false;
    },
    mapOrderDataToCheckout: (state, action: PayloadAction<TCheckoutState>) => {
      const payload = action.payload;

      state.newCoupon = action.payload.newCoupon;
      state.discount = payload.discount;
      state.selectedDealer = payload.selectedDealer;
      state.billingAddress = { ...payload.billingAddress };
      state.shippingAddress = { ...payload.shippingAddress };
      state.isAccountCreated = payload.isAccountCreated;
      state.netCost = payload.netCost;
      state.totalCost = payload.totalCost;
      state.orderInfo = { ...payload.orderInfo };
      state.vehicleInformation = payload.vehicleInformation;
      state.paymentStatus = payload.paymentStatus;
      state.productsInfo = [...payload.productsInfo];
      state.selectedOption = payload.selectedOption;
      state.shippingMethod = payload.shippingMethod;
      state.selectedOptionTitle = payload.selectedOptionTitle;
      state.requestedDealer = payload.requestedDealer;
      state.selectedDealerInfo = payload.selectedDealerInfo;
      state.cartType = payload.cartType;
      state.orderSuccessData = payload.orderSuccessData;
      state.deliveryCharge = payload.deliveryCharge;
      state.isCouponApplied = payload.isCouponApplied;
      state.couponCode = payload.couponCode;
      state.couponDiscount = payload.couponDiscount;
      state.dealerDiscountApplied = payload.dealerDiscountApplied;
      state.localDealerSelected = payload.localDealerSelected;
      state.localDealerInfo = payload.localDealerInfo;
      state.productBasedDiscount = payload.productBasedDiscount;
      state.productBasedDiscountApplied = payload.productBasedDiscountApplied;
      state.existingOrderId = payload.existingOrderId;
      state.referralCode = payload.referralCode;
      state.affiliateDiscount = payload.affiliateDiscount;
    },
    addReferralCode: (state, action: PayloadAction<string>) => {
      state.referralCode = action.payload;
    },
    updateAffiliateDiscount: (state, action: PayloadAction<number>) => {
      state.affiliateDiscount = action.payload;
      state.discount += state.affiliateDiscount;
    },
    clearAffiliateDiscount(state) {
      if (state.discount > 0) {
        state.discount -= state.affiliateDiscount;
      }
      state.affiliateDiscount = 0;
    },
    setOrderId(state, action: PayloadAction<string>) {
      state.orderId = action.payload;
    },
    updateValidatedZipCode: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        validatedZipCode: action.payload,
      };
    },
  },
});

export default checkoutSlice.reducer;

export const {
  setBillingAddress,
  setSelectedDealerInfo,
  setShippingAddress,
  setRequestedDealer,
  setSelectedOptionTitle,
  setSelectedOption,
  setShippingMethod,
  updateDiscount,
  updateProductFromCart,
  initiateCheckout,
  setOrderInfo,
  updateOrderSuccessData,
  setIsAccountCreated,
  updateCouponCode,
  revokeCouponCode,
  updateDealerDiscountApplied,
  clearDiscount,
  updateLocalDealer,
  updateVechicleInformation,
  updateProductBasedDiscount,
  clearProudctBasedDiscount,
  mapOrderDataToCheckout,
  addReferralCode,
  updateAffiliateDiscount,
  clearAffiliateDiscount,
  clearDealerDiscount,
  setOrderId,
  updateValidatedZipCode
} = checkoutSlice.actions;
