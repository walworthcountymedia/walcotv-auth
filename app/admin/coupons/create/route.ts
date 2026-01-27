import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const { business_name, offer, expires_at } = await req.json()

  if (!business_name || !offer || !expires_at) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  /**
   * Create coupon (ACTIVE immediately)
   * Assignment to users is handled by the DATABASE TRIGGER
   */
  const { error } = await supabase
    .from("coupons")
    .insert({
      business_name,
      offer,
      expires_at,
      active: true,
    })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
