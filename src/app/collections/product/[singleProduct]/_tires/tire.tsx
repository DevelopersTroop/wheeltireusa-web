import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import { TInventoryItem } from '@/types/product';
import Image from 'next/image';
import TireDescription from './tire-description';
import TireDetails from './tire-details';

const Tire = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="container mx-auto px-0 sm:px-4">
      <div className="py-4">
        <Breadcrumb>
          <Item href={'/'}>Home</Item>
          <Item href={'/'}>Collection</Item>
          <Item href={`/`}>Tire</Item>
          <Item isEnd={true} href={`/collections/product/${product.slug}`}>
            {product?.model_group?.text}
          </Item>
        </Breadcrumb>
      </div>

      <div className="mt-6 flex w-full flex-col gap-4 lg:mt-3 mb-10 lg:flex-row lg:gap-8">
        <div className="flex w-full flex-col lg:w-4/6">
          <div className="w-[100px]">
            <Image
              src={product?.item_image}
              alt={product?.name}
              className="w-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <TireDescription product={product} />
        </div>

        <div className="mt-6 w-full lg:mt-0 lg:w-2/6">
          <div>
            <TireDetails product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tire;
