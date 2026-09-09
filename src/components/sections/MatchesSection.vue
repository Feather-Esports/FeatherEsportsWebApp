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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
  min-height: 12rem;
  gap: 0.94rem;
  border-radius: 0.19rem;
  text-align: center;
  background: var(--color-bg);
  border: 1px dashed var(--color-line);
}
.matches-section svg {
  font-size: 1.5rem;
  color: var(--color-brand);
}
.matches-section p {
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 1.13rem;
  color: var(--color-title);
  text-transform: uppercase;
}
.matches-section span {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--color-text);
}
</style>
