import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  // Default response
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Add __path param if needed
  if (pathname.includes('dashboard')) {
    response.cookies.set('__path', pathname);
  }

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Cache-Control',
      'public, max-age=600, stale-while-revalidate=60'
    );
  }

  return response;
}
