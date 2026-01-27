"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CouponBookRedirectGate() {
  const router = useRouter()

  useEffect(() => {
    const checkOwnership = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: ownedCoupon } = await supabase
        .from("user_coupons")
        .select("id")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle()

      if (ownedCoupon) {
        router.replace("/coupons")
      }
    }

    checkOwnership()
  }, [router])

  return null
}
