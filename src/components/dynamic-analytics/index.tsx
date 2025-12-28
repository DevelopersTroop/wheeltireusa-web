'use client';

import { useEffect, useRef } from 'react';
import {
  normalize,
  findAncestorWithFirstChildButton,
  findParentLink,
  isDescendantOfFilter,
  isMobileMenuDescandant,
} from './utils';
import useAuth from '@/hooks/useAuth';
import { useScreenSize } from '@/hooks/useScreenSize';
import { triggerEvent } from '@/utils/analytics';
import { isTireAfterMarketTireSizePossible } from '@/utils/product';

const pathMap = {
  '/': 'home',
  '/collections/product-category/in-stock-wheels': 'in_stock_wheels',
  '/collections/product-category/in-stock-wheels?forging_style=Passenger%2CSignature+Series%2CSignature+XL+Series%2CWire+Wheels':
    'passenger_wheels',
  '/collections/product-category/in-stock-wheels?forging_style=Signature+Series':
    'signature_series',
  '/collections/product-category/in-stock-wheels?forging_style=Signature+XL+Series':
    'signature_xl_series',
  '/collections/product-category/in-stock-wheels?forging_style=Wire+Wheels':
    'wire_wheels',
  '/collections/product-category/in-stock-wheels?forging_style=Offroad':
    'off_road_wheels',
  '/collections/product-category/in-stock-wheels?forging_style=Dually':
    'dually_wheels',

  '/collections/product-category/custom-wheels': 'custom_wheels',
  '/collections/product-category/custom-wheels?tag=New+Collection+2026':
    'new_collection_2026',
  '/collections/product-category/custom-wheels?forging_style=Passenger%2CSignature+Series%2CSignature+XL+Series%2CAXL+Concave%2CWire+Wheels':
    'passenger_custom_wheels',
  '/collections/product-category/custom-wheels?forging_style=Signature+Series':
    'custom_signature_series',
  '/collections/product-category/custom-wheels?forging_style=Signature+XL+Series':
    'custom_signature_xl_series',
  '/collections/product-category/custom-wheels?forging_style=AXL+Concave':
    'axl_concave',
  '/collections/product-category/custom-wheels?forging_style=Off-Road':
    'off_road_custom_wheels',
  '/collections/product-category/custom-wheels?forging_style=Dually':
    'dually_custom_wheels',
  '/megamenu.mp4': 'mega_menu_video',

  '/collections/product-category/custom-steering-wheel':
    'custom_steering_wheels',
  '/collections/product-category/in-stock-steering-wheel':
    'in_stock_steering_wheels',

  '/financing': 'financing',
  '/visualizer': 'visualizer',
  'https://shopamaniforged.com/': 'merch',
  '/collections/product-category/center-cap': 'cap_store',

  '/contact-us': 'contact_us',
  '/about-us': 'about_us',
  '/frequently-asked-questions': 'faq',
  '/sponsorship': 'sponsorship',
  '/forgings': 'forgings',
  '/dealer-register': 'become_a_dealer',
  '/affiliates': 'affiliate_program',
  '/checkout': 'checkout',
  '/cart': 'cart',
};

declare global {
  interface Window {
    dataLayer: any;
    isTireAfterMarketTireSizePossible: typeof isTireAfterMarketTireSizePossible;
  }
}

export const DynamicAnalytics = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user?.id) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'set_user_id',
        user_id: user?.id,
      });
    }
  }, [user?.id]);
  const screenSize = useScreenSize();
  const isGaSend = useRef(false);
  useEffect(() => {
    isGaSend.current = false;
    const handleClickEvent = (event: MouseEvent) => {
      const instock = document.getElementById('home_instock');
      const custom = document.getElementById('home_custom');
      const target = event.target as HTMLElement;
      let eventName = null;
      let label = null;
      let category = '';
      const isMobile = screenSize.screenSize < 768;
      let elementFound = false;
      const headerLink = target.closest('header a');
      const homeInstock = instock && instock.contains(target);
      const homeCustom = custom && custom.contains(target);
      const footerLink = target.closest('footer a');
      const pageBtn = target.closest('body button');
      const pageLink = target.closest('body a');
      const footerBtn = target.closest('footer button');
      const isFilter = isDescendantOfFilter(target);
      const path = pathMap[document.location.pathname as keyof typeof pathMap];
      const underMobileMenu = isMobileMenuDescandant(target);
      if (underMobileMenu) {
        const parentLink = findParentLink(headerLink as any);
        const textContent = target.textContent || target.getAttribute('href');
        const parnetTextContent =
          parentLink?.textContent || parentLink?.getAttribute('href');
        if (parnetTextContent?.length) {
          label = `${normalize(textContent)} clicked from ${normalize(
            parnetTextContent
          )} submenu`;
        } else {
          label = `header link clicked`;
        }
        eventName = `mobile_header_link_${normalize(textContent)}_clicked`;
        category = 'mobile_header_link';
        elementFound = true;
      }

      if (homeInstock) {
        const textContent = target.textContent;
        eventName = `home_instock_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'home link clicked';
        category = 'home_link';
      }
      if (homeCustom) {
        const textContent = target.textContent;
        eventName = `home_custom_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'home link clicked';
        category = 'home_link';
      }

      if (isFilter.filter && isFilter.elem && !elementFound) {
        let sibling = isFilter.elem.nextElementSibling;
        while (sibling) {
          if (
            sibling.tagName.toLowerCase() === 'button' ||
            sibling.tagName.toLowerCase() === 'label'
          ) {
            // Do something with the sibling button or label
            break; // Stop searching after finding one
          }
          sibling = sibling.nextElementSibling;
        }

        sibling = isFilter.elem.previousElementSibling;
        while (sibling) {
          if (
            sibling.tagName.toLowerCase() === 'button' ||
            sibling.tagName.toLowerCase() === 'label'
          ) {
            // Do something with the sibling button or label
            break; // Stop searching after finding one
          }
          sibling = sibling.previousElementSibling;
        }

        const parentButton = findAncestorWithFirstChildButton(
          target.parentElement?.parentElement
        );

        eventName = `${path}_filter_button_clicked_on_${normalize(
          parentButton?.firstChild?.textContent
        )}_with_${sibling?.id}`;
        label = `${normalize(parentButton?.firstChild?.textContent)}_filter`;
        category = `filter_clicked`;
        elementFound = true;
      }

      if (headerLink && !elementFound) {
        const parentLink = findParentLink(headerLink as any);
        const textContent =
          headerLink.textContent || headerLink.getAttribute('href');
        const parnetTextContent =
          parentLink?.textContent || parentLink?.getAttribute('href');
        if (parnetTextContent?.length) {
          label = `${normalize(textContent)} clicked from ${normalize(
            parnetTextContent
          )} submenu`;
        } else {
          label = `header link clicked`;
        }
        eventName = `header_link_${normalize(textContent)}_clicked`;
        category = 'header_link';
        elementFound = true;
      }

      if (footerLink && !elementFound) {
        const textContent = footerLink.textContent;
        eventName = `footer_link_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'footer link clicked';
        category = 'footer_link';
      }

      if (footerBtn && !elementFound) {
        const textContent = footerBtn.textContent;
        eventName = `footer_button_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'footer button clicked';
        category = 'footer_button';
      }

      if (pageBtn && !elementFound) {
        const textContent = pageBtn.textContent || '';

        eventName = `${path}_button_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'page button clicked';
        category = 'page_button';
      }

      if (pageLink && !elementFound) {
        const textContent =
          pageLink.textContent || pageLink.getAttribute('href');

        eventName = `${path}_link_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'page link clicked';
        category = 'page_link';
      }
      if (eventName && !isGaSend.current) {
        triggerEvent(eventName, {
          category,
          label: isMobile ? `${label} with mobile device` : label,
        });
        isGaSend.current = true;

        // // Optional: reset after delay if you want to allow multiple events
        setTimeout(() => {
          isGaSend.current = false;
        }, 2000);
      }
    };
    document.addEventListener('click', handleClickEvent);

    return () => document.removeEventListener('click', handleClickEvent);
  }, []);
  return null;
};
