import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/login'];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  if (!publicPages.includes(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
