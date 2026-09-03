<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer>
    <a class="wordmark" href="#home" :aria-label="t('footer.label')"
      ><Icon icon="game-icons:feather" /><span>Feather</span></a
    ><span class="footer-divider">//</span><a class="legal" href="#home">{{ t("footer.legal") }}</a>
  </footer>
</template>

<style scoped>
footer {
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  gap: 1.188rem;
  padding: 1.5rem;
  background: var(--color-bg);
  border-top: 1px solid var(--color-line);
}
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.438rem;
  color: var(--color-brand);
  font-family: var(--font-brand);
  font-size: 1.593rem;
  text-transform: uppercase;
}
.footer-divider {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
}
.legal {
  font-family: var(--font-title);
  color: var(--color-text);
  font-size: 0.9rem;
  letter-spacing: -0.03em;
}
</style>
