"use client"

import { useEffect, useState } from "react"

type Coupon = {
  id: string
  business_name: string
  offer: string
  expires_at: string
  active: boolean
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // New coupon form state
  const [businessName, setBusinessName] = useState("")
  const [offer, setOffer] = useState("")
  const [expiresAt, setExpiresAt] = useState("")

  async function loadCoupons() {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/admin/coupons")
      if (!res.ok) throw new Error("Failed to load coupons")

      const data = await res.json()
      setCoupons(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load coupons. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCoupons()
  }, [])

  async function createCoupon(e: React.FormEvent) {
    e.preventDefault()

    if (!businessName || !offer || !expiresAt) return

    await fetch("/admin/coupons/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_name: businessName,
        offer,
        expires_at: expiresAt,
      }),
    })

    setBusinessName("")
    setOffer("")
    setExpiresAt("")
    loadCoupons()
  }

  async function toggleCoupon(id: string, active: boolean) {
    await fetch("/admin/coupons/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    })

    loadCoupons()
  }

  async function deleteCoupon(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this coupon?\n\nThis cannot be undone."
    )
    if (!confirmed) return

    await fetch("/admin/coupons/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ couponId: id }),
    })

    loadCoupons()
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Admin – Coupons</h1>

      {/* CREATE COUPON */}
      <form
        onSubmit={createCoupon}
        style={{
          marginBottom: 32,
          padding: 20,
          border: "1px solid #333",
          borderRadius: 8,
        }}
      >
        <h2>Create New Coupon</h2>

        <input
          placeholder="Business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <input
          placeholder="Offer (e.g. $10 off $50)"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <label style={{ display: "block", marginBottom: 4, color: "#aaa" }}>
  Expiration date (coupon will no longer be valid after this date)
</label>

<input
  type="date"
  value={expiresAt}
  onChange={(e) => setExpiresAt(e.target.value)}
  style={{ marginBottom: 12 }}
/>


        <button type="submit">Create Coupon</button>
      </form>

      {/* ERROR */}
      {error && <p style={{ color: "#f87171" }}>{error}</p>}

      {/* LIST */}
      {loading && <p>Loading coupons…</p>}

      {!loading &&
        coupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: "1px solid #333",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{coupon.business_name}</strong> — {coupon.offer}
              <div style={{ fontSize: "0.9rem", color: "#aaa" }}>
                Expires: {coupon.expires_at}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#aaa" }}>
                Status: {coupon.active ? "Active" : "Disabled"}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {coupon.active ? (
                <button onClick={() => toggleCoupon(coupon.id, false)}>
                  Disable
                </button>
              ) : (
                <button onClick={() => toggleCoupon(coupon.id, true)}>
                  Enable
                </button>
              )}

              <button
                onClick={() => deleteCoupon(coupon.id)}
                style={{
                  background: "#7f1d1d",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
