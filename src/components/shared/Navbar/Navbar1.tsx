'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavigationMenuDemo() {
  const [activeLi, setActiveLi] = React.useState<'tires' | 'offers'>('tires');
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop Tires</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <button
                  onClick={() => setActiveLi('tires')}
                  type="button"
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-start bg-linear-to-b px-2 no-underline outline-hidden select-none "
                >
                  <div className=" mb-2 text-lg font-medium">Tires</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    All the tools you need to help ensure your tires are right
                    when it matters.
                  </p>
                </button>
              </li>
              {activeLi === 'tires' && (
                <>
                  <ListItem href="#" title="All Tires By"></ListItem>
                  <ListItem href="/collections/product-category/tires" title="">
                    Tires
                  </ListItem>
                  <ListItem href="#" title="">
                    Vehicle
                  </ListItem>
                </>
              )}

              {activeLi === 'offers' && (
                <>
                  <ListItem href="" title="Promotional Offers"></ListItem>
                  <ListItem href="#">Rebates & More</ListItem>
                  <ListItem href="#">Tires</ListItem>
                </>
              )}
            </ul>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <button
                  onClick={() => setActiveLi('offers')}
                  type="button"
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-start bg-linear-to-b px-2 no-underline outline-hidden select-none"
                >
                  <div className="mt-4 mb-2 text-lg font-medium">
                    Special Offer
                  </div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    These promotions and special
                  </p>
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/delivery-and-installation">
              Delivery and Installation
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/deals">Deals</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/tire-advice">Tire Advice</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/financing">Financing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Support</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/contact-us">Contact Us</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/about-us">About Us</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/frequently-asked-questions">FAQ</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
