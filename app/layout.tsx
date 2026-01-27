export const dynamic = "force-dynamic"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Header from "./components/header"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  let profile: {
    name: string | null
    role: string | null
    avatar_url: string | null
  } | null = null

  if (session) {
    const { data } = await supabase
      .from("profiles")
      .select("name, role, avatar_url")
      .eq("id", session.user.id)
      .single()

    profile = data
  }

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#000",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <Header
          email={session?.user.email}
          name={profile?.name ?? undefined}
          role={profile?.role ?? undefined}
        />
        <main style={{ padding: 20 }}>{children}</main>
      </body>
    </html>
  )
}
