import { useGetBlogsQuery } from "@/redux/apis/blog";
import { truncWord } from "@/utils/string";
import { normalizeImageUrl } from "@/utils/url";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SimilaPostsPagination } from "./similar-posts-pagination";

export const SimilarPosts: React.FC<{ slug: string }> = ({ slug }) => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetBlogsQuery({
    size: 3,
    page,
    sort: [{ whom: "updatedAt", order: "asc" }],
  });

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Similar Posts</h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Loading skeleton */}
      {(isLoading || !data?.posts || data?.posts?.length === 0) ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-2xl overflow-hidden border border-gray-100 bg-white animate-pulse">
              <div className="h-[180px] bg-gray-200 w-full" />
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data?.posts
              ?.filter((blog) => blog.slug !== slug)
              ?.map((blog, i) => (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={i}
                  className="group block"
                >
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
                    <div className="h-[160px] relative w-full overflow-hidden bg-gray-100">
                      <Image
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        src={normalizeImageUrl(blog.thumbnail)}
                        alt={blog.title}
                      />
                    </div>
                    <div className="px-4 py-3 flex flex-col gap-2 flex-1">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                        {truncWord(blog.title, 5)}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs mt-auto group-hover:gap-2 transition-all duration-200">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {data?.pages && data.pages > 1 ? (
            <SimilaPostsPagination
              pages={data?.pages}
              page={page}
              setPage={setPage}
            />
          ) : null}
        </>
      )}
    </div>
  );
};
