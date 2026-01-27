"use client"

import { useState } from "react"
import { updateProfileAction } from "./profile-actions"

type Props = {
  email: string
  name: string
  avatarUrl: string
}

export default function ProfileForm({ email, name, avatarUrl }: Props) {
  const [displayName, setDisplayName] = useState(name)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const result = await updateProfileAction(displayName)

    setLoading(false)
    setMessage(result?.error ?? "Profile updated")
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <label>
        Display name
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 4,
            padding: 8,
          }}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 12,
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        {loading ? "Saving…" : "Save"}
      </button>

      {message && <p style={{ marginTop: 8 }}>{message}</p>}
    </form>
  )
}
