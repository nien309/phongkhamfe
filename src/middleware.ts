// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Định nghĩa các route cần bảo vệ
const protectedRoutes = ['/admin']
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Giả sử cookie "token" là dấu hiệu đã đăng nhập
  const token = req.cookies.get('token')?.value

  if (isProtected && !token) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Chạy middleware cho các route cần thiết
export const config = {
  matcher: ['/admin'],
}
