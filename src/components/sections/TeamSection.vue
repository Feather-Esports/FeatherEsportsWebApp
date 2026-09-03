<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import type { Team, TeamRegion } from "@/data/teams";
import { useUiStore } from "@/stores/ui";

const props = defineProps<{ regions: TeamRegion[] }>();
const { t } = useI18n();
const uiStore = useUiStore();
const teamViews = reactive<Record<string, "players" | "staff">>({});
const expandedTeams = reactive(new Set<string>());

const activeRegion = computed<TeamRegion>(
  () =>
    props.regions.find((region) => region.id === uiStore.activeTeamRegion) ??
    props.regions[0] ?? { id: "", label: "", icon: "", color: "", teams: [] },
);

function toggleTeam(teamId: string) {
  if (expandedTeams.has(teamId)) expandedTeams.delete(teamId);
  else expandedTeams.add(teamId);
}

function members(team: Team) {
  return (teamViews[team.id] ?? "players") === "players" ? team.players : team.staff;
}

function setTeamView(teamId: string, view: "players" | "staff") {
  teamViews[teamId] = view;
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
      @click="uiStore.selectTeamRegion(region.id)"
    >
      <Icon :icon="region.icon" />
      {{ t(region.label) }}
    </button>
  </div>
  <div class="team-roster">
    <article
      v-for="team in activeRegion.teams"
      :key="team.id"
      class="team-card"
      :class="{ expanded: expandedTeams.has(team.id) }"
      :style="{ '--team-color': team.color }"
    >
      <header class="team-card-header">
        <img class="team-logo" :src="team.logo" :alt="team.name" />
        <div class="team-name">
          <strong>{{ team.name }}</strong>
          <span>{{ t(team.skillTier) }}</span>
        </div>
        <button
          class="team-expand"
          type="button"
          :aria-expanded="expandedTeams.has(team.id)"
          @click="toggleTeam(team.id)"
        >
          <Icon :icon="expandedTeams.has(team.id) ? 'pixel:chevron-up' : 'pixel:chevron-down'" />
        </button>
      </header>
      <div class="team-card-body">
        <template v-if="expandedTeams.has(team.id)">
          <div class="member-toggle" role="tablist" :aria-label="t('teams.card.memberView')">
            <button
              type="button"
              :class="{ active: (teamViews[team.id] ?? 'players') === 'players' }"
              @click="setTeamView(team.id, 'players')"
            >
              {{ t("teams.card.players") }}
            </button>
            <button
              type="button"
              :class="{ active: (teamViews[team.id] ?? 'players') === 'staff' }"
              @click="setTeamView(team.id, 'staff')"
            >
              {{ t("teams.card.staff") }}
            </button>
          </div>
          <ul class="member-list">
            <li v-for="member in members(team)" :key="member.username + member.role">
              <Icon icon="pixel:user-solid" />
              <span>{{ member.username }}</span>
              <small>{{ t(member.role) }}</small>
              <em v-if="'isSub' in member && member.isSub">{{ t("teams.card.sub") }}</em>
              <em v-if="'dnp' in member && member.dnp">{{ t("teams.card.dnp") }}</em>
            </li>
          </ul>
        </template>
        <button class="advanced-button" type="button">
          {{ t("teams.card.advanced") }}
          <Icon icon="pixel:arrow-right" />
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.team-regions {
  border: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.team-regions {
  margin-bottom: 0.75rem;
}
.team-regions button,
.member-toggle button {
  align-items: center;
  background: transparent;
  border: 0;
  border-right: 1px solid var(--color-line);
  color: var(--color-text);
  display: flex;
  font: inherit;
  font-size: 0.58rem;
  gap: 0.45rem;
  justify-content: center;
  min-height: 2.2rem;
  padding: 0.5rem;
}
.team-regions button:last-child,
.member-toggle button:last-child {
  border-right: 0;
}
.team-regions button.active,
.team-regions button:hover,
.member-toggle button.active {
  background: var(--color-heading-glow);
  color: var(--color-brand);
}
.member-toggle {
  border: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 0.55rem;
}
.team-roster {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.team-card {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--team-color) 16%, var(--color-panel)),
    var(--color-panel) 75%
  );
  border: 1px solid color-mix(in srgb, var(--team-color) 45%, var(--color-line));
  min-width: 0;
  overflow: hidden;
}
.team-card-header {
  align-items: center;
  display: flex;
  gap: 0.6rem;
  min-height: 3.7rem;
  padding: 0.6rem;
}
.team-logo {
  height: 1.594rem;
  width: auto;
}
.team-name {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}
.team-name strong {
  font-family: var(--font-title);
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}
.team-name span,
.team-meta,
.team-details {
  color: var(--color-text);
  font-size: 0.5rem;
}
.team-expand,
.advanced-button {
  background: transparent;
  border: 1px solid var(--color-line);
  color: var(--color-text);
  font: inherit;
}
.team-expand {
  border: 0;
  color: var(--team-color);
  padding: 0.3rem;
}
.team-card-body {
  padding: 0 0.6rem 0.6rem;
}
.member-toggle {
  border: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 0.55rem;
}
.member-toggle button {
  border-right: 1px solid var(--color-line);
}
.member-toggle button:last-child {
  border-right: 0;
}
.member-toggle button.active {
  background: color-mix(in srgb, var(--team-color) 18%, transparent);
  color: var(--team-color);
}
.team-meta {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  gap: 0.4rem;
  padding: 0.45rem 0;
}
.team-meta strong {
  color: var(--team-color);
}
.member-list {
  list-style: none;
  margin: 0;
}
.member-list li {
  align-items: center;
  border-top: 1px solid var(--color-line-soft);
  display: grid;
  gap: 0.3rem;
  grid-template-columns: 0.8rem 1fr auto;
  padding: 0.42rem 0;
}
.member-list li svg {
  color: var(--team-color);
}
.member-list small {
  color: var(--color-text);
  font-size: 0.48rem;
}
.member-list em {
  color: var(--team-color);
  font-size: 0.45rem;
  grid-column: 2 / -1;
}
.advanced-button {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0.6rem 0.6rem;
  padding: 0.45rem;
  width: calc(100% - 1.2rem);
}
.advanced-button svg {
  color: var(--team-color);
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
  .team-roster {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
