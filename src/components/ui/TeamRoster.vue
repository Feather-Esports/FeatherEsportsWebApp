<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { TeamRegion } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const props = defineProps<{ regions: TeamRegion[] }>();

const { t } = useI18n();
const uiStore = useUiStore();
const activeRegion = computed<TeamRegion>(
  () =>
    props.regions.find((region) => region.id === uiStore.activeTeamRegion) ??
    props.regions[0] ?? { id: "", label: "", icon: "", teams: [] },
);
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
    <article v-for="team in activeRegion.teams" :key="team.name" class="team-card">
      <header>
        <strong>{{ team.name }}</strong>
        <span>{{ t("teams.card.game") }}</span>
      </header>
      <div class="team-card-bar">
        {{ t("teams.card.players") }}
        <span>{{ t("teams.card.staff") }}</span>
      </div>
      <ul>
        <li v-for="player in team.players" :key="player">
          <Icon icon="pixel:user-solid" /> {{ player }}
        </li>
      </ul>
      <button type="button">
        {{ t("teams.card.details") }}
        <Icon icon="pixel:arrow-right" aria-hidden="true" />
      </button>
    </article>
  </div>
</template>

<style scoped>
.team-roster {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.team-regions {
  border: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 0.75rem;
}
.team-regions button {
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
.team-regions button:last-child {
  border-right: 0;
}
.team-regions button.active,
.team-regions button:hover {
  background: var(--color-heading-glow);
  color: var(--color-brand);
}
.team-card {
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  min-width: 0;
  padding: 0.5rem;
}
.team-card header,
.team-card-bar,
.team-card li,
.team-card button {
  font-size: 0.55rem;
}
.team-card header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 2rem;
}
.team-card header strong {
  font-family: var(--font-title);
  text-transform: uppercase;
}
.team-card header span,
.team-card-bar {
  color: var(--color-text);
}
.team-card-bar {
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  padding: 0.35rem;
}
.team-card ul {
  list-style: none;
  margin: 0.3rem 0;
}
.team-card li {
  border-bottom: 1px solid var(--color-line-soft);
  color: var(--color-text);
  padding: 0.28rem 0;
}
.team-card button {
  background: transparent;
  border: 1px solid var(--color-line);
  color: var(--color-title);
  font: inherit;
  padding: 0.35rem;
  width: 100%;
}
.team-card button span {
  color: var(--color-brand);
  float: right;
}
.team-card button svg {
  color: var(--color-brand);
  float: right;
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
