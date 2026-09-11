<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { useI18n } from "vue-i18n"

import { faqs, type FaqItem } from "@/data/site"
import { useUiStore } from "@/stores/ui"

const uiStore = useUiStore()
const { t } = useI18n()

function isOpen(label: string): boolean {
  return uiStore.openFaq === label
}

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0")
}
</script>

<template>
  <div class="faq-section">
    <div v-for="(item, index) in faqs as FaqItem[]" :key="item.label" class="faq-row">
      <button
        :id="`faq-header-${index}`"
        type="button"
        class="faq-header"
        :class="{ active: isOpen(item.label) }"
        :aria-expanded="isOpen(item.label)"
        :aria-controls="`faq-content-${index}`"
        @click="uiStore.toggleFaq(item.label)"
      >
        <span class="faq-number">
          {{ formatIndex(index) }}
        </span>
        <span class="faq-title">{{ t(item.label) }}</span>

        <Icon class="faq-toggle" icon="pixel:plus" />
      </button>

      <Transition name="expand">
        <div v-show="isOpen(item.label)" :id="`faq-content-${index}`" class="faq-expandable" role="region" :aria-labelledby="`faq-header-${index}`">
          <div class="faq-inner">
            <div class="faq-detail" v-html="t(item.detail)" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.faq-section {
  margin-top: 0.75rem;
  border: 1px solid var(--color-line);
  border-bottom: 0;
  border-radius: 0.19rem;
}

.faq-row {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-line);
}

.faq-header {
  display: grid;
  align-items: center;
  grid-template-columns: 1.1rem 1fr 1.25rem;
  gap: 1rem;
  background: transparent;
  border: none;
  width: 100%;
  min-height: 3rem;
  padding: 0.9rem 1rem;
  transition:
    background-color 150ms ease,
    color 150ms ease;

  @media (hover: hover) {
    &:hover {
      background: color-mix(in srgb, var(--color-brand) 10%, transparent);
    }
  }

  &.active {
    background: color-mix(in srgb, var(--color-brand) 10%, transparent);

    & .faq-number {
      color: var(--color-brand);
    }

    & .faq-title {
      color: var(--color-title);
    }

    & .faq-toggle {
      color: var(--color-brand);
      transform: rotate(45deg);
    }
  }

  &:focus-visible {
    outline-offset: -2px;
  }
}

.faq-number {
  font-family: var(--font-accent);
  font-size: 0.7rem;
  color: var(--color-text-muted);
  transition: color 150ms ease;
}

.faq-title {
  font-family: var(--font-title);
  font-size: 0.7rem;
  font-weight: 500;
  text-align: left;
  color: var(--color-text);
  transition: color 150ms ease;
}

.faq-toggle {
  display: inline-block;
  justify-self: end;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  transform-origin: center;
  transition:
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
    color 150ms ease;
}

.faq-expandable {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 250ms ease;
}

.faq-inner {
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  grid-template-rows: 0fr;
}

.faq-detail {
  font-size: 0.7rem;
  line-height: 1.6;
  color: var(--color-text);
  padding: 1rem 1rem 1.2rem calc(1.1rem + 2rem);

  & :deep(p) {
    margin: 0 0 0.6rem 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  & :deep(ul) {
    margin: 0.4rem 0 0.6rem 0;
    padding-left: 1.2rem;
  }

  & :deep(li) {
    margin-bottom: 0.3rem;
  }

  & :deep(strong) {
    color: var(--color-title);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1rem 1rem;
  }
}
</style>
