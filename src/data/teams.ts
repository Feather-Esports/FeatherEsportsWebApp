export type TeamPlayer = {
  username: string
  country: string
  role: string
  isSub: boolean
  dnp: boolean
}

export type TeamStaff = {
  username: string
  country: string
  role: string
}

export type TeamResult = {
  opponent: string
  score: string
  outcome: "win" | "loss"
}

export type Team = {
  id: string
  name: string
  region: string
  color: string
  logo: string
  skillTier: string
  players: TeamPlayer[]
  staff: TeamStaff[]
}

export type TeamRegion = {
  id: string
  label: string
  icon: string
  color: string
  teams: Team[]
}

type TeamOptions = Omit<Team, "id" | "region"> & { id: string; region: string }

const team = (options: TeamOptions): Team => options
const player = (username: string, country: string, role: string, isSub = false, dnp = false): TeamPlayer => ({
  username,
  country,
  role,
  isSub,
  dnp,
})
const staff = (username: string, country: string, role: string): TeamStaff => ({
  username,
  country,
  role,
})

export const teamRegions: TeamRegion[] = [
  {
    id: "emea",
    label: "teams.regions.emea",
    icon: "pixel:globe-americas-solid",
    color: "#92E63E",
    teams: [
      team({
        id: "nightwing",
        name: "Nightwing",
        region: "EMEA",
        color: "#5C33EE",
        logo: "/images/teams/nightwing.png",
        skillTier: "4.2K",
        players: [
          player("Kepler", "DZ", "teams.roles.support"),
          player("Yuri", "NL", "teams.roles.tank"),
          player("yiruzu", "DE", "teams.roles.damage"),
          player("Swifty", "GB", "teams.roles.damage"),
          player("Orpheus", "DE", "teams.roles.damage", false, true),
          player("Blaco", "DK", "teams.roles.support"),
          player("Whackey", "GB", "teams.roles.support"),
        ],
        staff: [
          staff("Kepler", "DZ", "teams.staff.manager"),
          staff("yiruzu", "DE", "teams.staff.manager"),
          staff("Blaco", "DK", "teams.staff.captain"),
          staff("Yuri", "NL", "teams.staff.captain"),
          staff("Aubstacle", "US", "teams.staff.headCoach"),
          staff("Orpheus", "DE", "teams.staff.coach"),
        ],
      }),
    ],
  },
  {
    id: "na",
    label: "teams.regions.na",
    icon: "pixel:globe-americas-solid",
    color: "#E75555",
    teams: [],
  },
  {
    id: "sa",
    label: "teams.regions.sa",
    icon: "pixel:globe-americas-solid",
    color: "#F8B575",
    teams: [],
  },
  {
    id: "oce",
    label: "teams.regions.oce",
    icon: "pixel:globe-americas-solid",
    color: "#50ACF3",
    teams: [],
  },
]
