// import React from "react";

// const Container = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className={"max-w-[1450px] mx-auto w-full px-5 lg:px-16 py-2"}>
//       {children}
//     </div>
//   );
// };

// export default Container;

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={`max-w-[1350px] p-4 mx-auto py-10 ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Container;
