export default function SizeListSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 overflow-hidden pb-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={`size-skeleton-${index}`}
          className="h-12 rounded-md border border-gray-200 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse"
        />
      ))}
    </div>
  );
}