import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function hasCouponBookAccess() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return false

  const { data } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", session.user.id)
    .gte("expires_at", new Date().toISOString())
    .limit(1)

  return !!data && data.length > 0
}
