<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import type { AccordionItem } from "@/data/site";

defineProps<{ items: AccordionItem[]; openItem: string | null }>();
const emit = defineEmits<{ toggle: [label: string] }>();
const { t } = useI18n();
</script>

<template>
  <div class="faq-section">
    <button
      v-for="(item, index) in items"
      :key="item.label"
      class="faq-row"
      :aria-expanded="openItem === item.label"
      @click="emit('toggle', item.label)"
    >
      <span class="faq-number">0{{ index + 1 }}</span>
      <strong>{{ t(item.label) }}</strong>
      <Icon class="faq-toggle" :icon="openItem === item.label ? 'pixel:minus' : 'pixel:plus'" />
      <span v-if="openItem === item.label" class="faq-detail">{{ t(item.detail) }}</span>
    </button>
  </div>
</template>

<style scoped>
.faq-section {
  border-top: 1px solid var(--color-line);
}
.faq-row {
  align-items: center;
  background: var(--color-panel);
  border: 0;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-title);
  cursor: pointer;
  display: grid;
  font: inherit;
  font-size: 0.65rem;
  gap: 1rem;
  grid-template-columns: 1.1rem 1fr 1.25rem;
  min-height: 3rem;
  padding: 0.9rem 1rem;
  text-align: left;
  width: 100%;
}
.faq-row:hover {
  background: var(--color-panel-hover);
}
.faq-number {
  color: var(--color-number);
  font-size: 0.55rem;
}
.faq-toggle {
  color: var(--color-text);
}
.faq-detail {
  color: var(--color-text);
  font-size: 0.58rem;
  grid-column: 2 / 3;
  line-height: 1.6;
}
</style>
