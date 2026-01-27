import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TestPage() {
  const { data } = await supabase.auth.getSession()

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}
