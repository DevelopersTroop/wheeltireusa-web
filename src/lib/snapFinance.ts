import { TOrderData } from '@/types/order';

export const createSnapFinanceData = (orderId: string, order: TOrderData) => {
  return {
    customerInformation: {
      dobDate: '', // Empty value accepted
      customerId: '', // Empty value accepted
      customerIdType: '', // Empty value accepted
      mobilePhone: order.billingAddress.phone, // Empty value accepted
      mobilePhoneCountry: 'US', // Empty value accepted
      email: order.billingAddress.email, // Empty value accepted
      firstName: order.billingAddress.fname, // Empty value accepted
      lastName: order.billingAddress.lname, // Empty value accepted

      billingAddress: {
        streetAddress: order.billingAddress.address1, // Empty value accepted
        city: order.billingAddress.city, // Empty value accepted
        state: order.billingAddress.cityState, // Empty value accepted
        country: order.billingAddress.country, // Empty value accepted
        postalCode: order.billingAddress.zipCode, // Empty value accepted
        unit: '', // Empty value accepted
      },
    },
    cartInformation: {
      currencyCode: 'USD',
      taxAmount: '0.00',
      shippingAmount: order.deliveryCharge.toFixed(2),
      totalAmount: order.netCost,
      discountAmount: order.discount.toFixed(2),
      orderId: orderId,

      items: order.productsInfo.map((p) => {
        return {
          price: p?.sellingPrice?.toFixed(2),
          itemId: p?.partNumber || p.id,
          description: p.title,
          sku: p?.partNumber,
          quantity: p.quantity,
          leasable: true,
          itemType: 'PRODUCT',
        };
      }),

      shippingAddress: {
        streetAddress: order.shippingAddress.address1, // Empty value accepted
        city: order.shippingAddress.city, // Empty value accepted
        state: order.shippingAddress.cityState, // Empty value accepted
        country: order.shippingAddress.country, // Empty value accepted
        postalCode: order.shippingAddress.zipCode, // Empty value accepted
        unit: '', // Empty value accepted
      },
    },
  };
};

export const getSnapFinanceToken = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SNAP_AUTH_URL}/oauth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_SNAP_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_SNAP_CLIENT_SECRET,
        audience: process.env.NEXT_PUBLIC_SNAP_AUD,
      }),
      cache: 'no-store',
    }
  );

  const data = (await res.json()) as { access_token: string };
  const status = res.status;

  // Check if the API call was successful
  if (status >= 400) {
    throw new Error(`OAuth failed with status`);
  }

  return data.access_token;
};
