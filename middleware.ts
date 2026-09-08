import {NextResponse} from 'next/server'; import type {NextRequest} from 'next/server';
export function middleware(request:NextRequest){return NextResponse.next({request})}
export const config={matcher:['/admin/:path*','/seller/dashboard/:path*','/account/:path*']};
