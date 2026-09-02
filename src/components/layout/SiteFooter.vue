<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer>
    <a class="wordmark" href="#top" :aria-label="t('footer.homeLabel')"
      ><Icon icon="pixel:star-solid" /><span>Feather</span></a
    ><span class="footer-divider">//</span><a href="#community">{{ t("footer.legal") }}</a>
  </footer>
</template>

<style scoped>
footer {
  align-items: center;
  border-top: 1px solid var(--color-line);
  color: var(--color-text-muted);
  display: flex;
  font-size: 0.6rem;
  gap: 1rem;
  justify-content: center;
  margin-top: auto;
  padding: 1.8rem;
}
.wordmark {
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.footer-divider {
  color: var(--color-accent);
}
</style>
