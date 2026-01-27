import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export default async function AdminAnalyticsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // 1️⃣ Total coupons
  const { count: totalCoupons } = await supabase
    .from("coupons")
    .select("*", { count: "exact", head: true })

  // 2️⃣ Total redemptions
  const { count: totalRedemptions } = await supabase
    .from("user_coupons")
    .select("*", { count: "exact", head: true })
    .not("redeemed_at", "is", null)

  // 3️⃣ Redemptions today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count: redemptionsToday } = await supabase
    .from("user_coupons")
    .select("*", { count: "exact", head: true })
    .gte("redeemed_at", today.toISOString())

  // 4️⃣ Coupon breakdown
  const { data: couponStats } = await supabase
    .from("coupons")
    .select(`
      id,
      business_name,
      offer,
      expires_at,
      active,
      user_coupons (
        redeemed_at
      )
    `)

  return (
    <div style={{ maxWidth: 1000 }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 24 }}>
        Redemption Analytics
      </h1>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
        <StatCard label="Total Coupons" value={totalCoupons ?? 0} />
        <StatCard label="Total Redemptions" value={totalRedemptions ?? 0} />
        <StatCard label="Redemptions Today" value={redemptionsToday ?? 0} />
      </div>

      {/* Coupon table */}
      <h2 style={{ marginBottom: 16 }}>Coupon Performance</h2>

      <div style={{ borderTop: "1px solid #333" }}>
        {couponStats?.map((coupon) => {
          const total = coupon.user_coupons?.length ?? 0
          const redeemed =
            coupon.user_coupons?.filter((uc) => uc.redeemed_at).length ?? 0

          return (
            <div
              key={coupon.id}
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #333",
              }}
            >
              <strong>{coupon.business_name}</strong> — {coupon.offer}
              <div style={{ fontSize: "0.9rem", color: "#aaa", marginTop: 4 }}>
                Redemptions: {redeemed} / {total} •{" "}
                {coupon.active ? "Active" : "Disabled"} • Expires{" "}
                {new Date(coupon.expires_at).toLocaleDateString()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 8,
        background: "#111",
        border: "1px solid #333",
      }}
    >
      <div style={{ fontSize: "0.85rem", color: "#aaa" }}>{label}</div>
      <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{value}</div>
    </div>
  )
}
