import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: coupon } = await supabase
    .from("user_coupons")
    .select("id, redeemed_at")
    .eq("qr_token", token)
    .single()

  if (!coupon) {
    return NextResponse.json({ error: "Invalid coupon" }, { status: 404 })
  }

  if (coupon.redeemed_at) {
    return NextResponse.json({ error: "Already redeemed" }, { status: 400 })
  }

  await supabase
    .from("user_coupons")
    .update({ redeemed_at: new Date().toISOString() })
    .eq("id", coupon.id)

  return NextResponse.redirect(
    new URL(`/redeem?token=${token}`, req.url)
  )
}
