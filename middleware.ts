import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

/**
 * 🔧 TOGGLE THIS FLAG
 * true  = site is under construction
 * false = site is live
 */
const MAINTENANCE_MODE = true

export async function middleware(req: NextRequest) {
  let response = NextResponse.next()
  const { pathname } = req.nextUrl

  /**
   * 1️⃣ Create Supabase client (needed for both checks)
   */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options) {
          response.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  /**
   * 2️⃣ Get session (for admin + dashboard checks)
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  /**
   * 3️⃣ UNDER CONSTRUCTION MODE
   * Admins are allowed through
   */
  if (MAINTENANCE_MODE) {
    const allowlist = [
  "/under-construction",
  "/login",
  "/api",
  "/api/admin",
  "/_next",
  "/favicon.ico",
]


    const isAllowedPath = allowlist.some((path) =>
      pathname.startsWith(path)
    )

    let isAdmin = false

    if (session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      isAdmin = profile?.role === "admin"
    }

    // Non-admins get redirected
    if (!isAllowedPath && !isAdmin) {
      const url = req.nextUrl.clone()
      url.pathname = "/under-construction"
      return NextResponse.redirect(url)
    }
  }

  /**
   * 4️⃣ DASHBOARD AUTH (UNCHANGED)
   */
  const isDashboardRoute = pathname.startsWith("/dashboard")

  if (isDashboardRoute && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectedFrom", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: "/:path*",
}
