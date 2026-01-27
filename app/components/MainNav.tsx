import Link from "next/link"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

export default async function MainNav() {
  const cookieStore = cookies()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const myCouponBookHref = user ? "/coupons" : "/coupon-book"

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="font-bold text-lg">
          WalCoTV
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/content">Content</Link>
          <Link href={myCouponBookHref}>My Coupon Book</Link>
        </div>

        <div className="ml-auto text-sm">
          {user ? <Link href="/logout">Logout</Link> : <Link href="/login">Login</Link>}
        </div>
      </div>
    </nav>
  )
}
