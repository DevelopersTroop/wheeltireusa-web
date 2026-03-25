import { TTireProduct } from "@/types/product";
import ImageGallery from "../ImageGallery";
import TireDetails from "./tire-details";
import TireSpecifications from "./tire-specifications";
import TireTitle from "./tire-title";
import TireProvider from "./context/TireProvider";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import TireTabs from "./tire-tabs";

export const step = 4;
export const duallyStep = 6;

const Tire = ({ product }: { product: TTireProduct }) => {
  return (
    <TireProvider>
      <div className="min-h-screen bg-white">

        {/* ── DARK HEADER BAND ── */}
        <div className="bg-[#2F2F2F] rounded-t-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 border-b border-white/10">
            <Breadcrumb>
              {[
                { label: "Home", href: "/" },
                { label: "Collection", href: "/collections/product-category/tires" },
                { label: "Tire", href: "/collections/product-category/tires" },
                { label: product?.partNumber ?? "", href: `/collections/product/${product.slug}` },
              ].map((item, index, arr) => (
                <li key={index} className="flex items-center gap-1 text-xs">
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                  {index < arr.length - 1 && (
                    <MdChevronRight className="text-white/20" />
                  )}
                </li>
              ))}
            </Breadcrumb>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <TireTitle product={product} />
          </div>
        </div>

       
        

        {/* ── MAIN BODY ── */}
        <div className="max-w-7xl sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-10 items-center relative">

            {/* LEFT */}
            <div className="flex-1 min-w-0">
              <div className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50">
                <ImageGallery
                  product={product}
                  fallbackImage="/tire-not-available.webp"
                />
              </div>

              <div className="mt-8">
                <TireTabs product={product} />
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:w-[400px] w-full flex-shrink-0 self-start sticky top-6">
              <div className="flex flex-col gap-4">

                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-[#2F2F2F] px-5 py-3">
                    <p className="text-gray-200 text-xs font-semibold uppercase tracking-widest">
                      Pricing & Details
                    </p>
                  </div>

                  <div className="p-5">
                    <TireDetails product={product} />
                  </div>

                  {/* MOBILE: full specs under pricing */}
                  

                  {/* DESKTOP: full specs in sidebar */}
                 <div className="lg:hidden px-4 sm:px-6 mt-4">
  <TireSpecifications product={product} variant="full" />
</div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </TireProvider>
  );
};

export default Tire;