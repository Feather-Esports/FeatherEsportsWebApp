export type FAQItem = {
  label: string
  detail: string
  color?: string
}

export type StaffMember = {
  name: string
  color: string
  icon: string
  roles: string[]
  subRoles: string[]
}

export const staffRoles = [
  { id: "founders", label: "staff.roles.founders" },
  { id: "administrators", label: "staff.roles.administrators" },
  { id: "moderators", label: "staff.roles.moderators" },
  { id: "staff", label: "staff.roles.staff" },
  { id: "media", label: "staff.roles.media" },
]

export const faqs: FAQItem[] = [
  { label: "faq.1.label", detail: "faq.1.detail" },
  { label: "faq.2.label", detail: "faq.2.detail" },
  { label: "faq.3.label", detail: "faq.3.detail" },
  { label: "faq.4.label", detail: "faq.4.detail" },
  { label: "faq.5.label", detail: "faq.5.detail" },
  { label: "faq.6.label", detail: "faq.6.detail" },
  { label: "faq.7.label", detail: "faq.7.detail" },
]

export const staff: StaffMember[] = [
  {
    name: "Kepler",
    color: "var(--color-bg)",
    icon: "pixel:users-solid",
    roles: ["administrators", "founders"],
    subRoles: ["staff.subRoles.networking", "staff.subRoles.team"],
  },
  { name: "Yiruzu", color: "var(--color-bg)", icon: "pixel:laptop-solid", roles: ["staff", "media", "founders"], subRoles: ["staff.subRoles.tech", "staff.subRoles.media"] },
  { name: "Blaco", color: "var(--color-bg)", icon: "pixel:user-solid", roles: ["staff", "founders"], subRoles: ["staff.subRoles.community"] },
]

export const socialLinks = [
  { icon: "pixel:twitch", label: "Twitch", href: "https://www.twitch.tv/fthresports" },
  { icon: "pixel:youtube", label: "YouTube", href: "https://www.youtube.com/@FeatherEsports" },
  { icon: "pixel:x", label: "X/Twitter", href: "https://x.com/FeatherEsports" },
  { icon: "pixel:tiktok", label: "TikTok", href: "https://www.tiktok.com/@featheresports" },
  { icon: "pixel:instagram", label: "Instagram", href: "https://www.instagram.com/fthr_esports" },
] as const

export const discordLink = {
  icon: "pixel:discord",
  href: "https://discord.gg/uNJQD4j75N",
} as const
