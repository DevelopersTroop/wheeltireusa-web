import { useGetBlogsQuery } from "@/redux/apis/blog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export const PrevNext: React.FC<{ slug: string }> = ({ slug }) => {
    const { data } = useGetBlogsQuery({ size: 10, page: 1, sort: [{ "whom": "updatedAt", "order": "desc" }] })

    const prevNextBlog = useMemo(() => {
        if (data?.posts) {
            const index = data.posts.findIndex((blog) => blog.slug === slug)
            return {
                prev: data.posts[index - 1],
                next: data.posts[index + 1]
            }
        }
    }, [slug, data?.posts])

    if (!prevNextBlog?.prev && !prevNextBlog?.next) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {/* Prev */}
            <div>
                {prevNextBlog?.prev ? (
                    <Link href={`/blog/${prevNextBlog.prev.slug}`} className="group block h-full">
                        <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-md transition-all duration-200 h-full">
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-primary/10 transition-colors duration-200 shrink-0">
                                <ChevronLeft size={20} className="text-gray-500 group-hover:text-primary transition-colors duration-200" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Previous</p>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                                    {prevNextBlog.prev.title}
                                </p>
                            </div>
                        </div>
                    </Link>
                ) : <div />}
            </div>

            {/* Next */}
            <div>
                {prevNextBlog?.next ? (
                    <Link href={`/blog/${prevNextBlog.next.slug}`} className="group block h-full">
                        <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-md transition-all duration-200 h-full justify-end text-right">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Next</p>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                                    {prevNextBlog.next.title}
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-primary/10 transition-colors duration-200 shrink-0">
                                <ChevronRight size={20} className="text-gray-500 group-hover:text-primary transition-colors duration-200" />
                            </div>
                        </div>
                    </Link>
                ) : <div />}
            </div>
        </div>
    )
}