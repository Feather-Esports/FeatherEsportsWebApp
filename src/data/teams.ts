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
        skillTier: "4.2K",
        players: [
          player("Kepler", "dz", "tank"),
          player("Yuri", "nl", "tank"),
          player("yiruzu", "de", "damage"),
          player("Swifty", "gb", "damage"),
          player("Orpheus", "de", "damage", false, true),
          player("Blaco", "dk", "support"),
          player("Whackey", "gb", "support"),
        ],
        staff: [
          staff("Kepler", "dz", "manager"),
          staff("yiruzu", "de", "manager"),
          staff("Blaco", "dk", "captain"),
          staff("Yuri", "nl", "captain"),
          staff("Aubstacle", "us", "headCoach"),
          staff("Orpheus", "de", "coach"),
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
