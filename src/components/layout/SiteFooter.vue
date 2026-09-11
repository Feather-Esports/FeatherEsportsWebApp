<script setup lang="ts">
import { useUiStore } from "@/stores/ui"
import { Icon } from "@iconify/vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const uiStore = useUiStore()
</script>

<template>
  <footer>
    <a class="wordmark" href="/" :aria-label="t('footer.label')">
      <Icon icon="game-icons:feather" />
      <span>Feather</span>
    </a>
    <span class="footer-divider">//</span>
    <a class="contact" href="mailto:fthr.esports@gmail.com">
      {{ t("footer.contact") }}
    </a>
    <span class="footer-divider">//</span>
    <button type="button" class="legal" @click="uiStore.openLegalModal()">
      {{ t("footer.legal") }}
    </button>
  </footer>
</template>

<style scoped>
footer {
  z-index: 2;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  gap: 1.188rem;
  background: var(--color-bg);
  border-top: 1px solid var(--color-line);
  padding: 1.5rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
    padding: 1rem;
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
  transition: opacity 150ms ease-in-out;

  svg {
    font-size: 2.13rem;
  }

  @media (hover: hover) {
    &:hover {
      opacity: 0.85;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
    border-radius: 0.15rem;
  }

  @media (max-width: 640px) {
    font-size: 1.35rem;
  }
}

.footer-divider {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-muted);
  pointer-events: none;
  user-select: none;
}

.contact,
.legal {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--color-text);
  background: transparent;
  border: 0;
  transition: color 150ms ease-in-out;

  @media (hover: hover) {
    &:hover {
      color: var(--color-title);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
    border-radius: 0.15rem;
  }

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
}
</style>
