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

export type FAQItem = {
  label: string
  detail: string
  color?: string
}
export const faqs: FAQItem[] = [
  { label: "faq.1.label", detail: "faq.1.detail" },
  { label: "faq.2.label", detail: "faq.2.detail" },
  { label: "faq.3.label", detail: "faq.3.detail" },
  { label: "faq.4.label", detail: "faq.4.detail" },
  { label: "faq.5.label", detail: "faq.5.detail" },
  { label: "faq.6.label", detail: "faq.6.detail" },
  { label: "faq.7.label", detail: "faq.7.detail" },
]

export type Partner = {
  id: string
  label: string
  description: string
  code?: string
  link: string
}
export const partners: Partner[] = [
  {
    id: "faceit",
    label: "FACEIT",
    description: "Ready to level up your competitive experience? Sign up for FREE and save 20% off your FACEIT League Pass by using our exclusive link or discount code.",
    code: "FEATHERESPORTS",
    link: "https://fce.gg/FL-FEATHERESPORTS",
  },
  {
    id: "cta",
    label: "BECOME A PARTNER",
    description: "Interested in partnering with us? Join our Discord and open a Partnership Ticket, or reach out to us via email at fthr.esports@gmail.com.",
    code: "fthr.esports@gmail.com",
    link: "mailto:fthr.esports@gmail.com",
  },
]

export type StaffMember = {
  id: string
  name: string
  color: string
  roles: string[]
  subRoles?: string[]
}
export const staffRoles = [
  { id: "founders", label: "staff.roles.founders" },
  { id: "administrators", label: "staff.roles.administrators" },
  { id: "moderators", label: "staff.roles.moderators" },
  { id: "staff", label: "staff.roles.staff" },
  { id: "media", label: "staff.roles.media" },
]
export const staffSubRoles = [
  { id: "networking", label: "staff.subRoles.networking" },
  { id: "community", label: "staff.subRoles.community" },
  { id: "team", label: "staff.subRoles.team" },
  { id: "hr", label: "staff.subRoles.hr" },
  { id: "tech", label: "staff.subRoles.tech" },
  { id: "media", label: "staff.subRoles.media" },
]
export const staff: StaffMember[] = [
  { id: "kepler", name: "Kepler", color: "#221d75", roles: ["founders"], subRoles: ["networking", "team"] },
  { id: "yiruzu", name: "yiruzu", color: "#0288df", roles: ["founders"], subRoles: ["networking", "tech", "media"] },
  { id: "yuri", name: "Yuri", color: "#7252b3", roles: ["founders"], subRoles: ["tech", "media"] },
  { id: "blaco", name: "Blaco", color: "#2ba90a", roles: ["founders"], subRoles: ["community"] },
  { id: "luna", name: "Luna", color: "#ff0100", roles: ["founders"], subRoles: ["hr"] },
  { id: "azrael", name: "Azrael", color: "#dec66a", roles: ["staff"], subRoles: ["team"] },
  { id: "genesis", name: "Genesis", color: "#03263f", roles: ["staff"], subRoles: ["team"] },
  { id: "sid", name: "Sid", color: "#ed7819", roles: ["staff"] },
  { id: "callson", name: "Callson", color: "#16171b", roles: ["media"], subRoles: ["media"] },
  { id: "rain", name: "Rain", color: "#94cdde", roles: ["media"], subRoles: ["media"] },
]
