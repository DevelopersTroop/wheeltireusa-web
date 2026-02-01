// import Link from 'next/link';
// import React from 'react';

// const Item = ({href, isEnd = false, children}: {href: string, isEnd?: boolean, children: React.ReactNode}) => {
//     return (
//         <li className="inline-flex items-center" >
//             <Link className="flex relative items-center bg-gray-200 px-1 py-0.5 text-sm text-btext font-medium hover:text-primary focus:outline-none focus:text-primary"
//                href={href}>
//                 <div className='absolute h-full w-5 bg-gray-200 -left-4 skew-x-[20deg] rounded-l'></div>
//                 {children}
//                 <div className='absolute h-full w-5 bg-gray-200 -right-4 skew-x-[20deg] rounded-r'></div>
//             </Link>
//         </li>
//     );
// };

// export default Item;

import React from "react";
import Link from "next/link";

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
        className={`group relative px-4 py-1 text-sm ${
          isEnd ? "text-gray-800 font-medium" : "text-gray-500"
        } font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900`}
        href={href}
      >
        <div
          className="absolute inset-0 bg-[#E5E7EB]"
          style={{
            clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </Link>
    </li>
  );
};

export default Item;
