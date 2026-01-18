import { useQuantityModal } from '@/hooks/useQuantityModal';
import { updateCartQuantity } from '@/redux/features/cartSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { calculateCartTotal, getPrice } from '@/utils/price';
import { Minus, Plus, Truck, X } from 'lucide-react';
import { useMemo } from 'react';

export const ProductQuantity = () => {
  const { open, setOpen, product } = useQuantityModal();
  const dispatch = useAppDispatch();

  const { products } = useTypedSelector((state) => state.persisted.cart);

  const cartProduct = useMemo(() => {
    return products.find((p) => p.id === product?.id);
  }, [product, products]);

  const updateQuantity = (type: 'increase' | 'decrease') => {
    if (product) {
      dispatch(
        updateCartQuantity({
          id: product.id,
          quantity: type === 'decrease' ? -1 : 2,
        })
      );
    }
  };

  if (!cartProduct || !product) return null;
  return (
    <div
      className={`absolute inset-0 bg-white z-60 transform transition-transform duration-300 flex flex-col ${open ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="p-8 flex justify-end">
        <button onClick={() => setOpen(false)}>
          <X size={28} className="text-gray-400" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-10 pt-4">
        {/* Pro Tip Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-2">
            <div className="text-orange-600 bg-orange-50 p-2 rounded-full">
              <Truck size={32} />
            </div>
            <div className="absolute -top-1 -right-1 bg-white p-0.5 rounded-full">
              <div className="bg-orange-600 w-3 h-3 rounded-full border-2 border-white" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-[#ff5a13] italic uppercase">
            PRO tip
          </h3>
          <p className="text-2xl font-black text-slate-800 leading-tight mt-2 px-8">
            Replace tires in pairs for better traction and braking
          </p>
          <p className="text-sm text-gray-500 mt-4 leading-snug">
            Most drivers replace 4 tires. If you had a flat tire, replace at
            least two.
          </p>
        </div>

        {/* Selector Section */}
        <div className="w-full max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Select tire quantity
            </span>
            <span className="text-sm text-gray-400">
              Total price •{' '}
              <span className="font-bold text-gray-900">
                {calculateCartTotal([cartProduct])}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-center border-y border-gray-100 py-10 gap-2">
            <button
              onClick={() => updateQuantity('decrease')}
              className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-all"
            >
              <Minus size={24} />
            </button>
            <span className="text-6xl font-black italic text-[#ff5a13]">
              {cartProduct.quantity}
            </span>
            <button
              onClick={() => updateQuantity('increase')}
              className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-all"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-8 pb-12">
        <button
          onClick={() => setOpen(false)}
          className="w-full border-2 border-[#ff5a13] text-[#ff5a13] hover:bg-orange-50 font-black text-lg italic py-4 rounded-full transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
