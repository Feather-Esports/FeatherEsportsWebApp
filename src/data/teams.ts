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
  platform: "pc" | "console" | "mixed"
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
        id: "skyflock",
        name: "SkyFlock",
        region: "EMEA",
        color: "#FFFFFF",
        platform: "console",
        skillTier: "Open",
        players: [
          player("Galaxy", "ru", "tank"),
          player("iceliq", "xx", "damage"),
          player("indra", "xx", "damage"),
          player("IZUYA", "xx", "support"),
          player("Arik", "xx", "support"),
        ],
        staff: [staff("Sid", "gb", "manager"), staff("Galaxy", "ru", "manager")],
      }),
      team({
        id: "penguin",
        name: "Penguin",
        region: "EMEA",
        color: "#77CFE7",
        platform: "pc",
        skillTier: "Open",
        players: [
          player("Divine", "us", "tank"),
          player("Rose", "nl", "tank"),
          player("hori", "gb", "damage"),
          player("Prosper", "gb", "damage"),
          player("Octo", "de", "support"),
          player("fifi", "pl", "support"),
        ],
        staff: [staff("Prosper", "gb", "manager"), staff("hori", "gb", "captain"), staff("C40re0", "gb", "captain"), staff("hambal", "xx", "coach")],
      }),
      team({
        id: "swift",
        name: "Swift",
        region: "EMEA",
        color: "#D92A2A",
        platform: "pc",
        skillTier: "Open",
        players: [player("Mojo", "gb", "tank"), player("jop", "gb", "damage"), player("Snow", "es", "damage"), player("Luna", "de", "support"), player("dididoo", "de", "support")],
        staff: [
          staff("Kepler", "dz", "manager"),
          staff("Hurdle", "xx", "manager"),
          staff("Luna", "de", "captain"),
          staff("Aubstacle", "us", "headCoach"),
          staff("Lampy", "dk", "coach"),
        ],
      }),
      team({
        id: "nightwing",
        name: "Nightwing",
        region: "EMEA",
        color: "#5C33EE",
        platform: "pc",
        skillTier: "4.2K",
        players: [
          player("Kepler", "dz", "tank"),
          player("Yuri", "nl", "tank"),
          player("yiruzu", "de", "damage"),
          player("Swifty", "gb", "damage"),
          player("Orpheus", "de", "damage", false, true),
          player("Blaco", "dk", "support"),
          player("Sid", "gb", "support"),
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
      team({
        id: "nightjar",
        name: "Satanic Nightjar",
        region: "EMEA",
        color: "#FFEA00",
        platform: "pc",
        skillTier: "4.1K",
        players: [player("gUigo", "xx", "damage"), player("jevr", "xx", "damage"), player("Hagust", "xx", "support"), player("Cat In The Row", "xx", "support")],
        staff: [staff("Hurdle", "xx", "manager"), staff("Hagust", "xx", "captain")],
      }),
      team({
        id: "kite",
        name: "Kite",
        region: "EMEA",
        color: "#BFD92A",
        platform: "pc",
        skillTier: "3.5K",
        players: [
          player("ELWardador", "gb", "tank"),
          player("iced", "xx", "tank"),
          player("Swifty", "gb", "damage"),
          player("ninja", "dz", "damage"),
          player("Traceless", "nl", "support"),
          player("Sid", "gb", "support"),
        ],
        staff: [staff("ELWardador", "gb", "manager"), staff("Luna", "de", "coach")],
      }),
      team({
        id: "pigeon",
        name: "Pigeon",
        region: "EMEA",
        color: "#C7C7C7",
        platform: "mixed",
        skillTier: "3.3K",
        players: [player("101", "xx", "damage")],
        staff: [staff("hori", "gb", "manager"), staff("hori", "gb", "coach")],
      }),
      team({
        id: "canary",
        name: "Canary",
        region: "EMEA",
        color: "#CC92E6",
        platform: "mixed",
        skillTier: "3.3K",
        players: [player("Alex", "xx", "damage"), player("Pinkie", "dz", "support"), player("isa", "xx", "flex")],
        staff: [staff("Yuri", "nl", "manager"), staff("Youseff", "xx", "coach")],
      }),
    ],
  },
  {
    id: "na",
    label: "teams.regions.na",
    icon: "pixel:globe-americas-solid",
    color: "#E75555",
    teams: [
      team({
        id: "eagle",
        name: "Eagle",
        region: "NA",
        color: "#A06B54",
        platform: "pc",
        skillTier: "Open",
        players: [
          player("fundogparty", "mx", "tank"),
          player("Chase", "us", "tank"),
          player("Dark", "sa", "damage"),
          player("bvop", "us", "damage"),
          player("veintidosimon", "us", "support"),
          player("Nameless", "us", "support"),
        ],
        staff: [staff("Kepler", "dz", "manager"), staff("Dark", "sa", "captain"), staff("Justin", "xx", "coach")],
      }),
      team({
        id: "raven",
        name: "Raven",
        region: "NA",
        color: "#3364EE",
        platform: "pc",
        skillTier: "Open",
        players: [
          player("oops", "us", "tank"),
          player("Azrael", "xx", "tank", true),
          player("Kersite", "us", "damage"),
          player("Gilgamesh", "us", "damage"),
          player("Genesis", "us", "support"),
          player("worryn", "us", "flex"),
        ],
        staff: [staff("Genesis", "us", "manager"), staff("Kepler", "dz", "manager"), staff("Aubstacle", "us", "coach")],
      }),
      team({
        id: "phoenix",
        name: "Phoenix",
        region: "NA",
        color: "#F59B46",
        platform: "pc",
        skillTier: "4K",
        players: [player("Azrael", "xx", "tank"), player("Jwam", "xx", "support", true)],
        staff: [staff("Azrael", "xx", "manager")],
      }),
      team({
        id: "kagu",
        name: "Kagu",
        region: "NA",
        color: "#6B9ED0",
        platform: "pc",
        skillTier: "3.8K",
        players: [player("Kepler", "dz", "tank"), player("Foxie", "xx", "damage"), player("Sid", "gb", "support")],
        staff: [staff("Sid", "gb", "manager"), staff("Kepler", "dz", "manager"), staff("Shadowy", "xx", "coach"), staff("veintidosimon", "us", "coach")],
      }),
      team({
        id: "pelican",
        name: "Pelican",
        region: "NA",
        color: "#2C6E51",
        platform: "pc",
        skillTier: "3.5K",
        players: [
          player("pizzabot", "xx", "tank"),
          player("Natsu", "xx", "damage"),
          player("NoNo", "xx", "damage"),
          player("AlpineOW", "xx", "damage"),
          player("Spinda", "xx", "support"),
          player("Holly", "xx", "support"),
          player("autumn", "xx", "support"),
        ],
        staff: [staff("femsick", "xx", "manager"), staff("AlpineOW", "xx", "captain"), staff("pizzabot", "xx", "captain"), staff("Jubs", "xx", "coach")],
      }),
    ],
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
