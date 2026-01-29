import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTypedSelector } from '@/redux/store';
import { TMainFilter } from '@/types/main-filter';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMergedBrickBoxContext } from './context/MergedBrickBoxProvider';

type BrickBoxProps = {
  [K in Exclude<
    keyof React.ComponentProps<'button'>,
    'className' | 'name'
  >]?: React.ComponentProps<'button'>[K];
} & {
  text: React.ReactNode;
  className?: string;
  checked?: boolean;
  isDismissable?: boolean;
  filterType: keyof TMainFilter['filters'];
  fieldName: string;
};

const BrickBoxWithoutTooltip = ({
  text,
  onClick,
  type = 'button',
  className,
  checked = false,
  isDismissable = false,
  fieldName,
  filterType,
  ...props
}: BrickBoxProps) => {
  const [isCheckedState, setIsCheckedState] = useState(checked);
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  useEffect(() => {
    // TODO: Hasib will fix this TS error
    if (
      // @ts-expect-error can't solve this ts error now
      mainFilterState?.filters?.[filterType]?.current?.[fieldName] === text ||
      (fieldName === 'subModel' &&
        // @ts-expect-error can't solve this ts error now
        mainFilterState?.filters?.[filterType]?.current?.[fieldName]
          ?.SubModel === text)
    ) {
      setIsCheckedState(true);
    } else {
      setIsCheckedState(false);
    }
    //TODO: Hasib will fix this TS error
    // @ts-expect-error  can't solve this ts error now
  }, [mainFilterState?.filters?.[filterType]?.current?.[fieldName]]);

  const isMerged = useMergedBrickBoxContext();

  return (
    <button
      type={type}
      className={cn(
        !isMerged
          ? 'bg-white border-muted-dark border rounded px-3 py-[7.5px] inline-flex items-center space-x-2 text-lg text-muted-foreground cursor-pointer hover:text-black hover:border-black'
          : 'inline-flex items-center space-x-2 text-lg text-muted-foreground cursor-pointer',
        !isMerged && isCheckedState ? 'border-black' : '',
        className
      )}
      {...props}
      onClick={onClick}
    >
      {isCheckedState && (
        <div>
          <Check color="#63A82B" size={20} />
        </div>
      )}
      <div
        className={cn(
          'whitespace-nowrap text-ellipsis overflow-hidden',
          isCheckedState && 'text-black font-medium'
        )}
      >
        {text}
      </div>
      {isDismissable && (
        <div className={cn(!isMerged ? 'lg:ml-10 ml-auto' : 'ml-0')}>
          <X size={16} />
        </div>
      )}
    </button>
  );
};

const BrickBox = ({
  showTooltip = false,
  ...props
}: BrickBoxProps & { showTooltip?: boolean }) => {
  return (
    <>
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <BrickBoxWithoutTooltip {...props} />
            </TooltipTrigger>
            <TooltipContent>
              <span>{props.text}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <BrickBoxWithoutTooltip {...props} />
      )}
    </>
  );
};

export default BrickBox;
