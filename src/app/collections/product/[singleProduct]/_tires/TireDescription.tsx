import { TInventoryItem } from '@/types/product';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TireDetailsSpecifications from './tire-details-specifications';
import { WriteAReview } from './WriteAReview';
import { Reviews } from './Reviews';

const TireDescription: React.FC<{ product: TInventoryItem[] }> = ({
  product,
}) => {
  // console.log('product === ', product)
  return (
    <div className="w-full mx-auto p-4 bg-[#F7F7F7]">
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="warranty-information">
            Warranty information
          </TabsTrigger>
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
        </TabsList>
        <TabsContent value="description">Description</TabsContent>
        <TabsContent value="specifications">
          <TireDetailsSpecifications product={product} />
        </TabsContent>
        <TabsContent value="reviews">
          <div className="px-4 flex flex-col gap-y-10">
            <div className="space-y-2">
              <WriteAReview productId={product[0]._id} />
            </div>
            <Reviews productId={product[0]._id} />
          </div>
        </TabsContent>
        <TabsContent value="warranty-information">
          Warranty information
        </TabsContent>
        <TabsContent value="sizes">Sizes</TabsContent>
      </Tabs>
    </div>
  );
};

export default TireDescription;
