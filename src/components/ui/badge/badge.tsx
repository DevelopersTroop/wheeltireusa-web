import React from 'react';

const Badge = ({
  className = '',
  children,
  bgColor = 'bg-secondary',
  textColor = 'text-white',
}: {
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}) => {
  console.log('bgColor', bgColor);
  console.log('textColor', textColor);
  return (
    <div className={className}>
      <div className={'rounded-[7px] px-[11px] py-[5px]  bg-[#db1922]'}>
        <div className={`text-lg leading-[22px] text-white font-bold`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Badge;
