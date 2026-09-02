export type AccordionItem = {
  label: string
  detail: string
  color?: string
}

export type TeamCard = {
  name: string
  players: string[]
}

export type TeamRegion = {
  id: string
  label: string
  icon: string
  teams: TeamCard[]
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

const roster = (name: string): TeamCard => ({
  name,
  players: ["yiruzu", "yiruzu", "yiruzu", "yiruzu", "yiruzu"],
})

export const teamRegions: TeamRegion[] = [
  { id: "emea", label: "teams.regions.emea", icon: "pixel:globe-europe", teams: [roster("SkyFlock"), roster("Penguin"), roster("Swift"), roster("Nightwing")] },
  { id: "na", label: "teams.regions.na", icon: "pixel:globe-americas", teams: [roster("SkyFlock"), roster("Penguin")] },
  { id: "sa", label: "teams.regions.sa", icon: "pixel:globe-americas", teams: [roster("Swift"), roster("Nightwing")] },
  { id: "oce", label: "teams.regions.oce", icon: "pixel:globe", teams: [roster("Penguin"), roster("Nightwing")] },
]

export const faqs: AccordionItem[] = [
  { label: "faq.join.label", detail: "faq.join.detail" },
  { label: "faq.watch.label", detail: "faq.watch.detail" },
  { label: "faq.events.label", detail: "faq.events.detail" },
  { label: "faq.work.label", detail: "faq.work.detail" },
  { label: "faq.based.label", detail: "faq.based.detail" },
]

export const staff: StaffMember[] = [
  { name: "Blaco", color: "var(--color-lime)", icon: "pixel:user-solid", roles: ["staff", "founders"], subRoles: ["staff.subRoles.community"] },
  {
    name: "Kepler",
    color: "var(--color-violet)",
    icon: "pixel:users-solid",
    roles: ["administrators", "founders"],
    subRoles: ["staff.subRoles.networking", "staff.subRoles.team"],
  },
  { name: "Yiruzu", color: "var(--color-sky)", icon: "pixel:laptop-solid", roles: ["staff", "media", "founders"], subRoles: ["staff.subRoles.tech", "staff.subRoles.media"] },
]

export const socialLinks = [
  ["pixel:twitch", "Twitch"],
  ["pixel:youtube", "YouTube"],
  ["pixel:x", "X / Twitter"],
  ["pixel:tiktok", "TikTok"],
  ["pixel:instagram", "Instagram"],
] as const
