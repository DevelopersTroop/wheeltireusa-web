import { NextResponse } from "next/server";

export default function middleware(request: Request) {
  const response = NextResponse.next();
  if (process.env.NODE_ENV !== "development") {
    response.headers.set(
      "Cache-Control",
      "public, max-age=600, stale-while-revalidate=60"
    );
  }
  return response;
}
