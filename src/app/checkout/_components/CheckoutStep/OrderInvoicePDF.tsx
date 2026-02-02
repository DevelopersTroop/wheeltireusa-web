'use client';
import { getPrice } from '@/utils/price';
import { TOrder } from '@/types/order';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const primaryColor = '#DB1922';
const lightGray = '#F5F5F5';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    backgroundColor: 'white',
  },
  headerBand: {
    backgroundColor: primaryColor,
    padding: 20,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    alignItems: 'center',
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

const OrderInvoicePDF: React.FC<{ order: TOrder | undefined }> = ({
  order,
}) => {
  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBand}>
          <View style={styles.headerContent}>
            <Text>Date: {formatDate(order.createdAt)}</Text>
            <Text>Status: {order.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.headerTitle}>Order Invoice</Text>
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
              <View style={styles.sectionContent}>
                <Text style={styles.addressText}>
                  {order.data.selectedDealerInfo?.address ||
                    order.data.shippingAddress.name}
                </Text>
                {order.data.shippingAddress.company && (
                  <Text style={styles.addressText}>
                    {order.data.shippingAddress.company}
                  </Text>
                )}
                <Text style={styles.addressText}>
                  {order.data.selectedDealerInfo?.address1 ||
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
                  {order.data.selectedDealerInfo?.stateProvince ||
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
                    order.data.shippingAddress.phone}
                </Text>
                {order.data.shippingAddress.email && (
                  <Text style={styles.addressText}>
                    Email: {order.data.shippingAddress.email}
                  </Text>
                )}
              </View>
            </View>

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

            {order.data.productsInfo.map((product: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.productCell]}>
                  {product.title}
                </Text>
                <Text style={[styles.tableCell, styles.skuCell]}>
                  {product.sku}
                </Text>
                <Text style={[styles.tableCell, styles.priceCell]}>
                  {formatCurrency(getPrice(product))}
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
                  {formatCurrency(order.data.discount)}
                </Text>
              </View>
            ) : (
              ''
            )}
            {order.data.deliveryCharge ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Delivery Charge:</Text>
                <Text style={styles.totalAmount}>
                  {formatCurrency(Number(order.data.deliveryCharge))}
                </Text>
              </View>
            ) : (
              ''
            )}

            {order.data.taxAmount ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax:</Text>
                <Text style={styles.totalAmount}>
                  {formatCurrency(Number(order.data.taxAmount))}
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
              For questions, contact sales@ktcaudio.com
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderInvoicePDF;
