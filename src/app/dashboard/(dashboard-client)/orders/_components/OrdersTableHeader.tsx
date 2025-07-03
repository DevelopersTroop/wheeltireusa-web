const OrdersTableHeader = () => {
  return (
    <thead>
      <tr className="text-start">
        {[
          'Order',
          'Date',
          'Status',
          'Total',
          'Discount',
          'Net Amount',
          'Actions',
        ].map((header) => (
          <th
            key={header}
            className="py-5 px-4 border-b text-start uppercase font-bold whitespace-nowrap"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default OrdersTableHeader;
