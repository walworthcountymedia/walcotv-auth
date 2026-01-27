import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import ProfileForm from "./profile-form"

export default async function ProfilePage() {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, avatar_url")
    .eq("id", session.user.id)
    .single()

  return (
    <div>
      <h1>Profile</h1>

      <ProfileForm
        email={session.user.email ?? ""}
        name={profile?.name ?? ""}
        avatarUrl={profile?.avatar_url ?? ""}
      />
    </div>
  )
}
