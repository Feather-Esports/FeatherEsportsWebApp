<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { socialLinks } from "@/data/site";

const { t } = useI18n();
</script>

<template>
  <section id="home" class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title">{{ t("hero.title") }}</h1>
    <p class="hero-subtitle">{{ t("hero.subtitle") }}</p>
    <p class="hero-description">{{ t("hero.description") }}</p>
    <a class="hero-cta" href="#community"
      ><Icon icon="pixel:discord" /> {{ t("actions.discord") }}</a
    >
    <div id="community" class="social-links" aria-label="Social links">
      <a
        v-for="social in socialLinks"
        :key="social.label"
        :href="social.href"
        target="_blank"
        rel="noreferrer"
      >
        <Icon :icon="social.icon" /> {{ social.label }}</a
      >
    </div>
  </section>
</template>

<style scoped>
.hero {
  align-items: center;
  background:
    linear-gradient(
      to bottom,
      rgba(9, 9, 11, 0.08) 0%,
      rgba(9, 9, 11, 0.12) 48%,
      rgba(9, 9, 11, 0.78) 82%,
      var(--color-ink) 100%
    ),
    url("@/assets/images/feather_banner_bg.png") center / cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: calc(50% - 50vw);
  min-height: 100svh;
  padding: 8rem 1rem 6rem;
  text-align: center;
  width: 100vw;
}
.eyebrow,
.card-kicker {
  color: var(--color-text-muted);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.hero h1 {
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5.8rem);
  line-height: 1;
  margin: 1rem 0;
  text-transform: uppercase;
}
.hero-subtitle {
  color: var(--color-text);
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}
.hero-description {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  line-height: 1.65;
  margin: 1.4rem auto 1.6rem;
  max-width: 39rem;
}
.hero-subtitle span {
  color: var(--color-accent);
  margin: 0 0.7rem;
}
.hero-cta {
  align-items: center;
  background: var(--color-accent);
  color: var(--color-ink);
  display: inline-flex;
  font-size: 0.63rem;
  gap: 0.45rem;
  padding: 0.8rem 1.1rem;
  text-transform: uppercase;
}
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 3.5rem;
}
.social-links a {
  align-items: center;
  border: 1px solid var(--color-line);
  display: inline-flex;
  font-size: 0.6rem;
  gap: 0.35rem;
  padding: 0.55rem 0.7rem;
  text-transform: uppercase;
}
.social-links a:hover {
  background: var(--color-panel-hover);
  border-color: var(--color-text);
  color: var(--color-text);
}
@media (max-width: 760px) {
  .hero {
    padding: 7rem 1rem 4rem;
  }
  .hero h1 {
    font-size: 2.3rem;
  }
  .hero-description {
    max-width: 26rem;
  }
}
</style>
