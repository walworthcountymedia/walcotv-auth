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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 gap-4">
      <h1 className="text-4xl font-bold">
        Welcome to WalCoTV
      </h1>

      <p className="text-lg opacity-80">
        Your home for local content.
      </p>

      <p className="text-sm opacity-70">
        Logged in as {session.user.email}
      </p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  )
}
