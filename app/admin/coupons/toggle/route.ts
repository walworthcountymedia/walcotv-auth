import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const body = await req.json()
  const { id, active } = body

  if (!id || typeof active !== "boolean") {
    return NextResponse.json(
      { error: "Missing or invalid parameters" },
      { status: 400 }
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from("coupons")
    .update({ active })
    .eq("id", id)
    .select("id")

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "No coupon updated" },
      { status: 404 }
    )
  }

  return NextResponse.json({ success: true })
}
