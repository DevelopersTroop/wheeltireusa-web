import { cn } from '@/lib/utils';

type BrickBoxSkeletonProps = {
  [K in keyof React.ComponentProps<'div'>]?: React.ComponentProps<'div'>[K];
};

const BrickBoxSkeleton = ({ className, ...props }: BrickBoxSkeletonProps) => {
  return (
    <div
      className={cn(
        'w-full h-[44.6px] rounded bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[200%_100%]  animate-shimmer',
        className
      )}
      {...props}
    ></div>
  );
};

export default BrickBoxSkeleton;
