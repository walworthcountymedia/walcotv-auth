import Link from "next/link"

export default function CouponBookContent() {
  return (
    <div style={{ maxWidth: 800 }}>
      {/* Hero */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 12 }}>
          WalCoTV Coupon Book – 2026
        </h1>

        <p style={{ fontSize: "1.2rem", color: "#bbb" }}>
          One purchase. Local savings. Support local businesses and local media.
        </p>

        {/* Buy Button */}
        <Link
          href="/checkout"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "12px 20px",
            fontSize: "1rem",
            borderRadius: 6,
            background: "#ffffff",
            color: "#000000",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Buy Coupon Book – $50
        </Link>

        {/* View Coupons Button (replaces text link) */}
        <div style={{ marginTop: 12 }}>
          <Link
            href="/coupons"
            prefetch={false}
            style={{
              display: "inline-block",
              padding: "8px 14px",
              fontSize: "0.95rem",
              borderRadius: 6,
              background: "#1f2937", // dark gray
              color: "#ffffff",
              textDecoration: "none",
              border: "1px solid #374151",
            }}
          >
            View Your Coupons
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section style={{ marginBottom: 40 }}>
        <h2>How it works</h2>

        <ol style={{ marginTop: 16, color: "#ddd" }}>
          <li>Purchase the WalCoTV Coupon Book</li>
          <li>Get access to exclusive local coupons</li>
          <li>Present your QR code at participating businesses</li>
          <li>Redeem discounts and save locally</li>
        </ol>
      </section>

      {/* Example coupons */}
      <section style={{ marginBottom: 40 }}>
        <h2>Example coupons</h2>

        <ul style={{ marginTop: 16, color: "#ddd" }}>
          <li>$10 off $50 at Local Grill</li>
          <li>Free appetizer with entrée at Main Street Pub</li>
          <li>20% off retail purchase at Downtown Outfitters</li>
          <li>Buy one round, get one free at County Golf Club</li>
        </ul>

        <p style={{ marginTop: 12, fontSize: "0.9rem", color: "#888" }}>
          *Participating businesses and offers will be finalized before launch.
        </p>
      </section>

      {/* Why it matters */}
      <section style={{ marginBottom: 40 }}>
        <h2>Why the WalCoTV Coupon Book?</h2>

        <p style={{ color: "#ddd", marginTop: 12 }}>
          This coupon book is about more than saving money. Every purchase helps
          support local businesses and allows WalCoTV to continue producing free,
          local video content for the community.
        </p>
      </section>
    </div>
  )
}
