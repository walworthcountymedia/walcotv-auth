import { redirect } from "next/navigation"
import { hasCouponBookAccess } from "../../lib/entitlements"

export default async function CheckoutSuccessPage() {
  // Try a few times to allow webhook to complete
  for (let i = 0; i < 5; i++) {
    const hasAccess = await hasCouponBookAccess()

    if (hasAccess) {
      redirect("/coupons")
    }

    // wait 1 second before trying again
    await new Promise((res) => setTimeout(res, 1000))
  }

  // If still not unlocked, send to coupons anyway (it may now work)
  redirect("/coupons")
}
