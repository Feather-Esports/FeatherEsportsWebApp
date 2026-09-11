<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { Icon } from "@iconify/vue"

const { t } = useI18n()
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
  gap: 0.94rem;
  text-align: center;
  background: var(--color-bg);
  border: 1px dashed var(--color-line);
  min-height: 12rem;
  padding: 1.5rem 1rem;
  border-radius: 0.19rem;

  & svg {
    font-size: 1.5rem;
    color: var(--color-brand);
    flex-shrink: 0;

    @media (max-width: 640px) {
      font-size: 1.35rem;
    }
  }

  & p {
    margin: 0;
    font-family: var(--font-title);
    font-size: 1.13rem;
    font-weight: 600;
    line-height: 1.3;
    word-break: break-word;
    text-transform: uppercase;
    color: var(--color-title);

    @media (max-width: 640px) {
      font-size: 1rem;
    }
  }

  & span {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.4;
    word-break: break-word;
    color: var(--color-text);
    max-width: 28rem;

    @media (max-width: 640px) {
      font-size: 0.825rem;
    }
  }
}
</style>
