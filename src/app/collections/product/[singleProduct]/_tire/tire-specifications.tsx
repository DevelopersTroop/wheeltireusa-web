import { camelCaseToWords } from "@/utils/string";
import { TInventoryItem } from "@/types/product";

const tire_specs_key: string[] = [
  "manufacturer_part_number",
  "load_index",
  "speed_rating",
  "upc",
  "width",
  "section_width",
  "size",
  "load_index",
  "load_rating_metric",
  "load_rating_standard",
  "max_pressure",
  "ply",
  "speed_rating",
  "rim_diameter",
  "series",
  "max_load",
  "division",
  "tread_depth",
  "weight",
  "finish_warranty",
  "structural_warranty",
  "mileage_warranty",
];

const filterKeyValue = (key: keyof TInventoryItem, value: any) => {
  if (tire_specs_key.includes(key)) return true;
};

const TireSpecifications = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
        Tire Specs
      </h2>
      <div className="mt-2">
        <div className="flex flex-col">
          <p>
            <span className=" font-medium text-gray-600 text-lg">Brand: </span>{" "}
            <span className="text-gray-600 text-base">
              {product?.brand}
            </span>
          </p>
          <p>
            <span className=" font-medium text-gray-600 text-lg">Model: </span>{" "}
            <span className="text-gray-600 text-base">{product.model}</span>
          </p>
        </div>
        {Object.entries(product).map(([key, value]) => {
          if (filterKeyValue(key as keyof TInventoryItem, value)) {
            return (
              <div key={key} className="flex items-center">
                <p>
                  <span className="text-lg font-medium text-gray-600">
                    {camelCaseToWords(key)}:{" "}
                  </span>{" "}
                  <span className="text-base text-gray-600">
                    {" "}
                    {value as string}
                  </span>
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default TireSpecifications;
