export const BlogPageSidebarSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-y-1">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
                    <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
};
