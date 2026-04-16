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
    <Link
      className={`inline-flex items-center transition-colors duration-200 ${
        isEnd
          ? "text-gray-900 font-semibold cursor-default"
          : "text-gray-500 hover:text-primary hover:underline"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Item;
