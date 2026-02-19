import BannerItem from "./components/BannerItem/BannerItem";
import { PromoBanner } from "./types/BannerGrid";
import "./BannerGrid.css";

const banners: PromoBanner[] = [
  {
    id: "trq",
    href: "/trq/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/u-trq.jpg",
    alt: "TRQ — Quality That Stands Out",
    span: "top-center",
  },
  {
    id: "replace",
    href: "/replace/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/u-replace.jpg",
    alt: "Replace — Guaranteed to Fit",
    span: "top-left",
  },
  {
    id: "lumen",
    href: "/lumen/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/u-lumen.jpg",
    alt: "Lumen — Premium Lighting Products",
    span: "bottom-left",
  },
  {
    id: "spyder",
    href: "/spyder/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/u-spyder.jpg",
    alt: "Spyder — The Latest in Lighting Technology",
    span: "bottom-center-left",
  },
  {
    id: "torxe",
    href: "/torxe/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/u-torxe.jpg",
    alt: "Torxe — High Quality & Affordable",
    span: "bottom-center-right",
  },
  {
    id: "apg",
    href: "/apg/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/u-apg.jpg",
    alt: "APG — Custom Grilles & Side Steps",
    span: "top-right",
  },
  {
    id: "fuel",
    href: "/fuel-wheels/",
    src: "https://images.carid.com/pages/index2/passenger/middle-block/promo/fuel-8.jpg",
    alt: "FUEL — Off-Road Wheels & Rims",
    span: "bottom-right",
  },
];

export default function BannerGrid() {
  const get = (span: PromoBanner["span"]) => banners.find((b) => b.span === span)!;

  return (
    <section className="w-full">
      <ul className="custom-promo-wrap">
        <li className="banner -top-center">
          <BannerItem banner={get("top-center")} />
        </li>
        <li className="banner -top-left">
          <BannerItem banner={get("top-left")} />
        </li>
        <li className="banner -bottom-left">
          <BannerItem banner={get("bottom-left")} />
        </li>
        <li className="banner -bottom-center-left">
          <BannerItem banner={get("bottom-center-left")} />
        </li>
        <li className="banner -bottom-center-right">
          <BannerItem banner={get("bottom-center-right")} />
        </li>
        <li className="banner -top-right">
          <BannerItem banner={get("top-right")} />
        </li>
        <li className="banner -bottom-right">
          <BannerItem banner={get("bottom-right")} />
        </li>
      </ul>
    </section>
  );
}
