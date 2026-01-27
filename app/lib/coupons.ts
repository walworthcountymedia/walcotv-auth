export type Coupon = {
  id: string
  business: string
  offer: string
  expires: string
}

export const coupons: Coupon[] = [
  {
    id: "local-grill-10-off-50",
    business: "Local Grill",
    offer: "$10 off $50 purchase",
    expires: "December 31, 2026",
  },
  {
    id: "main-street-pub-app",
    business: "Main Street Pub",
    offer: "Free appetizer with entrée",
    expires: "December 31, 2026",
  },
  {
    id: "downtown-outfitters-20",
    business: "Downtown Outfitters",
    offer: "20% off one retail purchase",
    expires: "December 31, 2026",
  },
]
