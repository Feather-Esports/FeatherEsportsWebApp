<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { useWindowSize } from "@vueuse/core"
import { useI18n } from "vue-i18n"

import type { Team, TeamRegion } from "@/data/teams"
import { useUiStore } from "@/stores/ui"

type TeamView = "players" | "staff"

const props = defineProps<{ regions: TeamRegion[] }>()

const { t } = useI18n()
const uiStore = useUiStore()
const { width: screenWidth } = useWindowSize()

const expandedTeams = ref<Set<string>>(new Set())
const teamViews = ref<Record<string, TeamView>>({})

const fallbackRegion: TeamRegion = {
  id: "",
  label: "",
  icon: "",
  color: "",
  teams: [],
}

const activeRegion = computed<TeamRegion>(() => {
  return props.regions.find(item => item.id === uiStore.activeTeamRegion) ?? props.regions[0] ?? fallbackRegion
})

const ROLE_ICONS = {
  tank: new URL("@/assets/images/icons/role_tank.webp", import.meta.url).href,
  damage: new URL("@/assets/images/icons/role_damage.webp", import.meta.url).href,
  support: new URL("@/assets/images/icons/role_support.webp", import.meta.url).href,
  flex: new URL("@/assets/images/icons/role_flex.webp", import.meta.url).href,
} as const

const teamLogos = import.meta.glob("@/assets/images/teams/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>

const PLATFORM_ICONS = {
  pc: "pixel:pc-solid",
  console: "pixel:gaming",
  mixed: "pixel:retro-pc-solid",
} as const

function getPlatformIcon(platform: Team["platform"]): string {
  return PLATFORM_ICONS[platform] ?? "lucide:monitor"
}

function toggleTeam(teamId: string): void {
  if (expandedTeams.value.has(teamId)) {
    expandedTeams.value.delete(teamId)
  } else {
    expandedTeams.value.add(teamId)
  }
}

function getTeamView(teamId: string): TeamView {
  return teamViews.value[teamId] ?? "players"
}

function setTeamView(teamId: string, view: TeamView): void {
  teamViews.value[teamId] = view
}

function getRoleIcon(role: string): string {
  const normalizedRole = role.toLowerCase() as keyof typeof ROLE_ICONS
  return ROLE_ICONS[normalizedRole] ?? ROLE_ICONS.flex
}

function getCountryEmoji(country: string): string {
  const normalized = country.trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(normalized)) return "??"
  return String.fromCodePoint(...normalized.split("").map(char => 127397 + char.charCodeAt(0)))
}

const columnCount = computed(() => {
  if (screenWidth.value <= 640) return 1
  if (screenWidth.value <= 1024) return 2
  return 4
})

const teamColumns = computed(() => {
  const cols: Team[][] = Array.from({ length: columnCount.value }, () => [])
  activeRegion.value.teams.forEach((team, index) => {
    cols[index % columnCount.value]?.push(team)
  })
  return cols
})
</script>

<template>
  <div class="team-regions" role="tablist" :aria-label="t('teams.regions.label')">
    <button
      v-for="region in props.regions"
      :key="region.id"
      type="button"
      role="tab"
      :aria-selected="activeRegion.id === region.id"
      :class="{ active: activeRegion.id === region.id }"
      :style="{ '--region-color': region.color }"
      @click="uiStore.selectTeamRegion(region.id)"
    >
      <Icon :icon="region.icon" :color="region.color" />
      <span>{{ t(region.label) }}</span>
    </button>
  </div>

  <Transition name="region-fade" mode="out-in">
    <div :key="activeRegion.id" class="rosters-columns">
      <template v-if="activeRegion.teams.length">
        <div v-for="(columnTeams, colIndex) in teamColumns" :key="colIndex" class="roster-column">
          <article v-for="team in columnTeams" :key="team.id" class="team-card" :class="{ expanded: expandedTeams.has(team.id) }" :style="{ '--team-color': team.color }">
            <button type="button" class="team-card-header" :aria-expanded="expandedTeams.has(team.id)" @click="toggleTeam(team.id)">
              <img class="team-logo" :src="teamLogos[`/src/assets/images/teams/${team.id}.webp`]" :alt="team.name" loading="eager" decoding="async" draggable="false" />

              <div class="team-info">
                <span class="team-name">{{ team.name }}</span>
                <div class="team-meta">
                  <Icon class="team-platform" :icon="getPlatformIcon(team.platform)" />
                  <span class="team-tier">{{ team.skillTier }}</span>
                </div>
              </div>

              <div class="team-expand">
                <Icon :class="{ rotated: expandedTeams.has(team.id) }" icon="pixel:chevron-down" />
              </div>
            </button>

            <Transition name="expand">
              <div v-show="expandedTeams.has(team.id)" class="team-card-expandable">
                <div class="team-card-inner">
                  <div class="team-card-body">
                    <div class="member-toggle" role="tablist" :aria-label="t('teams.card.memberView')">
                      <button type="button" :class="{ active: getTeamView(team.id) === 'players' }" @click="setTeamView(team.id, 'players')">
                        {{ t("teams.card.players") }}
                      </button>

                      <button type="button" :class="{ active: getTeamView(team.id) === 'staff' }" @click="setTeamView(team.id, 'staff')">
                        {{ t("teams.card.staff") }}
                      </button>
                    </div>

                    <Transition name="tab-switch" mode="out-in">
                      <div :key="getTeamView(team.id)" class="tab-content">
                        <ul class="member-list">
                          <template v-if="getTeamView(team.id) === 'players'">
                            <li v-for="player in team.players" :key="player.username + player.role">
                              <img class="member-role-icon" :src="getRoleIcon(player.role)" :alt="player.role" draggable="false" />

                              <div class="member-user">
                                <span class="member-country" :aria-label="player.country.toUpperCase()">
                                  {{ getCountryEmoji(player.country) }}
                                </span>
                                <span class="username">{{ player.username }}</span>
                              </div>

                              <span v-if="player.sub" class="member-badge">
                                {{ t("teams.card.sub") }}
                              </span>

                              <span v-if="player.dnp" class="member-badge">
                                {{ t("teams.card.dnp") }}
                              </span>
                            </li>
                          </template>

                          <template v-else>
                            <li v-for="staffMember in team.staff" :key="staffMember.username + staffMember.role">
                              <div class="member-user">
                                <span class="member-country" :aria-label="staffMember.country.toUpperCase()">
                                  {{ getCountryEmoji(staffMember.country) }}
                                </span>
                                <span class="username">{{ staffMember.username }}</span>
                              </div>

                              <span v-if="staffMember.role" class="member-badge">
                                {{ t(`teams.staff.${staffMember.role}`) }}
                              </span>
                            </li>
                          </template>
                        </ul>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- <div class="advanced-wrapper">
              <button class="advanced-button" type="button">
                <span>{{ t("teams.card.advanced") }}</span>
                <Icon icon="pixel:arrow-right" />
              </button>
            </div> -->
          </article>
        </div>
      </template>

      <div v-else class="empty-roster">
        <p>{{ t("teams.emptyState") }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.team-regions {
  display: grid;
  margin-top: 0.75rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-title);
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1px solid var(--color-line);
    min-height: 2.81rem;
    padding: 0.5rem;
    border-radius: 0;
    transition:
      background-color 200ms ease,
      border-color 200ms ease,
      color 200ms ease;

    svg {
      font-size: 1.375rem;
    }

    &:first-child {
      border-radius: 0.19rem 0 0 0.19rem;
    }
    &:last-child {
      border-radius: 0 0.19rem 0.19rem 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }

    &:hover,
    &.active {
      z-index: 1;
      color: var(--color-title);
    }

    &:hover {
      background: color-mix(in srgb, var(--region-color) 5%, var(--color-bg));
      border-color: color-mix(in srgb, var(--region-color) 20%, var(--color-bg));
    }
    &.active {
      background: color-mix(in srgb, var(--region-color) 15%, var(--color-bg));
      border-color: color-mix(in srgb, var(--region-color) 30%, var(--color-bg));
    }

    &:focus-visible {
      outline-offset: -3px;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & button {
      border-radius: 0 !important;

      &:nth-child(1) {
        border-radius: 0.19rem 0 0 0 !important;
      }
      &:nth-child(2) {
        border-radius: 0 0.19rem 0 0 !important;
      }
      &:nth-child(3) {
        border-radius: 0 0 0 0.19rem !important;
      }
      &:nth-child(4) {
        border-radius: 0 0 0.19rem 0 !important;
      }
    }
  }
}

.rosters-columns {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  width: 100%;
}

.roster-column {
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  gap: 0.75rem;
  width: 0;
  min-width: 0;
}

.empty-roster {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-title);
  font-size: 0.75rem;
  font-weight: 400;
  text-align: center;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  width: 100%;
  min-height: 4rem;
  padding: 0 1rem;
  border-radius: 0.19rem;
}

.team-card {
  background: color-mix(in srgb, var(--team-color) 5%, var(--color-bg));
  border: 0.09rem solid color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  min-width: 0;
  border-radius: 0.28rem;
  overflow: hidden;

  &.expanded .team-name {
    text-overflow: clip;
    white-space: normal;
    word-break: break-word;
    overflow: visible;
  }
}

.team-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font: inherit;
  text-align: left;
  color: inherit;
  background: transparent;
  border: none;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem;

  &:focus-visible {
    outline-offset: -2px;
  }

  @media (max-width: 640px) {
    gap: 0.65rem;
    padding: 0.6rem 0.65rem;
  }
}

.team-logo {
  display: block;
  width: auto;
  max-width: 2.2rem;
  height: 1.59rem;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: 640px) {
    height: 1.75rem;
  }
}

.team-info {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  text-align: left;
  min-width: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.35rem;
  }
}

.team-name {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-title);
  overflow: hidden;

  @media (max-width: 640px) {
    font-size: 0.825rem;
  }
}

.team-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 640px) {
    gap: 0.35rem;
  }
}

.team-platform {
  font-size: 0.9rem;
  color: var(--color-title);
  flex-shrink: 0;
}

.team-tier {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body);
  font-size: 0.66rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--color-title) 75%, transparent);
  background: color-mix(in srgb, var(--team-color) 10%, transparent);
  border: 0.03rem solid color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  padding: 0.24rem 0.47rem;
  border-radius: 0.15rem;

  @media (max-width: 640px) {
    line-height: 1;
  }
}

.team-expand {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  color: var(--color-title);
  padding: 0.25rem;
  flex-shrink: 0;

  & svg {
    font-size: 1rem;
    transition: transform 250ms ease;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.team-card-expandable {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 250ms ease;
}

.team-card-inner {
  overflow: hidden;
}

.member-toggle {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0 0.6rem 0.55rem;
  isolation: isolate;
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  padding: 0.2rem;
  border-radius: 0.28rem;

  &::before {
    content: "";
    z-index: 0;
    position: absolute;
    top: 0.25rem;
    bottom: 0.25rem;
    left: 0.25rem;
    background: color-mix(in srgb, var(--team-color) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--team-color) 25%, var(--color-line));
    width: calc(50% - 0.25rem);
    border-radius: 0.2rem;
    transition: transform 225ms ease;
  }

  & button {
    z-index: 1;
    position: relative;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 600;
    background: transparent;
    border: none;
    min-height: 2rem;
    padding: 0.4rem 0.5rem;
    transition: color 175ms ease;

    &.active {
      color: var(--color-title);
    }
  }

  &:has(button:last-child.active)::before {
    transform: translateX(100%);
  }

  @media (max-width: 640px) {
    padding: 0.35rem;
  }
}

.member-list {
  list-style: none;
  margin: 0;
  padding: 0;

  & li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-height: 2.2rem;
    padding: 0.45rem 0.6rem;

    &:nth-child(odd) {
      background: color-mix(in srgb, var(--team-color) 5%, transparent);
    }

    @media (max-width: 640px) {
      min-height: 2.5rem;
    }
  }
}

.member-role-icon {
  display: block;
  height: 0.95rem;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.member-user {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;

  & .username {
    font-size: 0.75rem;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-title);
    overflow: hidden;
  }
}

.member-country {
  font-family: var(--font-emoji);
  font-size: 0.85rem;
  line-height: 1;
  flex-shrink: 0;
}

.member-badge {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  font-family: var(--font-body);
  font-size: 0.55rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--color-title) 80%, transparent);
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  border: 0.03rem solid color-mix(in srgb, var(--team-color) 15%, var(--color-line));
  padding: 0.15rem 0.35rem;
  border-radius: 0.12rem;
  flex-shrink: 0;
}

.advanced-wrapper {
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  width: 100%;
  padding: 0.6rem;
}

.advanced-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  font: inherit;
  font-size: 0.66rem;
  font-weight: 600;
  color: var(--color-title);
  background: color-mix(in srgb, var(--team-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--team-color) 15%, var(--color-line));
  padding: 0.5rem 0;
  border-radius: 0.375rem;
  transition:
    background-color 200ms ease,
    border-color 200ms ease;

  &:hover {
    background: color-mix(in srgb, var(--team-color) 15%, transparent);
    border-color: color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  }

  & svg {
    font-size: 0.63rem;
    color: currentColor;
  }
}

/* Animations */

.region-fade {
  &-enter-active,
  &-leave-active {
    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(6px);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
}

.expand {
  &-enter-active,
  &-leave-active {
    transition:
      grid-template-rows 250ms ease,
      opacity 200ms ease;
  }

  &-enter-from,
  &-leave-to {
    grid-template-rows: 0fr;
    opacity: 0;
  }
}

.tab-switch {
  &-enter-active,
  &-leave-active {
    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(4px);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
}

@supports (-moz-appearance: none) {
  .team-card {
    transform: translateZ(0);
    contain: layout paint;
    will-change: transform;
  }

  .member-list,
  .empty-roster {
    transform: translateZ(0);
    will-change: height, transform;
  }

  .team-regions button {
    will-change: transform;
  }
}
</style>
