// import React from 'react';

// const Breadcrumb = ({children}: {children: React.ReactNode}) => {
//     return (
//         <ol className="flex px-2 items-center whitespace-nowrap flex-wrap gap-x-9 gap-y-1.5">
//             {children}
//         </ol>
//     );
// };

// export default Breadcrumb;

import React from "react";

const Breadcrumb = ({ children }: { children: React.ReactNode }) => {
  return (
    <ol className="flex items-center whitespace-nowrap flex-wrap gap-x-1 gap-y-1.5">
      {children}
    </ol>
  );
};

export default Breadcrumb;
