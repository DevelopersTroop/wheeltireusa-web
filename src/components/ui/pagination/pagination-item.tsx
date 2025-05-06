'use client';
import Link from 'next/link';
import React from 'react';

const PaginationItem = ({
  disabled = false,
  active = false,
  href = '#',
  className = '',
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  className?: string;
}) => {
  const computedClassName = active
    ? 'rounded-[9px] border border-[#210203] px-4 py-3 flex items-center h-10 text-base leading-[19px] text-[#210203]'
    : 'rounded-[9px] border border-[#cfcfcf] px-4 py-3 flex items-center h-10 text-base leading-[19px] text-[#504949]';
  return (
    <li>
      <Link
        {...(!disabled ? { href } : { href: '#' })}
        className={`${computedClassName} ${className}`}
      >
        {children}
      </Link>
    </li>
  );
};

export default PaginationItem;
