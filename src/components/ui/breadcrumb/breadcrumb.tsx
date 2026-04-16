import React from "react";

const Breadcrumb = ({ children }: { children: React.ReactNode }) => {
  return (
    <ol className="flex items-center whitespace-nowrap flex-wrap text-sm">
      {React.Children.map(children, (child, index) => {
        const childArray = React.Children.toArray(children);
        const isLast = index === childArray.length - 1;
        return (
          <li className="flex items-center">
            {child}
            {!isLast && (
              <svg
                className="mx-2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Breadcrumb;
