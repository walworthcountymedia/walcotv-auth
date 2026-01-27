"use client"

import { logoutAction } from "../logout/actions"

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          marginTop: "12px",
          borderRadius: "4px",
          border: "1px solid #444",
          background: "#111",
          color: "#fff",
        }}
      >
        Logout
      </button>
    </form>
  )
}
