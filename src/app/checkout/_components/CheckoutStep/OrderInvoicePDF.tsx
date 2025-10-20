'use client';
import { TOrder } from '@/types/order';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

// Define primary colors and styles for the PDF
const primaryColor = '#DB1922';
const lightGray = '#F5F5F5';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontSize: 12, // Default font size
    backgroundColor: 'white', // Background color for the page
  },
  headerBand: {
    backgroundColor: primaryColor, // Header background color
    padding: 20, // Padding for the header
    marginBottom: 20, // Space below the header
  },
  headerContent: {
    flexDirection: 'row', // Arrange content in a row
    justifyContent: 'space-between', // Space between elements
    color: 'white', // Text color
    alignItems: 'center', // Align items vertically
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
    borderRadius: 4,
    border: '1px solid #E5E5E5',
  },
  sectionTitle: {
    backgroundColor: primaryColor,
    color: 'white',
    padding: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 10,
  },
  addressText: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: primaryColor,
    padding: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    padding: 8,
    backgroundColor: 'white',
  },
  tableCell: {
    fontSize: 10,
  },
  productCell: { width: '30%' },
  skuCell: { width: '25%' },
  priceCell: { width: '12%', textAlign: 'right' },
  qtyCell: { width: '10%', textAlign: 'center' },
  totalCell: { width: '13%', textAlign: 'right' },
  totalsSection: {
    marginTop: 20,
    borderTop: '1px solid #E5E5E5',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: '30%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalAmount: {
    width: '15%',
    textAlign: 'right',
    fontSize: 10,
  },
  grandTotal: {
    fontSize: 12,
    fontWeight: 'bold',
    color: primaryColor,
  },
  footer: {
    marginTop: 40,
    padding: 20,
    textAlign: 'center',
    color: primaryColor,
    fontSize: 10,
    borderTop: `1px solid ${primaryColor}`,
  },
});

// Mapping for wheel configuration fields
const wheelConfigurationMapping = {
  centerCapTitle: 'Center Cap',
  customFinish: 'Custom Finish',
  customFinishExtraInfo1: 'Custom Finish Extra Info 1',
  customFinishExtraInfo2: 'Custom Finish Extra Info 2',
  customFinishExtraInfo3: 'Custom Finish Extra Info 3',
  finishType: 'Finish Type',
  frontDiameter: 'Front Wheel Diameter',
  frontForging: 'Front Wheel Forging Type',
  frontLipSize: 'Front Lip Size',
  frontWidth: 'Front Wheel Width',
  hardwareFinishes: 'Hardware Finishes',
  innerBarrelLipFinish: 'Inner Barrel Lip Finish',
  multiPiece: 'Multi-Piece Construction',
  outerBarrelLipFinish: 'Outer Barrel Lip Finish',
  rearDiameter: 'Rear Wheel Diameter',
  rearForging: 'Rear Wheel Forging Type',
  rearLipSize: 'Rear Lip Size',
  rearWidth: 'Rear Wheel Width',
  standardFinish: 'Standard Finish',
  wantWidestPossibleWidth: 'Maximize Wheel Width',
  horn: 'Horn',
  letAmaniForgedDetermineSize: 'Amani Forged Determine Tire Size',
  year: 'Year',
  make: 'Make',
  model: 'Model',
  bodyType: 'Body Type',
  subModel: 'Sub Model',
};

// Helper function to format values
const formatValue = (value: any, key: string, shouldInch: string[]) => {
  if (typeof value === 'object') {
    return JSON.stringify(value); // Convert objects to JSON strings
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'; // Convert booleans to "Yes" or "No"
  }

  if (shouldInch.includes(key)) {
    return `${value} "`; // Append inches for specific fields
  }

  if (typeof value === 'string') {
    return value.length > 0 ? value : 'N/A'; // Return "N/A" for empty strings
  }

  return value; // Return the value as-is
};

// Helper function to manipulate wheel configuration mapping
const maniPulatedWheelConfigurationMapping = ([key, value]: [string, any]) => {
  const shouldSkip = [
    'centerCapTitle',
    'customFinish',
    'customFinishExtraInfo1',
    'customFinishExtraInfo2',
    'customFinishExtraInfo3',
    'finishType',
    'hardwareFinishes',
    'innerBarrelLipFinish',
    'outerBarrelLipFinish',
    'totalProvidedDiscount',
    'coupon',
  ];
  const shouldInch = [
    'frontDiameter',
    'frontLipSize',
    'frontWidth',
    'rearDiameter',
    'rearLipSize',
    'rearWidth',
  ];
  if (shouldSkip.includes(key)) return null;

  return {
    key: wheelConfigurationMapping[
      key as keyof typeof wheelConfigurationMapping
    ],
    value: formatValue(value, key, shouldInch),
  };
};

// Main OrderInvoicePDF Component
const OrderInvoicePDF: React.FC<{ order: TOrder | undefined }> = ({
  order,
}) => {
  if (!order) return null;

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBand}>
          <Text style={styles.headerTitle}>Order Invoice</Text>
          <View style={styles.headerContent}>
            <View>
              <Text>Date: {formatDate(order.createdAt)}</Text>
              <Text>Order ID: {order?.orderId}</Text>
              <Text>
                Order Email:{' '}
                {order.data?.user?.email
                  ? order.data.user.email
                  : order.data?.billingAddress?.email}
              </Text>
            </View>
            <Text>Status: {order.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Shipping Address */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              columnGap: 20,
            }}
          >
            <View style={[styles.section, { width: '100%' }]}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              {order.data.paymentMethod === 'card' ? (
                <View style={styles.sectionContent}>
                  <Text style={styles.addressText}>
                    {order.data.shippingAddress.name}
                  </Text>
                  {order.data.shippingAddress.company && (
                    <Text style={styles.addressText}>
                      {order.data.shippingAddress.company}
                    </Text>
                  )}
                  <Text style={styles.addressText}>
                    {order.data.shippingAddress.address1}
                  </Text>
                  {order.data.shippingAddress.address2 && (
                    <Text style={styles.addressText}>
                      {order.data.shippingAddress.address2}
                    </Text>
                  )}
                  <Text style={styles.addressText}>
                    {order.data.shippingAddress.cityState}
                  </Text>
                  <Text style={styles.addressText}>
                    {order.data.shippingAddress.country} -{' '}
                    {order.data.shippingAddress.zipCode}
                  </Text>
                  <Text style={styles.addressText}>
                    Phone: {order.data.shippingAddress.phone}
                  </Text>
                  {order.data.shippingAddress.email && (
                    <Text style={styles.addressText}>
                      Email: {order.data.shippingAddress.email}
                    </Text>
                  )}
                </View>
              ) : (
                <View style={styles.sectionContent}>
                  <Text style={styles.addressText}>
                    {!order.data.shippingAddress.name
                      ? order.data.selectedDealerInfo?.address ||
                        order.data.localDealerInfo?.name
                      : order.data.shippingAddress.name}
                  </Text>
                  {order.data.shippingAddress.company &&
                    !order.data.selectedDealer &&
                    !order.data.localDealerInfo && (
                      <Text style={styles.addressText}>
                        {order.data.shippingAddress?.company}
                      </Text>
                    )}
                  <Text style={styles.addressText}>
                    {order.data.selectedDealerInfo?.address1 ||
                      order.data.localDealerInfo?.address ||
                      order.data.shippingAddress.address1}
                  </Text>
                  {(order.data.selectedDealerInfo?.address2 ||
                    order.data.shippingAddress.address2) && (
                    <Text style={styles.addressText}>
                      {order.data.selectedDealerInfo?.address2 ||
                        order.data.shippingAddress.address2}
                    </Text>
                  )}
                  <Text style={styles.addressText}>
                    {order.data.selectedDealerInfo?.stateProvinceDisplayName ||
                      order.data.shippingAddress.cityState}
                  </Text>
                  <Text style={styles.addressText}>
                    {order.data.selectedDealerInfo?.country ||
                      order.data.shippingAddress.country}{' '}
                    -{' '}
                    {order.data.shippingAddress.zipCode ||
                      order.data.selectedDealerInfo?.zipCode}
                  </Text>
                  <Text style={styles.addressText}>
                    Phone:{' '}
                    {order.data.selectedDealerInfo?.addressPhone ||
                      order.data.shippingAddress.phone ||
                      order.data.localDealerInfo?.phone}
                  </Text>
                  {order.data.shippingAddress.email &&
                    !order.data.selectedDealer &&
                    !order.data.localDealerInfo && (
                      <Text style={styles.addressText}>
                        Email: {order.data.shippingAddress.email}
                      </Text>
                    )}
                </View>
              )}
            </View>
            {/* Billing Address */}
            <View style={[styles.section, { width: '100%' }]}>
              <Text style={styles.sectionTitle}>Billing Address</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.addressText}>
                  {order.data.billingAddress.name}
                </Text>
                <Text style={styles.addressText}>
                  {order.data.billingAddress.company}
                </Text>
                <Text style={styles.addressText}>
                  {order.data.billingAddress.address1}
                </Text>
                {order.data.billingAddress.address2 && (
                  <Text style={styles.addressText}>
                    {order.data.billingAddress.address2}
                  </Text>
                )}
                <Text style={styles.addressText}>
                  {order.data.billingAddress.cityState}
                </Text>
                <Text style={styles.addressText}>
                  {order.data.billingAddress.country} -{' '}
                  {order.data.billingAddress.zipCode}
                </Text>
                <Text style={styles.addressText}>
                  Phone: {order.data.billingAddress.phone}
                </Text>
                <Text style={styles.addressText}>
                  Email: {order.data.billingAddress.email}
                </Text>
              </View>
            </View>
          </View>

          {/* Products Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.productCell]}>
                Product
              </Text>
              <Text style={[styles.tableCell, styles.skuCell]}>SKU</Text>
              <Text style={[styles.tableCell, styles.priceCell]}>Price</Text>
              <Text style={[styles.tableCell, styles.qtyCell]}>Qty</Text>
              <Text style={[styles.tableCell, styles.totalCell]}>Total</Text>
            </View>
            {/* Render each product */}
            {order.data.productsInfo.map((product: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, styles.productCell]}>
                  <Text>{product.title}</Text>
                  {product.metaData ? (
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          borderBottom: '1px solid #f7f7f7',
                          fontSize: '12px',
                          marginBottom: 3,
                        }}
                      >
                        Customized Data
                      </Text>
                      {Object.entries(product.metaData)
                        .map(maniPulatedWheelConfigurationMapping)
                        .filter((p) => p !== null)
                        .map(({ key, value }) => {
                          return (
                            <View key={key}>
                              <Text>
                                <Text style={{ fontWeight: 'semibold' }}>
                                  {key}:
                                </Text>{' '}
                                {value}
                              </Text>
                            </View>
                          );
                        })}
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.tableCell, styles.skuCell]}>
                  {product.sku}
                </Text>
                <Text style={[styles.tableCell, styles.priceCell]}>
                  {formatCurrency(product.price)}
                </Text>
                <Text style={[styles.tableCell, styles.qtyCell]}>
                  {product.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  {formatCurrency(product.price * product.quantity)}
                </Text>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalAmount}>
                {formatCurrency(Number(order.data.totalCost))}
              </Text>
            </View>
            {order.data?.discount ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount:</Text>
                <Text style={styles.totalAmount}>
                  - {formatCurrency(order.data.discount)}
                </Text>
              </View>
            ) : (
              ''
            )}
            {order.data.deliveryCharge ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Delivery Charge:</Text>
                <Text style={styles.totalAmount}>
                  + {formatCurrency(Number(order.data.deliveryCharge))}
                </Text>
              </View>
            ) : (
              ''
            )}
            {order.data.taxAmount ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Sales Tax:</Text>
                <Text style={styles.totalAmount}>
                  + {formatCurrency(Number(order.data.taxAmount))}
                </Text>
              </View>
            ) : (
              ''
            )}
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, styles.grandTotal]}>
                Grand Total:
              </Text>
              <Text style={[styles.totalAmount, styles.grandTotal]}>
                {formatCurrency(Number(order.data.totalWithTax))}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>Thank you for your purchase!</Text>
            <Text style={{ marginTop: 5 }}>
              For questions, contact sales@amaniforged.com
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderInvoicePDF;
