export const dynamic = "force-dynamic"

import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

export default async function RedeemPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; confirm?: string }>
}) {
  const params = await searchParams
  const token = params.token
  const confirm = params.confirm === "true"

  if (!token) {
    return (
      <div>
        <h1>Invalid QR Code</h1>
        <p>No token provided.</p>
      </div>
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: userCoupon } = await supabase
    .from("user_coupons")
    .select("id, redeemed_at")
    .eq("qr_token", token)
    .single()

  if (!userCoupon) {
    return (
      <div>
        <h1>Invalid QR Code</h1>
        <p>This QR code is not recognized.</p>
      </div>
    )
  }

  if (userCoupon.redeemed_at) {
    return (
      <div>
        <h1>Already Redeemed</h1>
        <p>This coupon has already been used.</p>
      </div>
    )
  }

  // Confirmation screen (NO DB WRITE)
  if (!confirm) {
    return (
      <div style={{ maxWidth: 480 }}>
        <h1>Confirm Redemption</h1>

        <p style={{ marginTop: 16 }}>
          <strong>Are you sure you want to redeem this coupon?</strong>
        </p>

        <p style={{ marginTop: 12 }}>
          Once you redeem the coupon, it <strong>cannot be used again</strong>.
        </p>

        <p style={{ marginTop: 12, color: "#aaa" }}>
          This QR code should only be scanned by the business accepting the coupon.
        </p>

        <div style={{ marginTop: 24 }}>
          <Link
            href={`/redeem?token=${token}&confirm=true`}
            style={{
              display: "inline-block",
              padding: "12px 20px",
              background: "#16a34a",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
              marginRight: 12,
            }}
          >
            Confirm Redemption
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 20px",
              background: "#374151",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Cancel
          </Link>
        </div>
      </div>
    )
  }

  // Confirmed → redeem
  await supabase
    .from("user_coupons")
    .update({ redeemed_at: new Date().toISOString() })
    .eq("id", userCoupon.id)

  return (
    <div>
      <h1>✅ Coupon Redeemed</h1>
      <p>This coupon has been successfully redeemed.</p>
    </div>
  )
}
