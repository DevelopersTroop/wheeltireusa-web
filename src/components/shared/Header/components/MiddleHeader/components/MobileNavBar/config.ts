// Interface for defining the structure of a navigation menu item
export interface NavMenu {
  label: string;
  href?: string;
  children?: NavMenu[];
  target?: "_blank";
  meagMenu?: boolean;
  megaeMenuImage?: {
    href: string;
    src: string;
  };
  megaMenuVideo?: {
    href: string;
    src: string;
  };
}

// Array of navigation menu items
const mobileNavMenus: NavMenu[] = [
  {
    label: "Shop Wheels", // Main menu item
    href: "/collections/product-category/wheels", // Link to the wheels category
    meagMenu: true, // Indicates this is part of a mega menu
    children: [
      {
        label: "Shop all wheels",
        href: "/collections/product-category/wheels",
      },
      {
        label: "Shop by brands",
        href: "/brands?query=wheels",
      },
      {
        label: "Make your wheel and tire packages now",
        href: "/collections/product-category/wheels",
      },
    ],
  },
  {
    label: "Shop Tires",
    href: "/collections/product-category/tires",
    meagMenu: false,
    children: [
      {
        label: "Shop all Tires",
        href: "/collections/product-category/tires",
      },
      {
        label: "All-Season",
        href: "/collections/product-category/tires",
      },
      {
        label: "All-Terrain",
        href: "/collections/product-category/tires",
      },
      {
        label: "Dessert Terrain",
        href: "/collections/product-category/tires",
      },
      {
        label: "Hybrid at/mt",
        href: "/collections/product-category/tires",
      },
      {
        label: "Mud terrain",
        href: "/collections/product-category/tires",
      },
      {
        label: "Shop by brand",
        href: "/brands?query=tires",
      },
    ],
  },
  {
    meagMenu: false,
    label: "Wheel & Tire Packages",
    href: "/collection/product-category/wheels",
    children: [
      {
        label: "Shop all packages",
        href: "/collection/product-category/wheels",
      },
    ],
  },

  {
    meagMenu: false,
    label: "Suspension",
    href: "#",
    children: [
      {
        label: "Shop All Suspension",
        href: "/collection/product-category/wheels",
      },
      { label: "Leveling Kits", href: "/collection/product-category/wheels" },
      { label: "Lift Kits", href: "/collection/product-category/wheels" },
      { label: "Body Lifts", href: "/collection/product-category/wheels" },
      { label: "Shop By Brand", href: "/collection/product-category/wheels" },
    ],
  },
  {
    meagMenu: false,
    label: "Wheel Accessories",
    href: "#",
    children: [
      { label: "Center Caps", href: "/collection/product-category/wheels" },
      { label: "Lug Nuts", href: "/collection/product-category/wheels" },
      { label: "Wheel Spacers", href: "/collection/product-category/wheels" },
      { label: "Wheel Adapters", href: "/collection/product-category/wheels" },
    ],
  },
  {
    meagMenu: false,
    label: "Performance",
    href: "#",
    children: [
      {
        label: "Shop All Performance",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Engine Performance",
        href: "/collection/product-category/wheels",
      },
      { label: "Intake", href: "/collection/product-category/wheels" },
      { label: "Driveline", href: "/collection/product-category/wheels" },
      { label: "Brakes", href: "/collection/product-category/wheels" },
      { label: "Exhaust", href: "/collection/product-category/wheels" },
      { label: "Tuners & Gauges", href: "/collection/product-category/wheels" },
      { label: "Shop By Brand", href: "/collection/product-category/wheels" },
    ],
  },
  {
    meagMenu: false,
    label: "Lighting",
    href: "#",
    children: [
      {
        label: "Shop All Lighting",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Lighting Accessories",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Exterior Lighting",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Interior Lighting",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Off-Road Lighting",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Auxiliary Lighting",
        href: "/collection/product-category/wheels",
      },
      { label: "Shop By Brand", href: "/collection/product-category/wheels" },
    ],
  },
  {
    meagMenu: false,
    label: "Exterior",
    href: "#",
    children: [
      {
        label: "Shop All Exterior",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Armor & Protection",
        href: "/collection/product-category/wheels",
      },
      { label: "Bed Accessories", href: "/collection/product-category/wheels" },
      { label: "Body", href: "/collection/product-category/wheels" },
      {
        label: "Bumpers & Accessories",
        href: "/collection/product-category/wheels",
      },
      { label: "Horns", href: "/collection/product-category/wheels" },
      {
        label: "Overlanding & Camping",
        href: "/collection/product-category/wheels",
      },
      {
        label: "Safety & Storage",
        href: "/collection/product-category/wheels",
      },
      { label: "Step Bars", href: "/collection/product-category/wheels" },
      { label: "Towing", href: "/collection/product-category/wheels" },
      {
        label: "Winches & Recovery",
        href: "/collection/product-category/wheels",
      },
    ],
  },
  {
    meagMenu: false,
    label: "Interior",
    href: "#",
    children: [
      {
        label: "Shop All Interior",
        href: "/collection/product-category/wheels",
      },
      { label: "Audio", href: "/collection/product-category/wheels" },
      {
        label: "Interior Protection & Storage",
        href: "/collection/product-category/wheels",
      },
      { label: "Interior Safety", href: "/collection/product-category/wheels" },
      { label: "Seats", href: "/collection/product-category/wheels" },
    ],
  },
  {
    meagMenu: false,
    label: "Support",
    href: "/contact-us",
    children: [
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Financing",
        href: "/financing",
        meagMenu: false,
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
      {
        label: "FAQ",
        href: "/frequently-asked-questions",
      },
      {
        label: "Sponsorship",
        href: "/sponsorship",
      },
      {
        label: "Forgings",
        href: "/forgings",
      },
      {
        label: "Become a Dealer",
        href: "/dealer-register",
      },
      {
        label: "Affiliate Program",
        href: "/affiliates",
      },
    ],
  },
];

export default mobileNavMenus;
