export default function UnderConstructionPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>
          WalCoTV is Under Construction 🚧
        </h1>

        <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: 24 }}>
          We’re building something great for the community.
          <br />
          Please check back soon.
        </p>

        <p style={{ fontSize: "0.9rem", color: "#777" }}>
          © {new Date().getFullYear()} WalCoTV
        </p>
      </div>
    </div>
  )
}
