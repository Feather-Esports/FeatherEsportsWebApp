<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { discordLink } from "@/data/site";
import Tooltip from "@/components/widgets/Tooltip.vue";

const { t } = useI18n();
const menuOpen = ref(false);

const navigation = [
  { id: "teams", label: "header.nav.teams" },
  { id: "faq", label: "header.nav.faq" },
  { id: "matches", label: "header.nav.matches" },
  { id: "partners", label: "header.nav.partners" },
  { id: "staff", label: "header.nav.staff" },
];
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="/"
      ><Icon icon="game-icons:feather" width="2.125rem" /><span>Feather</span></a
    >
    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="site-navigation"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      @click="menuOpen = !menuOpen"
    >
      <Icon :icon="menuOpen ? 'pixel:times' : 'pixel:bars'" />
    </button>
    <div class="header-panel" :class="{ open: menuOpen }">
      <nav id="site-navigation" class="main-nav" aria-label="Main navigation">
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
  background: color-mix(in srgb, var(--color-bg) 75%, transparent);
  -webkit-backdrop-filter: blur(0.75rem) saturate(1.15);
  backdrop-filter: blur(0.75rem) saturate(1.15);
  border-bottom: 1px solid var(--color-line);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.438rem;
  color: var(--color-brand);
  font-family: var(--font-brand);
  font-size: 1.593rem;
  text-transform: uppercase;
}

.main-nav {
  display: flex;
  gap: clamp(0.8rem, 2vw, 2rem);
  font-family: var(--font-title);
  font-size: 0.81rem;
  font-weight: 600;
  text-transform: uppercase;
}
.header-panel {
  display: contents;
}
.main-nav a {
  position: relative;
  color: var(--color-title);
  padding: 0.313rem 0;

  &:hover {
    color: var(--color-brand);

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
    background: var(--color-brand);
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
  color: var(--color-title);
  font-family: var(--font-title);
  font-size: 0.688rem;
  font-weight: 600;
  gap: 0.313rem;
  height: 1.875rem;
  padding: 0rem 0.625rem;
  text-transform: uppercase;
  border-radius: 0.19rem;
}
.wip-indicator {
  border: 1px solid var(--color-brand);
  color: var(--color-brand);
  cursor: help;
}
.discord-link {
  background: var(--color-brand);
  color: var(--color-brand-muted);
}

@media (max-width: 760px) {
  .site-header {
    gap: 0;
    min-height: 3.75rem;
    padding: 0.8rem 1rem;
  }
  .menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 2.25rem;
    height: 2.25rem;
    color: var(--color-brand);
    font-size: 1.1rem;
    background: transparent;
    border: 1px solid var(--color-brand);
    border-radius: 0.19rem;
  }
  .main-nav {
    display: none;
    flex-direction: column;
    gap: 0;
    left: 0;
    padding: 0.5rem 1rem 0.8rem;
    width: 100%;
  }
  .main-nav a {
    border-bottom: 1px solid var(--color-line-soft);
    padding: 0.8rem 0;
  }
  .header-panel {
    display: none;
    background: color-mix(in srgb, var(--color-header) 96%, transparent);
    flex-direction: column;
    left: 0;
    position: absolute;
    top: 100%;
    width: 100%;
  }
  .header-panel.open,
  .header-panel.open .main-nav {
    display: flex;
  }
  .header-links {
    display: none;
  }
}

@media (min-width: 761px) {
  .menu-toggle {
    display: none;
  }
}
</style>
