"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Coupon = {
  id: string
  business_name: string
  offer: string
  expires_at: string | null
  active: boolean
  qr_token: string
  redeemed_at: string | null
}

export default function CouponsPage() {
  const [loading, setLoading] = useState(true)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [openCouponId, setOpenCouponId] = useState<string | null>(null)

  useEffect(() => {
    const loadCoupons = async () => {
      // 1️⃣ Fetch user entitlements
      const { data: userCoupons } = await supabase
        .from("user_coupons")
        .select("coupon_id, qr_token, redeemed_at")

      if (!userCoupons || userCoupons.length === 0) {
        setCoupons([])
        setLoading(false)
        return
      }

      const tokenMap = new Map(
        userCoupons.map((uc) => [
          uc.coupon_id,
          { qr_token: uc.qr_token, redeemed_at: uc.redeemed_at },
        ])
      )

      const couponIds = userCoupons.map((uc) => uc.coupon_id)

      // 2️⃣ Fetch coupon details
      const { data: couponRows } = await supabase
        .from("coupons")
        .select("id, business_name, offer, expires_at, active")
        .in("id", couponIds)
        .eq("active", true)

      const merged: Coupon[] =
        couponRows?.map((c) => ({
          ...c,
          qr_token: tokenMap.get(c.id)!.qr_token,
          redeemed_at: tokenMap.get(c.id)!.redeemed_at,
        })) ?? []

      setCoupons(merged)
      setLoading(false)
    }

    loadCoupons()
  }, [])

  if (loading) {
    return <p>Loading your coupon book…</p>
  }

  return (
    <div>
      <h1>Your WalCoTV Coupon Book</h1>

      {coupons.map((c) => {
        const isRedeemed = Boolean(c.redeemed_at)
        const redeemUrl = `${window.location.origin}/redeem?token=${c.qr_token}`

        return (
          <div
            key={c.id}
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 8,
              background: "#111",
              opacity: isRedeemed ? 0.6 : 1,
            }}
          >
            <h2>{c.business_name}</h2>
            <p>{c.offer}</p>

            {c.expires_at && (
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                Expires: {new Date(c.expires_at).toLocaleDateString()}
              </p>
            )}

            {isRedeemed ? (
              <p style={{ color: "#6ee7b7", marginTop: 12 }}>
                ✅ Redeemed
              </p>
            ) : (
              <>
                <button
                  onClick={() =>
                    setOpenCouponId(openCouponId === c.id ? null : c.id)
                  }
                  style={{ marginTop: 12 }}
                >
                  {openCouponId === c.id
                    ? "Hide QR Code"
                    : "Redeem coupon"}
                </button>

                {openCouponId === c.id && (
                  <div style={{ marginTop: 12 }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                        redeemUrl
                      )}`}
                      alt="Coupon QR Code"
                    />
                    <p style={{ fontSize: "0.8rem", color: "#888" }}>
                      Present this QR code to the business to redeem
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
