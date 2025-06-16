import { ImageGallery } from '@/components/shared/imageGallery';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import { TInventoryItem } from '@/types/product';
import TireDescription from './tire-description';
import TireDetails from './tire-details';
import { getProductThumbnail } from '@/utils/product';
import TireSpecifications from './tire-specifications';

const Tire = ({ product }: { product: TInventoryItem[] }) => {
  console.log('tire component', product);

  return (
    <div className="container mx-auto px-0 sm:px-4">
      <div className="py-4">
        <Breadcrumb>
          <Item href={'/'}>Home</Item>
          <Item href={'/'}>Collection</Item>
          <Item href={`/`}>Tire</Item>
          <Item isEnd={true} href={`/collections/product/${product[0]?.slug}`}>
            {product[0]?.model_group} {product[1]?.model_group ? '&' : ''}{' '}
            {product[1]?.model_group}
          </Item>
        </Breadcrumb>
      </div>

      <div className="mt-6 flex w-full flex-col gap-4 lg:mt-3 mb-10 lg:flex-row lg:gap-8">
        <div className="flex w-full flex-col lg:w-4/6">
          <div className="w-full">
            <ImageGallery
              images={Array.from({ length: 6 }).map(() => ({
                src: getProductThumbnail(product[0]),
              }))}
            />
          </div>
          <TireDescription product={product[0]} />
        </div>

        <div className="mt-6 w-full lg:mt-0 lg:w-2/6">
          <div className="mt-8 rounded-lg bg-[#F7F7F7] py-1">
            <TireSpecifications
              product={product[0]}
              tire={product[1] !== null ? 'Front' : ''}
            />
            {product[1] !== null && (
              <TireSpecifications product={product[1]} tire={'Rear'} />
            )}
            <TireDetails product={product[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tire;
