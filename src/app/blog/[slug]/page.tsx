import { generateBlogPostMetadata } from "@/utils/metadata";
import { Metadata } from "next";
import { Client } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateBlogPostMetadata(slug);
}
export default async function SinglePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    return (
        <Client slug={resolvedParams.slug} />
    )
}