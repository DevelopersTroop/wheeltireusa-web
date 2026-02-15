import { IGallery } from "@/types/gallery";

interface DetailRow {
  label: string;
  value: string | number | boolean | undefined;
}

const InfoSection = ({
  title,
  details,
}: {
  title: string;
  details: DetailRow[];
}) => {
  // Filter out empty or undefined values
  const activeDetails = details.filter(
    (d) => d.value !== undefined && d.value !== ""
  );

  if (activeDetails.length === 0) return null;

  return (
    <div className="w-full mb-6">
      <h2 className="w-full uppercase text-sm font-bold bg-zinc-800 text-white py-1 px-3 tracking-wider">
        {title}
      </h2>
      <table className="w-full border-collapse">
        <tbody>
          {activeDetails.map((detail, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 font-semibold text-gray-600 w-1/3 text-sm">
                {detail.label}
              </td>
              <td className="p-3 text-gray-900 w-2/3 text-sm">
                {typeof detail.value === "boolean"
                  ? detail.value
                    ? "Yes"
                    : "No"
                  : detail.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GalleryDetails = ({ product }: { product: IGallery }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-4">
        <h2 className="uppercase text-xl font-black text-center py-2 bg-gray-100 border-y border-gray-300">
          Build Specifications
        </h2>
      </div>

      <InfoSection
        title="Vehicle Info"
        details={[
          {
            label: "Year/Make/Model",
            value: `${product.year} ${product.make} ${product.model}`,
          },
          { label: "Trim/Drive", value: product.driveType },
          { label: "Engine", value: product.engine },
        ]}
      />

      <InfoSection
        title="Wheel Specs"
        details={[
          { label: "Brand", value: product.wheelBrand },
          { label: "Model", value: product.wheelModel },
          { label: "Size", value: product.wheelSize },
          { label: "Offset", value: product.wheelOffset },
        ]}
      />

      <InfoSection
        title="Tire Specs"
        details={[
          { label: "Brand", value: product.tireBrand },
          { label: "Model", value: product.tireModel },
          { label: "Size", value: product.tireSize },
        ]}
      />

      <InfoSection
        title="Suspension & Stance"
        details={[
          { label: "Suspension", value: product.suspension },
          { label: "Lift Height", value: product.liftHeight },
          { label: "Trimming", value: product.trimming },
          { label: "Rubbing", value: product.rubbing },
        ]}
      />
    </div>
  );
};

export default GalleryDetails;
