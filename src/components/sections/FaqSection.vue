<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useUiStore } from "@/stores/ui";
import { useI18n } from "vue-i18n";

const uiStore = useUiStore();
const { t } = useI18n();

const items = [
  { label: "faq.1.label", detail: "faq.1.detail" },
  { label: "faq.2.label", detail: "faq.2.detail" },
  { label: "faq.3.label", detail: "faq.3.detail" },
  { label: "faq.4.label", detail: "faq.4.detail" },
  { label: "faq.5.label", detail: "faq.5.detail" },
  { label: "faq.6.label", detail: "faq.6.detail" },
  { label: "faq.7.label", detail: "faq.7.detail" },
];
</script>

<template>
  <div class="faq-section">
    <div v-for="(item, index) in items" :key="item.label" class="faq-row">
      <button
        class="faq-header"
        :class="{ active: uiStore.openFaq === item.label }"
        :aria-expanded="uiStore.openFaq === item.label"
        :aria-controls="`faq-content-${index}`"
        @click="uiStore.toggleFaq(item.label)"
      >
        <span class="faq-number">
          {{ String(index + 1).padStart(2, "0") }}
        </span>
        <span class="faq-title">{{ t(item.label) }}</span>

        <Icon class="faq-toggle" icon="pixel:plus" />
      </button>

      <Transition name="expand">
        <div v-show="uiStore.openFaq === item.label" class="faq-expandable">
          <div class="faq-inner">
            <div :id="`faq-content-${index}`" class="faq-detail" v-html="t(item.detail)" />
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
  background: var(--color-bg);
}

.faq-row {
  border-bottom: 1px solid var(--color-line);
}

.faq-header {
  align-items: center;
  background: transparent;
  border: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.1rem 1fr 1.25rem;
  min-height: 3rem;
  padding: 0.9rem 1rem;
  cursor: pointer;

  transition:
    background-color 150ms ease,
    color 150ms ease;
  width: 100%;

  &:hover,
  &.active {
    background: color-mix(in srgb, var(--color-brand) 10%, transparent);
  }
}

.faq-number {
  font-family: var(--font-accent);
  color: var(--color-text-muted);
  font-size: 0.7rem;
  transition: color 150ms ease;
}
.faq-header.active .faq-number {
  color: var(--color-brand);
}

.faq-title {
  font-family: var(--font-title);
  font-weight: 500;
  font-size: 0.7rem;
  color: var(--color-text);
  text-align: left;
  transition: color 150ms ease;
}
.faq-header.active .faq-title {
  color: var(--color-title);
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
.faq-header.active .faq-toggle {
  color: var(--color-brand);
  transform: rotate(45deg);
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
  color: var(--color-text);
  font-size: 0.7rem;
  line-height: 1.6;
  padding: 1rem 1rem 1.2rem calc(1.1rem + 2rem);
}

.faq-detail :deep(p) {
  margin: 0 0 0.6rem 0;
}
.faq-detail :deep(p:last-child) {
  margin-bottom: 0;
}
.faq-detail :deep(ul) {
  margin: 0.4rem 0 0.6rem 0;
  padding-left: 1.2rem;
}
.faq-detail :deep(li) {
  margin-bottom: 0.3rem;
}
.faq-detail :deep(strong) {
  color: var(--color-title);
}
</style>
