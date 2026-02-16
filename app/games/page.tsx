export default function GamesPage() {
  return (
    <div
      style={{
        padding: "60px 20px",
        textAlign: "center",
        minHeight: "60vh",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
        WalCoTV Games
      </h1>

      <p style={{ opacity: 0.8, marginBottom: "40px" }}>
        Interactive games built for our local community.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/games/escape-room"
          style={{
            padding: "20px 30px",
            borderRadius: "8px",
            background: "#111",
            border: "1px solid #333",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          🕵️ Online Escape Room
        </a>
      </div>
    </div>
  )
}
