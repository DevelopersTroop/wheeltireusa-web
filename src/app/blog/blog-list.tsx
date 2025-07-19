'use client';
// import { useGetBlogsQuery } from "@/app/globalRedux/api/blog";
// import { truncWord } from "@/app/utils/string";
// import { normalizeImageUrl } from "@/app/utils/url";
// import { removeHtmlTags } from "@/lib/utils";
import { format } from 'date-fns';
import { ChevronRight, FileSearch2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BlogPagination } from './_components/pagination';
import { useGetBlogsQuery } from '@/redux/apis/blog';
import { normalizeImageUrl } from '@/utils/url';

export const BlogList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const { data, isLoading } = useGetBlogsQuery({
    size: 10,
    page: Number(page),
    sort: [{ whom: 'updatedAt', order: 'desc' }],
  });

  console.log('blog data ================= ', data);
  if (isLoading) {
    return (
      <div className="container my-12 grid gap-12">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div className="grid grid-cols-8 gap-4" key={i}>
              <div className="col-span-8 lg:col-span-2 bg-gray-100 animate-color-pulse rounded-[6px] p-4 h-[200px]">
                {/* Image skeleton */}
              </div>
              <div className="col-span-8 lg:col-span-6 flex flex-col gap-y-3">
                <div>
                  {/* Title skeleton */}
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-color-pulse mb-2"></div>
                  {/* Date skeleton */}
                  <div className="h-4 bg-gray-100 rounded w-1/4 animate-color-pulse"></div>
                </div>
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full animate-color-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-full animate-color-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-color-pulse"></div>
                </div>
                {/* Read more skeleton */}
                <div className="h-4 bg-gray-100 rounded w-24 animate-color-pulse mt-2"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  if (!data?.posts || data?.posts?.length === 0) {
    return (
      <div className="h-[30vh] w-full flex mt-8 justify-center items-center gap-2">
        <h2 className="text-3xl font-semibold">Oops! No Posts found</h2>
        <FileSearch2 size={34} className="animate-pulse" />
      </div>
    );
  }
  return (
    <div className="container my-12 grid gap-12">
      {data?.posts?.map((blog, i) => {
        // let description = blog.blocks.reduce((pre, next)=> {
        //   pre += next.value;
        //   return pre;
        // }, "")
        return (
          <div className="grid grid-cols-8 gap-4" key={i}>
            <Link
              className="col-span-8 lg:col-span-2"
              href={`/blog/${blog.slug}`}
            >
              <div className="bg-white shadow-lg rounded-[6px] p-4 h-[200px] relative">
                <Image
                  objectFit="cover"
                  fill
                  src={normalizeImageUrl(blog.thumbnail)}
                  alt={blog.title}
                />
              </div>
            </Link>
            <div className="col-span-8 lg:col-span-6 flex flex-col gap-y-3">
              <div>
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="font-bold text-xl">{blog.title}</h3>
                </Link>
                <p className="text-muted font-semibold">
                  {format(blog.createdAt, 'PP')}
                </p>
              </div>
              {/* <p className="text-muted">
                {truncWord(removeHtmlTags(description), 20)}
              </p> */}
              <Link
                className="inline-flex text-primary font-medium text-sm items-center gap-1"
                href={`/blog/${blog.slug}`}
              >
                <span>Read More</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        );
      })}
      <BlogPagination page={Number(page)} pages={data?.pages} />
    </div>
  );
};
