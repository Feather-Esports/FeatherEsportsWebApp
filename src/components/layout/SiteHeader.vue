<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { useI18n } from "vue-i18n"

import { discordLink } from "@/data/site"
import { scrollToSection } from "@/lib/lenis"

const { t } = useI18n()

interface NavigationItem {
  readonly id: string
  readonly label: string
}

const menuOpen = ref<boolean>(false)

const navigation: readonly NavigationItem[] = [
  { id: "teams", label: "header.nav.teams" },
  { id: "faq", label: "header.nav.faq" },
  { id: "matches", label: "header.nav.matches" },
  { id: "partners", label: "header.nav.partners" },
  { id: "staff", label: "header.nav.staff" },
]

const menuLabel = computed<string>(() => (menuOpen.value ? "Close menu" : "Open menu"))

function handleMenuToggle(): void {
  menuOpen.value = !menuOpen.value
}

function handleNavSelect(event: MouseEvent): void {
  const target = event.currentTarget as HTMLAnchorElement | null
  const href = target?.getAttribute("href")
  const sectionId = href?.replace(/^#/, "")

  menuOpen.value = false

  if (!sectionId) return

  event.preventDefault()
  scrollToSection(sectionId, { offset: 72, duration: 1.1 })
}
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="/">
      <Icon icon="game-icons:feather" />
      <span>Feather</span>
    </a>

    <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="site-navigation" :aria-label="menuLabel" @click="handleMenuToggle">
      <span class="hamburger">
        <span class="bar top"></span>
        <span class="bar bottom"></span>
      </span>
    </button>

    <div class="header-panel" :class="{ open: menuOpen }">
      <nav id="site-navigation" class="main-nav" aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.id" :href="`#${item.id}`" @click="handleNavSelect">
          {{ t(item.label) }}
        </a>
      </nav>

      <div class="header-links">
        <Tooltip id="wip-tooltip" class="desktop-only-tooltip">
          <template #trigger>
            <div class="wip-indicator">
              <Icon icon="pixel:exclaimation-solid" />
              {{ t("header.wip") }}
            </div>
          </template>
          <strong>{{ t("header.wipTooltip.title") }}</strong>
          <p>{{ t("header.wipTooltip.description") }}</p>
        </Tooltip>

        <div class="wip-indicator mobile-only-wip">
          <Icon icon="pixel:exclaimation-solid" />
          {{ t("header.wip") }}
        </div>

        <a class="discord-link" :href="discordLink.href" target="_blank" rel="noopener noreferrer">
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
  height: 3.75rem;
  padding: 0 clamp(1.25rem, 5vw, 1.563rem);

  @media (max-width: 760px) {
    gap: 0;
    background: var(--color-bg);
    padding: 0 1.25rem;
  }
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-brand);
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-brand);

  svg {
    font-size: 2.25rem;
  }

  @media (max-width: 760px) {
    font-size: 1.75rem;

    svg {
      font-size: 2.4rem;
    }
  }
}

.menu-toggle {
  display: none;

  @media (max-width: 760px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    background: transparent;
    border: 1px solid var(--color-brand);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.19rem;

    .hamburger {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 1.125rem;
      height: 0.7rem;
    }

    .bar {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--color-brand);
      transform-origin: center;
      transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    &[aria-expanded="true"] {
      .bar.top {
        transform: translateY(4.5px) rotate(45deg);
      }
      .bar.bottom {
        transform: translateY(-4.5px) rotate(-45deg);
      }
    }
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
    gap: 1.25rem;
    background: var(--color-bg);
    border-top: 1px solid var(--color-line);
    border-bottom: 1px solid var(--color-line);
    width: 100%;
    padding: 1.25rem;

    &.open {
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
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.9rem;
    width: 100%;

    & a {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-line-soft, rgba(255, 255, 255, 0.08));
      min-height: 2.75rem;
      padding: 0.75rem 0.25rem;

      &::after {
        display: none;
      }
    }
  }
}

.header-links {
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 760px) {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    padding-top: 0.75rem;

    .mobile-only-wip {
      flex: 0 0 20%;
      justify-content: center;
      height: 2.5rem;
      cursor: default;
    }

    .discord-link {
      flex: 1;
      justify-content: center;
      height: 2.5rem;
    }
  }
}

.mobile-only-wip {
  display: none !important;

  @media (max-width: 760px) {
    display: inline-flex !important;
  }
}

.desktop-only-tooltip {
  display: inline-flex;

  @media (max-width: 760px) {
    display: none !important;
  }
}

.wip-indicator,
.discord-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-title);
  font-size: 0.69rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-title);
  height: 2rem;
  padding: 0 0.75rem;
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
