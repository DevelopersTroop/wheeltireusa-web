const StaticImage = ({ src, alt = "", className, ...props }: any) => {
  return (
    <img
      src={`/${src}`}
      alt={alt}
      className={className}
      {...props}
      loading="lazy"
      fetchPriority="low"
    />
  );
};

export default StaticImage;
