<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="matches-section">
    <Icon icon="pixel:calendar-alt-solid" />
    <p>{{ t("matches.empty") }}</p>
    <span>{{ t("matches.hint") }}</span>
  </div>
</template>

<style scoped>
.matches-section {
  align-items: center;
  border: 1px solid var(--color-line);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  min-height: 10rem;
  padding: 2.5rem 1rem;
  text-align: center;
}
.matches-section svg {
  color: var(--color-brand);
}
.matches-section p {
  color: var(--color-title);
  font-family: var(--font-title);
  font-size: 1.1rem;
  text-transform: uppercase;
}
.matches-section span {
  font-size: 0.58rem;
}
</style>
