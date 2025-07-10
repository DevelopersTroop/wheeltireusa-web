// Interface for defining the structure of a navigation menu item
interface ExploreLink {
  label: string;
  href: string;
}

interface NavMenu {
  label: string;
  href: string;
  children?: NavMenu[];
  target?: '_blank';
  megaMenu?: boolean;
  desc?: string;
  image?: string;
  exploreLinks?: ExploreLink[];
}

// Array of navigation menu items
const navMenus: NavMenu[] = [
  {
    label: 'Shop tires', // Main menu item
    href: '#', // Link to the wheels category
    megaMenu: true, // Indicates this is part of a mega menu
    children: [
      {
        label: 'Tires',
        href: '#',
        desc: 'All the tools you need to help ensure your tires are right when it matters.',
        image: '/images/header/tires.webp',
        children: [
          {
            label: 'All Tires By',
            href: '/collections/product-category/tires',
          },
          {
            label: 'Size',
            href: '#',
          },
          {
            label: 'Brand',
            href: '#',
          },
          {
            label: 'Category',
            href: '#',
          },
        ],
        exploreLinks: [
          {
            label: 'Explore More About Tires',
            href: '/collections/product-category/tires',
          },
          {
            label: 'Explore More About Winter Tires',
            href: '/collections/product-category/tires',
          },
        ],
      },
      {
        label: 'Special Offers',
        href: '#',
        desc: `These promotions and special incentives mean it's the right time to shop`,
        image: '/images/header/specialOffers.webp',
        children: [
          {
            label: 'Promotional Offers',
            href: '#',
          },
          {
            label: 'Rebates & More',
            href: '#',
          },
          {
            label: 'Tires',
            href: '#',
          },
          {
            label: 'Wheels',
            href: '#',
          },
          {
            label: 'Parts & Accessories',
            href: '#',
          },
        ],
        exploreLinks: [
          {
            label: 'Explore Special Offers Offers',
            href: '#',
          },
        ],
      },
    ],
    // children: [
    //   {
    //     label: 'Tire Advice',
    //     href: '#',
    //   },
    // ],
  },
  {
    megaMenu: false,
    label: 'Delivery and Installation',
    href: '/delivery-and-installation',
  },
  {
    megaMenu: false,
    label: 'Deals',
    href: '/deals-and-rebates',
  },
  {
    megaMenu: false,
    label: 'Financing',
    href: '/financing',
  },
  {
    megaMenu: false,
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
      // {
      //   label: 'Sponsorship',
      //   href: '#',
      // },
    ],
  },
];

export default navMenus;
