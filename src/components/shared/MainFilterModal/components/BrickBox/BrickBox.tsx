import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTypedSelector } from '@/redux/store';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type BrickBoxProps = {
  [K in Exclude<
    keyof React.ComponentProps<'button'>,
    'className'
  >]?: React.ComponentProps<'button'>[K];
} & {
  text: string;
  className?: string;
  checked?: boolean;
  isDismissable?: boolean;
};

const BrickBoxWithoutTooltip = ({
  text,
  onClick,
  type = 'button',
  className,
  checked = false,
  isDismissable = false,
  ...props
}: BrickBoxProps) => {
  const [isCheckedState, setIsCheckedState] = useState(checked);
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  useEffect(() => {
    if (mainFilterState?.current?.model === text) {
      setIsCheckedState(true);
    } else {
      setIsCheckedState(false);
    }
  }, [mainFilterState?.current?.model]);

  return (
    <button
      type={type}
      className={cn(
        'bg-white border-muted-dark border-1 rounded px-3 py-[7.5px] inline-flex items-center space-x-2 text-lg text-muted-foreground cursor-pointer hover:text-black hover:border-black',
        isCheckedState && 'border-black',
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
      <div className="whitespace-nowrap text-ellipsis overflow-hidden">
        {text}
      </div>
      {isDismissable && (
        <div className="ml-10">
          <X size={20} />
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
              <p>{props.text}</p>
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
