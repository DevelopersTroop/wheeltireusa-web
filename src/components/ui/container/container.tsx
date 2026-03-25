
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={`w-full max-w-[1350px] mx-auto ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Container;
