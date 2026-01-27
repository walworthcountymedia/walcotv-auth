"use client"

import { useParams } from "next/navigation"
import { contentItems } from "../../lib/content"

export default function ContentDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const item = contentItems.find((c) => c.slug === slug)

  if (!item) {
    return (
      <div>
        <h1>Video not found</h1>
        <p>This content does not exist.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{item.title}</h1>

      <p style={{ marginBottom: 20 }}>
        {item.description}
      </p>

      {/* Vimeo Embed */}
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={`https://player.vimeo.com/video/${item.vimeoId}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
