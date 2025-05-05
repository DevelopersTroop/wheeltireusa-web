import { GoChevronRight } from 'react-icons/go';
import React from 'react';
import Link from 'next/link';

const Item = ({
  href,
  isEnd = false,
  children,
}: {
  href: string;
  isEnd?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <li className="inline-flex items-center">
      <Link
        className={`group relative py-1 text-sm ${
          isEnd ? 'text-black font-medium' : 'text-[#504949]'
        } font-medium hover:text-black focus:outline-none focus:text-black`}
        href={href}
      >
        <span className="relative z-10">{children}</span>
      </Link>
      {!isEnd && <GoChevronRight className="text-[#504949] mx-2" />}
    </li>
  );
};

export default Item;
