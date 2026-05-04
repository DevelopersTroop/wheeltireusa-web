"use client";
import { useGetBlogDetailsQuery } from '@/redux/apis/blog';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { normalizeImageUrl } from '@/utils/url';
import { format } from 'date-fns';
import { CalendarDays, Clock3, UserCircle } from 'lucide-react';
import Image from "next/image";
import { ClientLoadingSkeleton } from "./_components/loading";
import { BlogPageSidebar } from "./_components/sidebar/sidebar";
import { SimilarPosts } from "./_components/similar-posts";
import { PrevNext } from "./prevNext";
import BlogBody from "./blog-body";

export const Client: React.FC<{ slug: string }> = ({ slug }) => {
  const { data, isLoading } = useGetBlogDetailsQuery(slug);

  return (
    <Container>
      <div className="grid grid-cols-12 gap-6 lg:gap-10 w-full py-6">
        {isLoading || !data?.post ? (
          <ClientLoadingSkeleton />
        ) : (
          <article className="col-span-12 lg:col-span-8 flex flex-col gap-y-5">
            {/* Breadcrumb */}
            <div className="flex w-full items-start overflow-x-auto">
              <Breadcrumb>
                <Item href={"/"}>Home</Item>
                <Item href={`/blog`}>Blog</Item>
                <Item isEnd href={`/blog/${slug}`}>
                  {data?.post?.categoryId?.title}
                </Item>
              </Breadcrumb>
            </div>

            {/* Hero Card */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm">
              {/* Cover image */}
              <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] relative bg-gray-100">
                <Image
                  fill
                  src={normalizeImageUrl(data.post.thumbnail)}
                  alt={data.post.title}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
              </div>

              {/* Title + Meta */}
              <div className="px-5 sm:px-8 pt-6 pb-2">
                {/* Category badge */}
                {data?.post?.categoryId?.title && (
                  <span className="inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                    {data.post.categoryId.title}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                  {data.post.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pb-5 border-b border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <UserCircle size={16} className="text-primary" />
                    <span className="font-medium text-gray-700">Wheel Tire USA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-primary" />
                    <span>{format(new Date(data.post.updatedAt), "MMMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock3 size={16} className="text-primary" />
                    <span>{format(new Date(data.post.updatedAt), "hh:mm aaa")}</span>
                  </div>
                </div>
              </div>

              {/* Blog Body */}
              <div className="px-5 sm:px-8 pb-8 pt-4">
                <BlogBody post={data?.post} />
              </div>
            </div>

            {/* Prev / Next */}
            <PrevNext slug={slug} />

            {/* Similar Posts */}
            <SimilarPosts slug={slug} />
          </article>
        )}

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4">
          <BlogPageSidebar
            relatedProducts={data?.post?.relatedProducts}
            isLoading={isLoading}
          />
        </aside>
      </div>
    </Container>
  );
};
