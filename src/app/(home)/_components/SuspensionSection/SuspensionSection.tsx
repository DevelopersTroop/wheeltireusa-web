import React from "react";

const SuspensionSection: React.FC = () => {
  return (
    <div>
      <picture>
        <source
          srcSet="/images/shop-suspension-mobile.webp"
          media="(max-width: 1024px)"
        />
        <source
          srcSet="/images/suspension-banner-desktop.webp"
          media="(min-width: 1024px)"
        />
        <img
          src="/images/suspension-banner-desktop.webp"
          alt="Suspension Banner"
          className="w-full"
          width={1920}
          height={1080}
        />
      </picture>
    </div>
  );
};

export default SuspensionSection;
