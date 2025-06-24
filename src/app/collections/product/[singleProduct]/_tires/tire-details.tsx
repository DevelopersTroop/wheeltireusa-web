'use client';
// Import necessary types and components
import { TInventoryItem } from '@/types/product';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import DeliveryCost from './delivery-cost';
import TireActionButtons from './tire-action-buttons';
import TireSave from './tire-save';
import TireQuantitySection from './tite-quantity-section';

// Component to display in-stock wheel details
const TireDetails = ({ product }: { product: TInventoryItem[] }) => {
  return (
    <>
      {/* Main container for the in-stock wheel details */}
      <div className="">
        {/* Accordion to organize content into collapsible sections */}
        <Accordion
          type="multiple"
          defaultValue={[
            'quantity',
            'delivery-cost',
            'total-price',
            'save-product',
          ]}
        >
          {/* Accordion item for Quantity */}
          <AccordionItem className="border-b border-[#cfcfcf]" value="quantity">
            <AccordionContent className="px-4 py-4">
              <TireQuantitySection product={product[0]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border-b border-[#cfcfcf]"
            value="delivery-cost"
          >
            <AccordionContent className="px-4 py-4">
              <DeliveryCost product={product[0]} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="border-b border-[#cfcfcf]"
            value="total-price"
          >
            <AccordionContent className="px-4 py-4">
              <TireActionButtons product={product} />
            </AccordionContent>
          </AccordionItem>
          {/* Accordion item for saving product */}
          <AccordionItem value="save-product" className="border-none">
            <AccordionContent className="px-4 py-4">
              <TireSave product={product[0]} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default TireDetails;
