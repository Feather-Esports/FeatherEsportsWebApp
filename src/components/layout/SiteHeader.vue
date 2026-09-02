<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const navigation = [
  { id: "home", label: "nav.home" },
  { id: "teams", label: "nav.teams" },
  { id: "matches", label: "nav.matches" },
  { id: "faq", label: "nav.faq" },
  { id: "staff", label: "nav.staff" },
];
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#home" :aria-label="t('footer.homeLabel')"
      ><Icon icon="game-icons:feather" width="23" /><span>Feather</span></a
    >
    <nav class="main-nav" aria-label="Main navigation">
      <a v-for="item in navigation" :key="item.id" :href="`#${item.id}`">
        {{ t(item.label) }}
      </a>
    </nav>
    <div class="header-actions">
      <a class="action-link" href="#matches"
        ><Icon icon="pixel:trophy-solid" /> {{ t("actions.wip") }}</a
      ><a class="discord-link" href="#community"
        ><Icon icon="pixel:discord" /> {{ t("actions.discord") }}</a
      >
    </div>
  </header>
</template>

<style scoped>
.site-header {
  align-items: center;
  background: var(--color-header);
  border-bottom: 1px solid var(--color-line);
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  min-height: 2.1rem;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
}
.wordmark {
  align-items: center;
  color: var(--color-accent);
  display: inline-flex;
  font-family: var(--font-display);
  font-size: 0.9rem;
  gap: 0.35rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.main-nav {
  display: flex;
  gap: clamp(0.8rem, 2vw, 2rem);
  font-size: 0.65rem;
  text-transform: uppercase;
}
.main-nav a {
  position: relative;
  color: var(--color-text-muted);
  padding: 0.7rem 0;
}
.main-nav a:hover {
  color: var(--color-accent);
}
.main-nav a::after {
  background: var(--color-accent);
  bottom: 0;
  content: "";
  height: 1px;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 180ms ease;
  width: 100%;
}
.main-nav a:hover::after {
  transform: scaleX(1);
}
.header-actions {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}
.action-link,
.discord-link {
  align-items: center;
  border: 1px solid var(--color-line);
  color: var(--color-text);
  display: inline-flex;
  font-size: 0.6rem;
  gap: 0.35rem;
  padding: 0.55rem 0.7rem;
  text-transform: uppercase;
}
.discord-link {
  background: var(--color-accent);
  color: var(--color-ink);
}
@media (max-width: 760px) {
  .site-header {
    flex-wrap: wrap;
    gap: 0.8rem;
    min-height: 7.5rem;
    padding: 0.8rem 1rem;
  }
  .main-nav {
    order: 3;
    overflow-x: auto;
    width: 100%;
  }
  .main-nav a {
    padding: 0.5rem 0;
    white-space: nowrap;
  }
  .header-actions {
    margin-left: auto;
  }
}
</style>
