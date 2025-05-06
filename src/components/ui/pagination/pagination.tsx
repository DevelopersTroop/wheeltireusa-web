'use client';
import React from 'react';

const Pagination = ({
  ariaLabel = 'Pagination',
  children,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) => {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="inline-flex gap-3 text-base flex-wrap">{children}</ul>
    </nav>
  );
};

export default Pagination;
