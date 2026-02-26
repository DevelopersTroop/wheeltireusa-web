
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
