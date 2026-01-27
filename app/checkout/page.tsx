import Stripe from "stripe"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * IMPORTANT:
 * Do NOT specify apiVersion.
 * Stripe will use the account’s configured API version automatically.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function CheckoutPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/coupon-book`,
    customer_email: session.user.email ?? undefined,
    metadata: {
      user_id: session.user.id,
      product: "coupon-book-2026",
    },
  })

  redirect(checkoutSession.url!)
}
