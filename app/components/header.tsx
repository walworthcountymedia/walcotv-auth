import Link from "next/link"
import LogoutButton from "../dashboard/logout-button"

type HeaderProps = {
  email?: string
  name?: string
  role?: string
}

export default function Header({ email, name, role }: HeaderProps) {
  const isAdmin = role === "admin"

  // 🔒 Public coupon visibility flag
  const couponsEnabled =
    process.env.NEXT_PUBLIC_COUPONS_PUBLIC_ENABLED === "true"

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
  }

  return (
    <header
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#000",
        color: "#fff",
      }}
    >
      {/* LEFT SIDE: Brand + primary nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/" style={{ ...linkStyle, fontWeight: "bold" }}>
          WalCoTV
        </Link>

        <Link href="/content" style={linkStyle}>
          Content
        </Link>

        {/* 🆕 Games Tab */}
        <Link href="/games" style={linkStyle}>
          Games
        </Link>

        {/* 🔒 Coupon Book hidden unless explicitly enabled */}
        {couponsEnabled && (
          <Link href="/coupon-book" style={linkStyle}>
            Coupon Book
          </Link>
        )}

        {isAdmin && (
          <>
            <Link href="/admin/coupons" style={linkStyle}>
              Admin
            </Link>

            <Link href="/admin/analytics" style={linkStyle}>
              Analytics
            </Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE: Auth controls */}
      {email ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/profile"
            style={{
              fontSize: "14px",
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {name || email}
          </Link>

          {isAdmin && (
            <span
              style={{
                fontSize: "12px",
                padding: "2px 6px",
                borderRadius: "4px",
                background: "#333",
                border: "1px solid #555",
              }}
            >
              Admin
            </span>
          )}

          <LogoutButton />
        </div>
      ) : (
        <Link href="/login" style={linkStyle}>
          Login
        </Link>
      )}
    </header>
  )
}
