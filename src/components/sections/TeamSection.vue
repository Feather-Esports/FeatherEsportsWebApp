<script setup lang="ts">
import { Icon } from "@iconify/vue";
import FlagIcon from "vue3-flag-icons";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import type { Team, TeamRegion } from "@/data/teams";
import { useUiStore } from "@/stores/ui";

type TeamView = "players" | "staff";

const props = defineProps<{ regions: TeamRegion[] }>();

const { t } = useI18n();
const uiStore = useUiStore();

const teamViews = reactive<Record<string, TeamView>>({});
const expandedTeams = reactive(new Set<string>());

const activeRegion = computed<TeamRegion>(
  () =>
    props.regions.find((region) => region.id === uiStore.activeTeamRegion) ??
    props.regions[0] ?? {
      id: "",
      label: "",
      icon: "",
      color: "",
      teams: [],
    },
);

const ROLE_ICONS = {
  tank: new URL("@/assets/images/icons/role_tank.png", import.meta.url).href,
  damage: new URL("@/assets/images/icons/role_damage.png", import.meta.url).href,
  support: new URL("@/assets/images/icons/role_support.png", import.meta.url).href,
  flex: new URL("@/assets/images/icons/role_flex.png", import.meta.url).href,
} as const;

function toggleTeam(teamId: string) {
  if (expandedTeams.has(teamId)) {
    expandedTeams.delete(teamId);
  } else {
    expandedTeams.add(teamId);
  }
}

function getTeamView(teamId: string): TeamView {
  return teamViews[teamId] ?? "players";
}

function getMembers(team: Team) {
  return getTeamView(team.id) === "players" ? team.players : team.staff;
}

function setTeamView(teamId: string, view: TeamView) {
  teamViews[teamId] = view;
}

function getRoleIcon(role: string) {
  return ROLE_ICONS[role?.toLowerCase() as keyof typeof ROLE_ICONS] ?? ROLE_ICONS.flex;
}
</script>

<template>
  <div class="team-regions" role="tablist" :aria-label="t('teams.regions.label')">
    <button
      v-for="region in regions"
      :key="region.id"
      type="button"
      role="tab"
      :aria-selected="activeRegion.id === region.id"
      :class="{ active: activeRegion.id === region.id }"
      :style="{ '--region-color': region.color }"
      @click="uiStore.selectTeamRegion(region.id)"
    >
      <Icon :icon="region.icon" :color="region.color" width="1.375rem" />
      {{ t(region.label) }}
    </button>
  </div>

  <div class="team-rosters">
    <template v-if="activeRegion.teams && activeRegion.teams.length">
      <article
        v-for="team in activeRegion.teams"
        :key="team.id"
        class="team-card"
        :class="{ expanded: expandedTeams.has(team.id) }"
        :style="{ '--team-color': team.color }"
      >
        <header class="team-card-header">
          <img class="team-logo" :src="team.logo" :alt="team.name" />

          <div class="team-name">{{ team.name }}</div>
          <div class="team-tier">{{ team.skillTier }}</div>

          <button
            class="team-expand"
            type="button"
            :aria-expanded="expandedTeams.has(team.id)"
            @click="toggleTeam(team.id)"
          >
            <Icon
              :class="{ rotated: expandedTeams.has(team.id) }"
              icon="pixel:chevron-down"
              width="0.9rem"
            />
          </button>
        </header>

        <Transition name="expand">
          <div v-show="expandedTeams.has(team.id)" class="team-card-expandable">
            <div class="team-card-inner">
              <div class="team-card-body">
                <div class="member-toggle" role="tablist" :aria-label="t('teams.card.memberView')">
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
                      <li v-for="member in getMembers(team)" :key="member.username + member.role">
                        <img
                          v-if="getTeamView(team.id) === 'players'"
                          class="member-role-icon"
                          :src="getRoleIcon(member.role)"
                          :alt="member.role"
                        />

                        <div class="member-user">
                          <FlagIcon :code="member.country.toLowerCase()" square />
                          <span>{{ member.username }}</span>
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
    </template>

    <div v-else class="empty-roster">
      <p>{{ t("teams.emptyState") }}</p>
    </div>
  </div>
</template>

<style scoped>
.team-regions,
.team-rosters {
  margin-top: 0.75rem;
}

.team-regions {
  display: grid;
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
  gap: 0.75rem;
  justify-content: center;
  min-height: 2.81rem;
  padding: 0.5rem;
  border-radius: 0;
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease,
    transform 150ms ease;

  &:first-child {
    border-radius: 0.19rem 0 0 0.19rem;
  }

  &:last-child {
    border-radius: 0 0.19rem 0.19rem 0;
  }

  &:not(:first-child) {
    margin-left: -1px;
  }

  &:hover {
    z-index: 1;
    background: color-mix(in srgb, var(--region-color) 5%, var(--color-bg));
    border-color: color-mix(in srgb, var(--region-color) 20%, var(--color-bg));
    color: var(--color-title);
  }
  &.active {
    z-index: 1;
    background: color-mix(in srgb, var(--region-color) 15%, var(--color-bg));
    border-color: color-mix(in srgb, var(--region-color) 30%, var(--color-bg));
    color: var(--color-title);
  }
}

.team-rosters {
  display: grid;
  gap: 0.63rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 0.63rem;
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  border-radius: 0.19rem;
}

.empty-roster {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4rem;
  font-family: var(--font-title);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
}

.team-card {
  min-width: 0;
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  border: 0.09rem solid color-mix(in srgb, var(--team-color) 20%, var(--color-line));
  border-radius: 0.28rem;
  overflow: hidden;
}

.team-card-header {
  align-items: center;
  display: flex;
  gap: 0.5rem;
  min-height: 2.53rem;
  padding: 0.5rem;
}
.team-logo {
  display: block;
  height: 1.59rem;
  width: auto;
}
.team-name {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.team-tier {
  display: inline-flex;
  align-items: center;
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
  border: 0.03rem solid color-mix(in srgb, var(--team-color) 10%, var(--color-line));
  border-radius: 0.12rem;
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
  padding: 0.3rem;
  background: transparent;
  border: none;
  cursor: pointer;

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
  padding: 0.28rem;
  margin: 0 0.6rem 0.55rem;
}
.member-toggle::before {
  content: "";
  position: absolute;
  top: 0.28rem;
  bottom: 0.28rem;
  left: 0.28rem;
  width: calc(50% - 0.28rem);
  background: color-mix(in srgb, var(--team-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--team-color) 15%, var(--color-line));
  border-radius: 0.14rem;
  transition: transform 225ms ease;
  z-index: 0;
}
.member-toggle button {
  z-index: 1;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.66rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
  transition: color 175ms ease;

  &.active {
    color: var(--color-title);
  }
}
.member-toggle:has(button:last-child.active)::before {
  transform: translateX(100%);
}

.member-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.member-list li {
  align-items: center;
  display: flex;
  gap: 0.8rem;
  padding: 0.5rem 0.6rem;
}
.member-list li:nth-child(even) {
  background: transparent;
}
.member-list li:nth-child(odd) {
  background: color-mix(in srgb, var(--team-color) 5%, transparent);
}

.member-role-icon {
  display: block;
  height: 0.94rem;
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
.member-user span {
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
  border: 0.03rem solid color-mix(in srgb, var(--team-color) 10%, var(--color-line));
  border-radius: 0.12rem;
  font-family: var(--font-body);
  font-size: 0.53rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--color-title) 75%, transparent);
  padding: 0.24rem 0.47rem;
  margin-left: auto;
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
}
.advanced-button svg {
  color: currentColor;
  font-size: 0.63rem;
}

.expand {
  &-enter-from,
  &-leave-to {
    grid-template-rows: 0fr;
  }
}

.tab-switch {
  &-enter-active,
  &-leave-active {
    transition:
      opacity 200ms ease,
      transform 200ms ease;
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

@media (max-width: 760px) {
  .team-regions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .team-regions button:nth-child(2) {
    border-right: 0;
  }
  .team-regions button:nth-child(-n + 2) {
    border-bottom: 1px solid var(--color-line);
  }

  .team-rosters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
