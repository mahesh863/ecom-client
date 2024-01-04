import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const privatePaths = ['/checkout', '/profile', '/order-success'];

  const isPrivatePath = privatePaths.indexOf(path) > -1;

  const token = request.cookies.get('auth')?.value || '';

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/cart',
    '/signin',
    '/signup',
    '/wishlist',
    '/checkout',
    '/profile',
    '/order-success',
    '/wishlist',
  ],
};
