import Image from "next/image";
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
    <div className="container py-20 px-4">
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-8 justify-items-center">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group hover:scale-110 transition-all duration-300 text-center flex flex-col items-center bg-white shadow-md py-2 px-2"
          >
            <img
              src={`/images/categories/${index + 1}.webp`}
              alt={item.title}
              className="object-contain lg:w-[217px] lg:h-[145px]"
            />
            <h3 className="font-semibold text-xs lg:text-xl group-hover:text-primary transition-all duration-300">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};