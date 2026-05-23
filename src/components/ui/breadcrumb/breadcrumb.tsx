import React from "react";

const Breadcrumb = ({ children }: { children: React.ReactNode }) => {
  const items = React.Children.toArray(children);

  return (
    <ol className="flex items-center whitespace-nowrap flex-wrap text-sm">
      {items.map((child, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
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
          </React.Fragment>
        );
      })}
    </ol>
  );
};

export default Breadcrumb;