// Import the Next.js Image component for optimized image rendering

// Component to display a message when the shopping cart is empty
const EmptyCart = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center my-12">
      {/* Container for the empty cart message */}
      <div className="text-center">
        {/* Heading for the empty cart message */}
        <h1 className="text-2xl font-bold text-gray-800">Cart is Empty</h1>
        {/* Subtext providing additional context */}
        <p className="text-gray-600 text-center mt-3">
          {"Look like you haven't made your choice yet..."}
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
