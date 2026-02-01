// components/SkeletonCard.tsx
const SkeletonCard = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="bg-gray-300 w-full h-48 rounded-lg mb-3" />
      <div className="bg-gray-300 h-5 w-3/4 mx-auto rounded" />
    </div>
  );
};

export default SkeletonCard;
