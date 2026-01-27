export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ padding: 20 }}>
      {children}
    </div>
  )
}
