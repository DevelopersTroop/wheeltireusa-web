import Container from "@/components/ui/container/container";
import Link from "next/link";

const items = [
  { title: "Wheel & Tire Packages", href: "/collections/product-category/wheels" },
  { title: "Wheels", href: "/collections/product-category/wheels" },
  { title: "Tires", href: "/collections/product-category/tires" },
  { title: "Suspension", href: "/collections/product-category/accessories" },
  { title: "Performance", href: "/collections/product-category/accessories" },
  { title: "Lighting", href: "/collections/product-category/accessories" },
  { title: "Exterior Accessories", href: "/collections/product-category/accessories" },
  { title: "Interiror Accessories", href: "/collections/product-category/accessories" },
  { title: "Wheel Accessories", href: "/collections/product-category/accessories" },
  { title: "Spacers & Adapters", href: "/collections/product-category/accessories" },
  { title: "Truck & Wheel Care", href: "/collections/product-category/accessories" },
  { title: "Apparel", href: "/collections/product-category/accessories" },
];

export const Categories = () => {
  return (
    <Container className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-16">
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-items-center">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group w-full hover:scale-105 transition-all duration-300 text-center flex flex-col items-center bg-white shadow-md py-3 px-2 sm:py-4 sm:px-3 rounded-sm"
          >
            <div className="relative w-full aspect-[3/2] mb-2">
              <img
                src={`/images/categories/${index + 1}.png`}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-semibold text-[11px] xs:text-xs sm:text-sm lg:text-base xl:text-sm group-hover:text-primary transition-all duration-300 leading-tight">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </Container>
  );
};