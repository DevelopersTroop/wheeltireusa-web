// Interface for defining the structure of a navigation menu item
interface NavMenu {
  label: string;
  href: string;
  children?: NavMenu[];
  target?: '_blank';
  meagMenu?: boolean;
}

// Array of navigation menu items
const navMenus: NavMenu[] = [
  {
    label: 'Shop tires', // Main menu item
    href: '/collections/product-category/tire', // Link to the wheels category
    meagMenu: true, // Indicates this is part of a mega menu
    children: [
      {
        label: 'In-stock All Wheels',
        href: '/collections/product-category/in-stock-wheels',
        children: [
          {
            label: 'In-stock Passenger Wheels',
            href: '/collections/product-category/in-stock-wheels?forging_style=Passenger%2CSignature+Series%2CSignature+XL+Series%2CAXL+Concave%2CWire+Wheels',
          },
          {
            label: 'In-stock Off-Road Wheels',
            href: '/collections/product-category/in-stock-wheels?forging_style=Off-Road',
          },
          {
            label: 'In-stock Dually Wheels',
            href: '/collections/product-category/in-stock-wheels?forging_style=Dually',
          },
          {
            label: 'In-stock Wire Wheels',
            href: '/collections/product-category/in-stock-wheels?forging_style=Wire%20Wheels',
          },
          {
            label: 'In-stock Steering Wheels',
            href: '/collections/product-category/in-stock-steering-wheel',
          },
        ],
      },
      {
        label: 'Custom Order All Wheels', // Submenu for custom wheels
        href: '/pick-your-passenger-forging?wheel_type=custom-wheels',
        children: [
          {
            label: 'Custom Order Passenger Wheels',
            href: '/pick-your-passenger-forging?wheel_type=custom-wheels&passenger=true',
          },
          {
            label: 'Custom Order Off-Road Wheels',
            href: '/collections/product-category/custom-wheels?forging_style=Off-Road',
          },
          {
            label: 'Custom Order Dually Wheels',
            href: '/collections/product-category/custom-wheels?forging_style=Dually',
          },
          {
            label: 'Custom Order Steering Wheels',
            href: '/collections/product-category/custom-steering-wheel',
          },
        ],
      },

      {
        label: 'Browse All Designs',
        href: '/collections/product-category/wheels',
      },
    ],
  },
  {
    label: 'Delivery and Installation',
    href: '/collections/product-category/custom-steering-wheel',
    meagMenu: false,
  },
  {
    label: 'Deals',
    href: '/collections/product-category/in-stock-wheels',
    meagMenu: false,
  },
  {
    meagMenu: false,
    label: 'Tire Advice',
    href: '/tire-advice',
    children: [
      {
        label: 'Contact Us',
        href: '/contact-us',
      },
      {
        label: 'FAQ',
        href: '/frequently-asked-questions',
      },
      {
        label: 'Sponsorship',
        href: '/sponsorship',
      },
      {
        label: 'Forgings',
        href: '/forgings',
      },
    ],
  },
  {
    meagMenu: false,
    label: 'Financing',
    href: '/financing',
  },
  {
    meagMenu: false,
    label: 'Support',
    href: '/contact-us',
    children: [
      {
        label: 'Contact Us',
        href: '/contact-us',
      },
      {
        label: 'FAQ',
        href: '/frequently-asked-questions',
      },
      {
        label: 'Sponsorship',
        href: '/sponsorship',
      },
      {
        label: 'Forgings',
        href: '/forgings',
      },
    ],
  },
];

export default navMenus;
