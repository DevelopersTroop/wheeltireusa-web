import React from 'react';

const Badge = ({className="", children, bgColor = "bg-secondary", textColor = "text-white"}: {
    className?: string,
    children: React.ReactNode,
    bgColor?: string,
    textColor?: string
}) => {
    return (
        <div className={className}>
            <div className={'absolute flex h-4.5 items-center'}>
                <div className={`${bgColor} -skew-x-12 -left-1.5 absolute w-3 h-full rounded-sm`}></div>
                <div
                    className={`${bgColor} ${textColor} relative z-10 text-sm font-bold inline-block uppercase text-[12px]`}>{children}</div>
                <div className={`${bgColor} -skew-x-12 -right-1.5 absolute w-3 h-full rounded-sm`}></div>
            </div>
        </div>
    );
};

export default Badge;