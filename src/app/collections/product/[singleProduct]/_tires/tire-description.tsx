import { TInventoryItem } from '@/types/product';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TireDetailsSpecifications from './tire-details-specifications';

const TireDescription: React.FC<{ product: TInventoryItem[] }> = ({
  product,
}) => {
  // console.log('product === ', product)
  return (
    <div className="w-full mx-auto p-4 bg-[#F7F7F7]">
      <Tabs defaultValue="account" className="w-full">
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
        <TabsContent value="reviews">Reviews</TabsContent>
        <TabsContent value="warranty-information">
          Warranty information
        </TabsContent>
        <TabsContent value="sizes">Sizes</TabsContent>
      </Tabs>
    </div>
  );
};

export default TireDescription;
