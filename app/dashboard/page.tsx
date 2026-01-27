import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import LogoutButton from "./logout-button"

export default async function DashboardPage() {
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

  if (!session) {
    return <p>Not logged in</p>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Logged in as: {session.user.email}</p>

      <LogoutButton />
    </div>
  )
}
