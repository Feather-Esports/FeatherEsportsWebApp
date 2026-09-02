<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import type { AccordionItem } from "@/data/site";

defineProps<{ items: AccordionItem[]; numbered?: boolean; openItem: string | null }>();
const emit = defineEmits<{ toggle: [label: string] }>();
const { t } = useI18n();
</script>

<template>
  <div class="accordion-list" :class="{ numbered }">
    <button
      v-for="(item, index) in items"
      :key="item.label"
      class="accordion-row"
      :class="item.color"
      :aria-expanded="openItem === item.label"
      @click="emit('toggle', item.label)"
    >
      <span v-if="numbered" class="row-number">0{{ index + 1 }}</span
      ><Icon v-else icon="pixel:globe-solid" /><strong>{{ t(item.label) }}</strong
      ><Icon class="plus" :icon="openItem === item.label ? 'pixel:minus' : 'pixel:plus'" /><span
        v-if="openItem === item.label"
        class="accordion-detail"
        >{{ t(item.detail) }}</span
      >
    </button>
  </div>
</template>

<style scoped>
.accordion-list {
  border-top: 1px solid var(--color-line);
}
.accordion-list:not(.numbered) {
  border: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.accordion-list:not(.numbered) .accordion-row {
  align-content: start;
  border: 1px solid var(--color-line);
  grid-template-columns: 1rem 1fr 1rem;
  min-height: 9rem;
}
.accordion-row {
  align-items: center;
  background: var(--color-panel);
  border: 0;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-text);
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
.accordion-row:hover {
  background: var(--color-panel-hover);
}
.accordion-row > svg:first-child {
  color: var(--color-accent);
}
.plus {
  color: var(--color-text-muted);
}
.row-number {
  color: var(--color-number);
  font-size: 0.55rem;
}
.accordion-detail {
  color: var(--color-text-muted);
  font-size: 0.58rem;
  grid-column: 2 / 3;
  line-height: 1.6;
}
.numbered .accordion-row {
  grid-template-columns: 1.1rem 1fr 1.25rem;
}
@media (max-width: 760px) {
  .accordion-list:not(.numbered) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
