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
const navMenus: NavMenu[] = [
  {
    label: "Shop Wheels", // Main menu item
    href: "/collections/product-category/wheels", // Link to the wheels category
    meagMenu: true, // Indicates this is part of a mega menu
    children: [
      {
        label: "Shop Wheels",
        href: "/collections/product-category/wheels",
        children: [
          {
            label: "Shop all wheels",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Shop by brands",
            href: "/brands?query=wheels",
          },
        ],
      },
      {
        label: "Wheels By Brands",
        children: [
          {
            label: "Arena",
            href: "/collections/product-category/wheels?brand_desc=Arena",
          },
          {
            label: "Azara",
            href: "/collections/product-category/wheels?brand_desc=Azara",
          },
          {
            label: "XF Off road",
            href: "/collections/product-category/wheels?brand_desc=XF+Offroad",
          },
        ],
      },
      {
        label: "Wheels By Vehicle Type",
        children: [
          {
            label: "Passenger Car",
            href: "/collections/product-category/wheels?q=Passenger Car",
          },
          {
            label: "SUV/Crossover",
            href: "/collections/product-category/wheels?q=SUV/Crossover",
          },
          {
            label: "Truck",
            href: "/collections/product-category/wheels?q=Truck",
          },
          {
            label: "Off‑road/Jeep",
            href: "/collections/product-category/wheels?q=Off‑road/Jeep",
          },
          {
            label: "Sports/Performance",
            href: "/collections/product-category/wheels?q=Sports/Performance",
          },
          {
            label: "Luxury",
            href: "/collections/product-category/wheels?q=Luxury",
          },
          {
            label: "Winter Wheels",
            href: "/collections/product-category/wheels?q=Winter Wheels",
          },
        ],
      },
      {
        label: "Dually Wheels",
        children: [
          {
            label: "Chevy Silverado 3500",
            href: "/collections/product-category/wheels?1=Chevy Silverado 3500",
          },
          {
            label: "Ford F350/450",
            href: "/collections/product-category/wheels?q=Ford F350/450",
          },
          {
            label: "Ford F450",
            href: "/collections/product-category/wheels?q=Ford F450",
          },
          {
            label: "GMC Sierra 3500",
            href: "/collections/product-category/wheels?q=GMC Sierra 3500",
          },
          {
            label: "Ram 3500",
            href: "/collections/product-category/wheels?q=Ram 3500",
          },
        ],
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
    href: "/collections/product-category/wheels",
    children: [
      {
        label: "Shop all packages",
        href: "/collections/product-category/wheels",
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
        href: "/collections/product-category/accessories",
      },
      {
        label: "Leveling Kits",
        href: "/collections/product-category/accessories",
      },
      { label: "Lift Kits", href: "/collections/product-category/accessories" },
      {
        label: "Body Lifts",
        href: "/collections/product-category/accessories",
      },
      {
        label: "Shop By Brand",
        href: "/collections/product-category/accessories",
      },
    ],
  },
  {
    meagMenu: false,
    label: "Accessories",
    href: "/collections/product-category/accessories",
    children: [
      {
        meagMenu: false,
        label: "Wheel Accessories",
        href: "#",
        children: [
          {
            label: "Center Caps",
            href: "/collections/product-category/accessories",
          },
          {
            label: "Lug Nuts",
            href: "/collections/product-category/accessories",
          },
          {
            label: "Wheel Spacers",
            href: "/collections/product-category/accessories",
          },
          {
            label: "Wheel Adapters",
            href: "/collections/product-category/accessories",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Performance",
        href: "#",
        children: [
          {
            label: "Shop All Performance",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Engine Performance",
            href: "/collections/product-category/wheels",
          },
          { label: "Intake", href: "/collections/product-category/wheels" },
          { label: "Driveline", href: "/collections/product-category/wheels" },
          { label: "Brakes", href: "/collections/product-category/wheels" },
          { label: "Exhaust", href: "/collections/product-category/wheels" },
          {
            label: "Tuners & Gauges",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Shop By Brand",
            href: "/collections/product-category/wheels",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Lighting",
        href: "#",
        children: [
          {
            label: "Shop All Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Lighting Accessories",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Exterior Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Interior Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Off-Road Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Auxiliary Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Shop By Brand",
            href: "/collections/product-category/wheels",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Exterior",
        href: "#",
        children: [
          {
            label: "Shop All Exterior",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Armor & Protection",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Bed Accessories",
            href: "/collections/product-category/wheels",
          },
          { label: "Body", href: "/collections/product-category/wheels" },
          {
            label: "Bumpers & Accessories",
            href: "/collections/product-category/wheels",
          },
          { label: "Horns", href: "/collections/product-category/wheels" },
          {
            label: "Overlanding & Camping",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Safety & Storage",
            href: "/collections/product-category/wheels",
          },
          { label: "Step Bars", href: "/collections/product-category/wheels" },
          { label: "Towing", href: "/collections/product-category/wheels" },
          {
            label: "Winches & Recovery",
            href: "/collections/product-category/wheels",
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
            href: "/collections/product-category/wheels",
          },
          { label: "Audio", href: "/collections/product-category/wheels" },
          {
            label: "Interior Protection & Storage",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Interior Safety",
            href: "/collections/product-category/wheels",
          },
          { label: "Seats", href: "/collections/product-category/wheels" },
        ],
      },
    ],
  },

  {
    label: "Financing",
    href: "/financing",
    meagMenu: false,
  },
  {
    meagMenu: false,
    label: "Resource",
    href: "#",
    children: [
      {
        label: "Affiliate Program",
        href: "/affiliates",
      },
    ],
  },
];

export default navMenus;
