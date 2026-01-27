"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { loginAction } from "./actions"

export default function LoginClient() {
  const searchParams = useSearchParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const redirectedFrom = searchParams.get("redirectedFrom") || undefined
    const result = await loginAction(email, password, redirectedFrom)

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* 👇 NEW */}
      <p style={{ marginTop: 16 }}>
        New here?{" "}
        <Link href="/register" style={{ textDecoration: "underline" }}>
          Create an account
        </Link>
      </p>
    </main>
  )
}
