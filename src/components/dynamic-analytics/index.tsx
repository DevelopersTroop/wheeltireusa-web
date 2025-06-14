'use client';

import { useEffect, useRef } from 'react';
import {
  normalize,
  findAncestorWithFirstChildButton,
  findParentLink,
  isDescendantOfFilter,
  isMobileMenuDescandant,
} from './utils';
import { triggerEvent } from '@/utils/analytics';
import { useScreenSize } from '@/hooks/useScreenSize';

export const DynamicAnalytics = () => {
  const screenSize = useScreenSize();
  const isGaSend = useRef(false);
  useEffect(() => {
    isGaSend.current = false;
    const handleClickEvent = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      let eventName = null;
      let label = null;
      let category = '';
      const isMobile = screenSize.screenSize < 768;
      let elementFound = false;
      const headerLink = target.closest('header a');
      const footerLink = target.closest('footer a');
      const pageBtn = target.closest('body button');
      const pageLink = target.closest('body a');
      const isFilter = isDescendantOfFilter(target);
      const underMobileMenu = isMobileMenuDescandant(target);
      if (underMobileMenu) {
        const parentLink = findParentLink(headerLink as any);
        const textContent = target.textContent || target.getAttribute('href');
        const parnetTextContent =
          parentLink?.textContent || parentLink?.getAttribute('href');
        if (parnetTextContent?.length) {
          label = `${normalize(textContent)} clicked from ${normalize(parnetTextContent)} submenu`;
        } else {
          label = `header link clicked`;
        }
        eventName = `mobile_header_link_${normalize(textContent)}_clicked`;
        category = 'mobile_header_link';
        elementFound = true;
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
        const pageTitle = normalize(document.title)?.replace(
          '-amani-forged-wheels',
          ''
        );
        eventName = `${pageTitle}_filter_button_clicked_on_${normalize(parentButton?.firstChild?.textContent)}_with_${sibling?.id}`;
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
          label = `${normalize(textContent)} clicked from ${normalize(parnetTextContent)} submenu`;
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

      if (pageBtn && !elementFound) {
        const textContent = pageBtn.textContent || '';
        const pageTitle = normalize(document.title)?.replace('-tirematic', '');
        eventName = `${pageTitle}_button_${normalize(textContent)}_clicked`;
        elementFound = true;
        label = 'page button clicked';
        category = 'page_button';
      }

      if (pageLink && !elementFound) {
        const textContent =
          pageLink.textContent || pageLink.getAttribute('href');
        const pageTitle = normalize(document.title)?.replace('-tirematic', '');
        eventName = `${pageTitle}_link_${normalize(textContent)}_clicked`;
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
