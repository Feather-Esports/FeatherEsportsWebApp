<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import type { Team, TeamRegion } from "@/data/teams";
import { useUiStore } from "@/stores/ui";

type TeamView = "players" | "staff";
type TeamMember = Team["players"][number] | Team["staff"][number];

const props = defineProps<{ regions: TeamRegion[] }>();

const { t } = useI18n();
const uiStore = useUiStore();

const expandedTeams = ref<Set<string>>(new Set());
const teamViews = ref<Record<string, TeamView>>({});

const fallbackRegion: TeamRegion = {
  id: "",
  label: "",
  icon: "",
  color: "",
  teams: [],
};

const activeRegion = computed<TeamRegion>(() => {
  const region = props.regions.find((item) => item.id === uiStore.activeTeamRegion);
  return region ?? props.regions[0] ?? fallbackRegion;
});

const ROLE_ICONS = {
  tank: new URL("@/assets/images/icons/role_tank.webp", import.meta.url).href,
  damage: new URL("@/assets/images/icons/role_damage.webp", import.meta.url).href,
  support: new URL("@/assets/images/icons/role_support.webp", import.meta.url).href,
  flex: new URL("@/assets/images/icons/role_flex.webp", import.meta.url).href,
} as const;

const teamLogos = import.meta.glob("@/assets/images/teams/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const PLATFORM_ICONS = {
  pc: "pixel:pc-solid",
  console: "pixel:gaming",
  mixed: "pixel:retro-pc-solid",
} as const;

function getPlatformIcon(platform: Team["platform"]): string {
  return PLATFORM_ICONS[platform] ?? "lucide:monitor";
}

function toggleTeam(teamId: string): void {
  const nextExpanded = new Set(expandedTeams.value);

  if (nextExpanded.has(teamId)) {
    nextExpanded.delete(teamId);
  } else {
    nextExpanded.add(teamId);
  }

  expandedTeams.value = nextExpanded;
}

function getTeamView(teamId: string): TeamView {
  return teamViews.value[teamId] ?? "players";
}

function getMembers(team: Team): Array<TeamMember> {
  return getTeamView(team.id) === "players" ? team.players : team.staff;
}

function setTeamView(teamId: string, view: TeamView): void {
  teamViews.value[teamId] = view;
}

function getRoleIcon(role: string): string {
  const normalizedRole = role.toLowerCase() as keyof typeof ROLE_ICONS;
  return ROLE_ICONS[normalizedRole] ?? ROLE_ICONS.flex;
}

function getCountryEmoji(country: string): string {
  const normalizedCountry = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalizedCountry)) {
    return "??";
  }

  return String.fromCodePoint(
    ...normalizedCountry.split("").map((character) => 127397 + character.charCodeAt(0)),
  );
}

const screenWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1200);
function updateWidth(): void {
  screenWidth.value = window.innerWidth;
}

const columnCount = computed(() => {
  if (screenWidth.value <= 640) return 1;
  if (screenWidth.value <= 1024) return 2;
  return 4;
});

const teamColumns = computed(() => {
  const cols: (typeof activeRegion.value.teams)[] = Array.from(
    { length: columnCount.value },
    () => [],
  );
  activeRegion.value.teams.forEach((team, index) => {
    cols[index % columnCount.value].push(team);
  });
  return cols;
});

onMounted(() => {
  Object.values(teamLogos).forEach((url) => {
    const img = new Image();
    img.src = url;
    img.decode().catch(() => {});
  });

  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
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
      <Icon :icon="region.icon" :color="region.color" width="1.375rem" />
      <span>{{ t(region.label) }}</span>
    </button>
  </div>

  <Transition name="region-fade" mode="out-in">
    <div :key="activeRegion.id" class="rosters-columns">
      <template v-if="activeRegion.teams.length">
        <div v-for="(columnTeams, colIndex) in teamColumns" :key="colIndex" class="roster-column">
          <article
            v-for="team in columnTeams"
            :key="team.id"
            class="team-card"
            :class="{ expanded: expandedTeams.has(team.id) }"
            :style="{ '--team-color': team.color }"
          >
            <header
              class="team-card-header"
              tabindex="0"
              role="button"
              :aria-expanded="expandedTeams.has(team.id)"
              @click="toggleTeam(team.id)"
              @keydown.enter.prevent="toggleTeam(team.id)"
              @keydown.space.prevent="toggleTeam(team.id)"
            >
              <img
                class="team-logo"
                :src="teamLogos[`/src/assets/images/teams/${team.id}.webp`]"
                :alt="team.name"
                loading="eager"
                decoding="async"
                draggable="false"
              />

              <div class="team-info">
                <span class="team-name">{{ team.name }}</span>
                <div class="team-meta">
                  <Icon class="team-platform" :icon="getPlatformIcon(team.platform)" />
                  <span class="team-tier">{{ team.skillTier }}</span>
                </div>
              </div>

              <div class="team-expand">
                <Icon
                  :class="{ rotated: expandedTeams.has(team.id) }"
                  icon="pixel:chevron-down"
                  width="1rem"
                />
              </div>
            </header>

            <Transition name="expand">
              <div v-show="expandedTeams.has(team.id)" class="team-card-expandable">
                <div class="team-card-inner">
                  <div class="team-card-body">
                    <div
                      class="member-toggle"
                      role="tablist"
                      :aria-label="t('teams.card.memberView')"
                    >
                      <button
                        type="button"
                        :class="{ active: getTeamView(team.id) === 'players' }"
                        @click="setTeamView(team.id, 'players')"
                      >
                        {{ t("teams.card.players") }}
                      </button>

                      <button
                        type="button"
                        :class="{ active: getTeamView(team.id) === 'staff' }"
                        @click="setTeamView(team.id, 'staff')"
                      >
                        {{ t("teams.card.staff") }}
                      </button>
                    </div>

                    <Transition name="tab-switch" mode="out-in">
                      <div :key="getTeamView(team.id)" class="tab-content">
                        <ul class="member-list">
                          <li
                            v-for="member in getMembers(team)"
                            :key="member.username + member.role"
                          >
                            <img
                              v-if="getTeamView(team.id) === 'players'"
                              class="member-role-icon"
                              :src="getRoleIcon(member.role)"
                              :alt="member.role"
                              draggable="false"
                            />

                            <div class="member-user">
                              <span
                                class="member-country"
                                :aria-label="member.country.toUpperCase()"
                              >
                                {{ getCountryEmoji(member.country) }}
                              </span>
                              <span class="username">{{ member.username }}</span>
                            </div>

                            <span v-if="'isSub' in member && member.isSub" class="member-badge">
                              {{ t("teams.card.sub") }}
                            </span>

                            <span v-if="'dnp' in member && member.dnp" class="member-badge">
                              {{ t("teams.card.dnp") }}
                            </span>

                            <span
                              v-if="getTeamView(team.id) === 'staff' && member.role"
                              class="member-badge"
                            >
                              {{ t(`teams.staff.${member.role}`) }}
                            </span>
                          </li>
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
}

.team-regions button {
  align-items: center;
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  color: var(--color-text);
  display: flex;
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 0.875rem;
  gap: 0.5rem;
  justify-content: center;
  min-height: 2.81rem;
  padding: 0.5rem;
  outline: none;
  border-radius: 0;
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease;

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
  width: 0;
  gap: 0.75rem;
  min-width: 0;
}

.empty-roster {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4rem;
  font-family: var(--font-title);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  border-radius: 0.19rem;
  padding: 0 1rem;
}

.team-card {
  min-width: 0;
  background: color-mix(in srgb, var(--team-color) 5%, var(--color-bg));
  border: 0.09rem solid color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  border-radius: 0.28rem;
  overflow: hidden;
}

.team-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.53rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
}
.team-logo {
  display: block;
  height: 1.59rem;
  width: auto;
  max-width: 2.2rem;
  object-fit: contain;
  flex-shrink: 0;
}
.team-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
  text-align: left;
}
.team-name {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-title);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
}
.team-card.expanded .team-name {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
  word-break: break-word;
}
.team-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.team-platform {
  font-size: 0.9rem;
  color: var(--color-title);
  flex-shrink: 0;
}
.team-tier {
  display: inline-flex;
  align-items: center;
  background: color-mix(in srgb, var(--team-color) 10%, transparent);
  border: 0.03rem solid color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  border-radius: 0.15rem;
  font-family: var(--font-body);
  font-size: 0.66rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--color-title) 75%, transparent);
  padding: 0.24rem 0.47rem;
}
.team-expand {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  color: var(--color-title);
  padding: 0.25rem;
  flex-shrink: 0;

  svg {
    transition: transform 250ms ease;
  }
  svg.rotated {
    transform: rotate(180deg);
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
  isolation: isolate;
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  border-radius: 0.28rem;
  padding: 0.2rem;
  margin: 0 0.6rem 0.55rem;

  &::before {
    content: "";
    position: absolute;
    top: 0.25rem;
    bottom: 0.25rem;
    left: 0.25rem;
    width: calc(50% - 0.25rem);
    background: color-mix(in srgb, var(--team-color) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--team-color) 25%, var(--color-line));
    border-radius: 0.2rem;
    transition: transform 225ms ease;
    z-index: 0;
  }

  button {
    z-index: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.4rem 0.5rem;
    position: relative;
    cursor: pointer;
    transition: color 175ms ease;

    &.active {
      color: var(--color-title);
    }
  }
  &:has(button:last-child.active)::before {
    transform: translateX(100%);
  }
}

.member-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.member-list li {
  align-items: center;
  display: flex;
  gap: 0.6rem;
  padding: 0.45rem 0.6rem;
  min-height: 2.2rem;

  &:nth-child(odd) {
    background: color-mix(in srgb, var(--team-color) 5%, transparent);
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
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}
.member-country {
  flex-shrink: 0;
  font-size: 0.85rem;
  line-height: 1;
  font-family: var(--font-emoji);
}
.member-user .username {
  color: var(--color-title);
  font-size: 0.75rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.member-badge {
  display: inline-flex;
  align-items: center;
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  border: 0.03rem solid color-mix(in srgb, var(--team-color) 15%, var(--color-line));
  border-radius: 0.12rem;
  font-family: var(--font-body);
  font-size: 0.55rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--color-title) 80%, transparent);
  padding: 0.15rem 0.35rem;
  margin-left: auto;
  flex-shrink: 0;
}

.advanced-wrapper {
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  box-sizing: border-box;
  padding: 0.6rem;
  width: 100%;
}
.advanced-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem 0;
  font: inherit;
  font-size: 0.66rem;
  font-weight: 600;
  color: var(--color-title);
  background: color-mix(in srgb, var(--team-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--team-color) 15%, var(--color-line));
  border-radius: 0.375rem;
  cursor: pointer;
  transition:
    background-color 200ms ease,
    border-color 200ms ease;

  &:hover {
    background: color-mix(in srgb, var(--team-color) 15%, transparent);
    border-color: color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  }

  svg {
    color: currentColor;
    font-size: 0.63rem;
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
    will-change: transform;
    transform: translateZ(0);
    contain: layout paint;
  }

  .member-list,
  .empty-roster {
    will-change: height, transform;
    transform: translateZ(0);
  }

  .team-regions button {
    will-change: transform;
  }
}

@media (max-width: 640px) {
  .team-regions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .team-regions button {
    border-radius: 0 !important;
  }
  .team-regions button:nth-child(1) {
    border-radius: 0.19rem 0 0 0 !important;
  }
  .team-regions button:nth-child(2) {
    border-radius: 0 0.19rem 0 0 !important;
  }
  .team-regions button:nth-child(3) {
    border-radius: 0 0 0 0.19rem !important;
  }
  .team-regions button:nth-child(4) {
    border-radius: 0 0 0.19rem 0 !important;
  }

  .team-card-header {
    gap: 0.65rem;
    padding: 0.6rem 0.65rem;
  }
  .team-logo {
    height: 1.75rem;
  }
  .team-info {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.35rem;
  }
  .team-name {
    font-size: 0.825rem;
  }
  .team-meta {
    gap: 0.35rem;
  }
  .team-tier {
    line-height: 1;
  }

  .member-toggle {
    padding: 0.45rem;
  }
}
</style>
