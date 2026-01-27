export type ContentItem = {
  slug: string
  title: string
  description: string
  vimeoId: string
  thumbnail: string
  duration: string
}

export const contentItems: ContentItem[] = [
  {
    slug: "friday-night-hoops",
    title: "Friday Night Hoops – Episode 1",
    description: "Highlights and analysis from local Friday night basketball action.",
    vimeoId: "1158018243",
    thumbnail: "https://via.placeholder.com/640x360?text=Friday+Night+Hoops",
    duration: "12:47",
  },
  {
    slug: "county-championship-preview",
    title: "County Championship Preview",
    description: "Breaking down the biggest matchups heading into championship week.",
    vimeoId: "1158018243",
    thumbnail: "https://via.placeholder.com/640x360?text=Championship+Preview",
    duration: "8:21",
  },
]
