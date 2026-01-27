import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function generateQrToken() {
  return crypto.randomBytes(32).toString("hex")
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")
  const body = await req.text()

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id

    if (!userId) return NextResponse.json({ received: true })

    // Get Coupon Book product
    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("name", "WalCoTV Coupon Book")
      .eq("year", 2026)
      .single()

    if (!product) return NextResponse.json({ received: true })

    // Insert purchase
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: userId,
        product_id: product.id,
        stripe_session_id: session.id,
        expires_at: "2026-12-31",
      })
      .select()
      .single()

    if (purchaseError || !purchase) {
      console.error("Purchase insert failed", purchaseError)
      return NextResponse.json({ received: true })
    }

    // Fetch all active coupons
    const { data: coupons } = await supabase
      .from("coupons")
      .select("id")
      .eq("active", true)

    if (!coupons) return NextResponse.json({ received: true })

    // Create user_coupons
    const userCoupons = coupons.map((coupon) => ({
      user_id: userId,
      coupon_id: coupon.id,
      qr_token: generateQrToken(),
    }))

    const { error: userCouponsError } = await supabase
      .from("user_coupons")
      .insert(userCoupons)

    if (userCouponsError) {
      console.error("Failed to create user_coupons", userCouponsError)
    }
  }

  return NextResponse.json({ received: true })
}
