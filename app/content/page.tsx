"use client"

import Link from "next/link"
import Image from "next/image"
import { contentItems } from "../lib/content"

export default function ContentPage() {
  return (
    <div>
      <h1>WalCoTV Content</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {contentItems.map((item) => (
          <Link
            key={item.slug}
            href={`/content/${item.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #333",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#111",
              cursor: "pointer",
            }}
          >
            {/* Thumbnail wrapper */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="content-thumbnail"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
              />

              {/* Hover overlay */}
              <div
                className="content-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "14px solid white",
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      marginLeft: 4,
                    }}
                  />
                </div>
              </div>

              {/* Duration */}
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.75)",
                  padding: "2px 6px",
                  fontSize: "12px",
                  borderRadius: "4px",
                }}
              >
                {item.duration}
              </div>
            </div>

            <div style={{ padding: "12px" }}>
              <h3 style={{ margin: "0 0 8px 0" }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#bbb" }}>
                {item.description}
              </p>
            </div>

            {/* Hover CSS */}
            <style jsx>{`
              a:hover .content-thumbnail {
                transform: scale(1.05);
              }

              a:hover .content-overlay {
                opacity: 1;
              }
            `}</style>
          </Link>
        ))}
      </div>
    </div>
  )
}
