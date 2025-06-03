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
    href: '/collections/product-category/tires', // Link to the wheels category
    meagMenu: false, // Indicates this is part of a mega menu
    children: [
      {
        label: 'Shop tires',
        href: '/collections/product-category/tires',
      },
    ],
  },
  {
    label: 'Delivery and Installation',
    href: '#',
    meagMenu: false,
  },
  {
    label: 'Deals',
    href: '#',
    meagMenu: false,
  },
  {
    meagMenu: false,
    label: 'Tire Advice',
    href: '#',
    children: [
      {
        label: 'Tire Advice',
        href: '#',
      },
    ],
  },
  {
    meagMenu: false,
    label: 'Financing',
    href: '#',
  },
  {
    meagMenu: false,
    label: 'Support',
    href: '#',
    children: [
      {
        label: 'Contact Us',
        href: '/contact-us',
      },
      {
        label: 'About Us',
        href: '/about-us',
      },
      {
        label: 'FAQ',
        href: '/frequently-asked-questions',
      },
      {
        label: 'Sponsorship',
        href: '#',
      },
    ],
  },
];

export default navMenus;
