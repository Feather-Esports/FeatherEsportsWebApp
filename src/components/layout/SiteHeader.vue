<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { discordLink } from "@/data/site";
import Tooltip from "@/components/ui/Tooltip.vue";

const { t } = useI18n();

const navigation = [
  { id: "home", label: "header.nav.home" },
  { id: "teams", label: "header.nav.teams" },
  { id: "matches", label: "header.nav.matches" },
  { id: "faq", label: "header.nav.faq" },
  { id: "staff", label: "header.nav.staff" },
];
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#home" :aria-label="t('footer.homeLabel')"
      ><Icon icon="game-icons:feather" width="2.125rem" /><span>Feather</span></a
    >
    <nav class="main-nav" aria-label="Main navigation">
      <a v-for="item in navigation" :key="item.id" :href="`#${item.id}`">
        {{ t(item.label) }}
      </a>
    </nav>
    <div class="header-links">
      <Tooltip id="wip-tooltip">
        <template #trigger>
          <div class="wip-indicator">
            <Icon icon="pixel:exclaimation-solid" width="0.875rem" /> {{ t("header.wip") }}
          </div>
        </template>
        <strong>{{ t("header.wipTooltip.title") }}</strong>
        <p>{{ t("header.wipTooltip.description") }}</p>
      </Tooltip>
      <a class="discord-link" :href="discordLink.href" target="_blank" rel="noreferrer"
        ><Icon :icon="discordLink.icon" width="1.375rem" /> {{ t("header.discord") }}</a
      >
    </div>
  </header>
</template>

<style scoped>
.site-header {
  z-index: 10;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 3.75rem;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 clamp(1.25rem, 5vw, 1.563rem);
  background: color-mix(in srgb, var(--color-ink) 75%, transparent);
  -webkit-backdrop-filter: blur(0.75rem) saturate(1.15);
  backdrop-filter: blur(0.75rem) saturate(1.15);
  border-bottom: 1px solid var(--color-line);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.438rem;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 1.593rem;
  text-transform: uppercase;
}

.main-nav {
  display: flex;
  gap: clamp(0.8rem, 2vw, 2rem);
  font-family: var(--font-heading);
  font-size: 0.81rem;
  font-weight: 600;
  text-transform: uppercase;
}
.main-nav a {
  position: relative;
  color: var(--color-text);
  padding: 0.313rem 0;

  &:hover {
    color: var(--color-accent);

    &::after {
      transform: scaleX(1);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color-accent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 180ms ease;
  }
}

.header-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.wip-indicator,
.discord-link {
  display: inline-flex;
  align-items: center;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 0.688rem;
  font-weight: 600;
  gap: 0.313rem;
  height: 1.875rem;
  padding: 0rem 0.625rem;
  text-transform: uppercase;
  border-radius: 0.19rem;
}
.wip-indicator {
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
}
.discord-link {
  background: var(--color-accent);
  color: var(--color-accent-muted);
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
  .header-links {
    margin-left: auto;
  }
}
</style>
