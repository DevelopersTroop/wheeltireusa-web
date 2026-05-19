'use client';
import { format } from 'date-fns';
import { ArrowRight, FileSearch2, LayoutGrid, LayoutList, Rows3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { BlogPagination } from './_components/pagination';
import { useGetBlogsQuery } from '@/redux/apis/blog';
import { normalizeImageUrl } from '@/utils/url';
import { truncWord } from '@/utils/string';
import { removeHtmlTags } from '@/lib/utils';

type ViewMode = 'grid' | 'masonry' | 'list';

const ViewToggleButton = ({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={label}
    className={`p-2 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-primary text-white shadow-md shadow-primary/30'
        : 'text-gray-500 hover:text-primary hover:bg-primary/10'
    }`}
  >
    {icon}
  </button>
);

const BlogCardSkeleton = ({ view }: { view: ViewMode }) => {
  if (view === 'list') {
    return (
      <div className="flex gap-5 p-4 rounded-2xl border border-gray-100 bg-white animate-pulse">
        <div className="shrink-0 w-48 h-36 bg-gray-200 rounded-xl" />
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/4" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6" />
          </div>
          <div className="h-4 bg-gray-100 rounded w-24 mt-1" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white animate-pulse">
      <div className="h-48 bg-gray-200 w-full" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-24" />
      </div>
    </div>
  );
};

const GridCard = ({ blog, description }: { blog: any; description: string }) => (
  <Link href={`/blog/${blog.slug}`} className="group block">
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-52 w-full overflow-hidden bg-gray-100 shrink-0">
        <Image
          fill
          src={normalizeImageUrl(`${blog.thumbnail}`)}
          alt={blog.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">
            {format(blog.createdAt, 'MMM dd, yyyy')}
          </p>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {truncWord(removeHtmlTags(description), 20)}
        </p>
        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-auto group-hover:gap-3 transition-all duration-200">
          Read More <ArrowRight size={15} />
        </span>
      </div>
    </div>
  </Link>
);

const MasonryCard = ({ blog, description, index }: { blog: any; description: string; index: number }) => {
  const heights = ['h-44', 'h-56', 'h-48', 'h-52', 'h-44', 'h-60'];
  const imgHeight = heights[index % heights.length];
  return (
    <Link href={`/blog/${blog.slug}`} className="group block mb-5">
      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-0.5">
        <div className={`relative ${imgHeight} w-full overflow-hidden bg-gray-100`}>
          <Image
            fill
            src={normalizeImageUrl(`${blog.thumbnail}`)}
            alt={blog.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-white/80 font-medium uppercase tracking-wide">
              {format(blog.createdAt, 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-bold text-base text-gray-900 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {truncWord(removeHtmlTags(description), 15)}
          </p>
          <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs mt-1 group-hover:gap-2.5 transition-all duration-200">
            Read More <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
};

const ListCard = ({ blog, description }: { blog: any; description: string }) => (
  <Link href={`/blog/${blog.slug}`} className="group block">
    <div className="flex gap-5 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:shadow-gray-200/60 transition-all duration-300 hover:border-primary/20">
      <div className="relative shrink-0 w-44 h-36 rounded-xl overflow-hidden bg-gray-100">
        <Image
          fill
          src={normalizeImageUrl(`${blog.thumbnail}`)}
          alt={blog.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 font-medium uppercase tracking-wide">
            {format(blog.createdAt, 'MMM dd, yyyy')}
          </p>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {truncWord(removeHtmlTags(description), 25)}
        </p>
        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-200 mt-1">
          Read More <ArrowRight size={15} />
        </span>
      </div>
    </div>
  </Link>
);

export const BlogList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;

  // Persist view mode using localStorage with a default of 'grid'
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('blog-view-mode') as ViewMode) || 'grid';
    }
    return 'grid';
  });

  const changeView = (v: ViewMode) => {
    setView(v);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog-view-mode', v);
    }
  };

  const { data, isLoading } = useGetBlogsQuery({
    size: 10,
    page: Number(page),
    sort: [{ whom: 'updatedAt', order: 'desc' }],
  });

  // — View Toggle Bar —
  const viewToggle = (
    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-sm text-gray-400 font-medium">
          {data?.posts?.length
            ? `Showing ${data.posts.length} article${data.posts.length !== 1 ? 's' : ''}`
            : isLoading
            ? 'Loading articles...'
            : ''}
        </p>
      </div>
      <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl p-1">
        <ViewToggleButton
          active={view === 'grid'}
          onClick={() => changeView('grid')}
          label="Grid view"
          icon={<LayoutGrid size={18} />}
        />
        <ViewToggleButton
          active={view === 'masonry'}
          onClick={() => changeView('masonry')}
          label="Masonry view"
          icon={<Rows3 size={18} />}
        />
        <ViewToggleButton
          active={view === 'list'}
          onClick={() => changeView('list')}
          label="List view"
          icon={<LayoutList size={18} />}
        />
      </div>
    </div>
  );

  // — Loading State —
  if (isLoading) {
    return (
      <div className="my-10">
        {viewToggle}
        {view === 'list' ? (
          <div className="flex flex-col gap-4">
            {Array(4).fill(0).map((_, i) => <BlogCardSkeleton key={i} view="list" />)}
          </div>
        ) : (
          <div className={view === 'masonry' ? 'columns-1 sm:columns-2 lg:columns-3 gap-5' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {Array(6).fill(0).map((_, i) => <BlogCardSkeleton key={i} view={view} />)}
          </div>
        )}
      </div>
    );
  }

  // — Empty State —
  if (!data?.posts || data?.posts?.length === 0) {
    return (
      <div className="h-[40vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <FileSearch2 size={36} className="text-gray-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">No Posts Found</h2>
          <p className="text-gray-500 mt-1 text-sm">Check back soon for new articles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      {viewToggle}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.posts?.map((blog, i) => {
            const description = blog.blocks.reduce((pre, next) => pre + next.value, '');
            return <GridCard key={i} blog={blog} description={description} />;
          })}
        </div>
      )}

      {/* Masonry View */}
      {view === 'masonry' && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {data?.posts?.map((blog, i) => {
            const description = blog.blocks.reduce((pre, next) => pre + next.value, '');
            return <MasonryCard key={i} blog={blog} description={description} index={i} />;
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="flex flex-col gap-4">
          {data?.posts?.map((blog, i) => {
            const description = blog.blocks.reduce((pre, next) => pre + next.value, '');
            return <ListCard key={i} blog={blog} description={description} />;
          })}
        </div>
      )}

      <BlogPagination page={Number(page)} pages={data?.pages} />
    </div>
  );
};
