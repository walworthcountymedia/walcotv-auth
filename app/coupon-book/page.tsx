import CouponBookContent from "./CouponBookContent"
import CouponBookRedirectGate from "./CouponBookRedirectGate"

export default function CouponBookPage() {
  return (
    <>
      {/* Client-side ownership redirect */}
      <CouponBookRedirectGate />

      {/* Original sales page (unchanged) */}
      <CouponBookContent />
    </>
  )
}
