import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const { couponId } = await req.json()

  if (!couponId) {
    return NextResponse.json(
      { error: "Missing couponId" },
      { status: 400 }
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // 1️⃣ Delete all user assignments for this coupon
  const { error: userCouponError } = await supabase
    .from("user_coupons")
    .delete()
    .eq("coupon_id", couponId)

  if (userCouponError) {
    return NextResponse.json(
      { error: userCouponError.message },
      { status: 500 }
    )
  }

  // 2️⃣ Delete the coupon itself
  const { error: couponError } = await supabase
    .from("coupons")
    .delete()
    .eq("id", couponId)

  if (couponError) {
    return NextResponse.json(
      { error: couponError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
