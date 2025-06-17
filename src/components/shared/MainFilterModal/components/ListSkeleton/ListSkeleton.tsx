import React from 'react';
import BrickBoxSkeleton from '../BrickBoxSkeleton/BrickBoxSkeleton';
import { cn } from '@/lib/utils';
const ListSkeleton = ({
  title = '',
  onlyItem = false,
  mobile = 1,
  desktop = 5,
}: {
  title?: string;
  onlyItem?: boolean;
  mobile?: number;
  desktop?: number;
}) => {
  return (
    <>
      {!onlyItem ? (
        <>
          <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
            <BrickBoxSkeleton className="w-1/4" />
          </div>

          <div className="text-muted-dark text-[20px] px-6 order-3">
            Select {title}
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        className={cn(
          `grid grid-cols-${mobile} md:grid-cols-${desktop} gap-3 px-6 order-5`
        )}
      >
        {Array.from({ length: 50 }).map((_, index) => (
          <BrickBoxSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default ListSkeleton;
