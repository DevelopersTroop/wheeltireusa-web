import React from 'react';
import BrickBoxSkeleton from '../BrickBoxSkeleton/BrickBoxSkeleton';
const ListSkeleton = ({ title }: { title: string }) => {
  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <BrickBoxSkeleton className="w-1/3" />
      </div>

      <div className="text-muted-dark text-[20px] px-6 order-3">
        Select {title}
      </div>
      <div className="grid grid-cols-5 gap-3 px-6 order-5">
        {Array.from({ length: 50 }).map((_, index) => (
          <BrickBoxSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default ListSkeleton;
