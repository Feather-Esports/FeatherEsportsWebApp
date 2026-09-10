<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { discordLink } from "@/data/site";
import Tooltip from "@/components/widgets/Tooltip.vue";

type NavigationItem = {
  id: string;
  label: string;
};

const { t } = useI18n();
const menuOpen = ref(false);

const navigation: NavigationItem[] = [
  { id: "teams", label: "header.nav.teams" },
  { id: "faq", label: "header.nav.faq" },
  { id: "matches", label: "header.nav.matches" },
  { id: "partners", label: "header.nav.partners" },
  { id: "staff", label: "header.nav.staff" },
];

const menuLabel = computed(() => (menuOpen.value ? "Close menu" : "Open menu"));

function handleMenuToggle(): void {
  menuOpen.value = !menuOpen.value;
}

function handleNavSelect(): void {
  menuOpen.value = false;
}
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="/">
      <Icon icon="game-icons:feather" />
      <span>Feather</span>
    </a>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="site-navigation"
      :aria-label="menuLabel"
      @click="handleMenuToggle"
    >
      <Icon :icon="menuOpen ? 'pixel:times' : 'pixel:bars'" />
    </button>

    <div class="header-panel" :class="{ open: menuOpen }">
      <nav id="site-navigation" class="main-nav" aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.id" :href="`#${item.id}`" @click="handleNavSelect">
          {{ t(item.label) }}
        </a>
      </nav>

      <div class="header-links">
        <Tooltip id="wip-tooltip">
          <template #trigger>
            <div class="wip-indicator">
              <Icon icon="pixel:exclaimation-solid" />
              {{ t("header.wip") }}
            </div>
          </template>
          <strong>{{ t("header.wipTooltip.title") }}</strong>
          <p>{{ t("header.wipTooltip.description") }}</p>
        </Tooltip>

        <a class="discord-link" :href="discordLink.href" target="_blank" rel="noreferrer">
          <Icon :icon="discordLink.icon" />
          {{ t("header.discord") }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  z-index: 10;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  inset: 0 0 auto;
  gap: 2rem;
  background: color-mix(in srgb, var(--color-bg) 75%, transparent);
  border-bottom: 1px solid var(--color-line);
  -webkit-backdrop-filter: blur(0.75rem) saturate(1.15);
  backdrop-filter: blur(0.75rem) saturate(1.15);
  width: 100%;
  min-height: 3.75rem;
  padding: 0 clamp(1.25rem, 5vw, 1.563rem);

  @media (max-width: 760px) {
    gap: 0;
    min-height: 3.75rem;
    padding: 0.8rem 1rem;
  }
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.438rem;
  font-family: var(--font-brand);
  font-size: 1.59rem;
  text-transform: uppercase;
  color: var(--color-brand);

  svg {
    font-size: 2.13rem;
  }
}

.menu-toggle {
  display: none;

  @media (max-width: 760px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    font-size: 1.1rem;
    color: var(--color-brand);
    background: transparent;
    border: 1px solid var(--color-brand);
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.19rem;
  }
}

.header-panel {
  display: contents;

  @media (max-width: 760px) {
    position: absolute;
    display: none;
    flex-direction: column;
    left: 0;
    top: 100%;
    background: color-mix(in srgb, var(--color-header) 96%, transparent);
    width: 100%;

    &.open,
    &.open .main-nav {
      display: flex;
    }
  }
}

.main-nav {
  display: flex;
  gap: clamp(0.8rem, 2vw, 2rem);
  font-family: var(--font-title);
  font-size: 0.81rem;
  font-weight: 600;
  text-transform: uppercase;

  & a {
    position: relative;
    color: var(--color-title);
    padding: 0.313rem 0;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background: var(--color-brand);
      width: 100%;
      height: 1px;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 180ms ease;
    }

    @media (hover: hover) {
      &:hover {
        color: var(--color-brand);

        &::after {
          transform: scaleX(1);
        }
      }
    }
  }

  @media (max-width: 760px) {
    display: none;
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0.5rem 1rem 0.8rem;

    & a {
      border-bottom: 1px solid var(--color-line-soft);
      padding: 0.875rem 0;
      min-height: 2.75rem;
    }
  }
}

.header-links {
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 760px) {
    display: none;
  }
}

.wip-indicator,
.discord-link {
  display: inline-flex;
  align-items: center;
  gap: 0.313rem;
  font-family: var(--font-title);
  font-size: 0.688rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-title);
  height: 2rem;
  padding: 0 0.63rem;
  border-radius: 0.19rem;
}

.wip-indicator {
  border: 1px solid var(--color-brand);
  color: var(--color-brand);
  cursor: help;

  svg {
    font-size: 0.875rem;
  }
}

.discord-link {
  background: var(--color-brand);
  color: var(--color-brand-muted);

  svg {
    font-size: 1.375rem;
  }
}
</style>
