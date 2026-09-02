<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { socialLinks } from "@/data/site";
import { discordLink } from "@/data/site";

const { t } = useI18n();
</script>

<template>
  <section id="home" class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title">{{ t("hero.title") }}</h1>
    <p class="hero-subtitle">
      <template v-for="(part, index) in t('hero.subtitle').split('/')" :key="index">
        <span v-if="index" class="subtitle-divider">/</span>{{ part }}
      </template>
    </p>
    <p class="hero-description">{{ t("hero.description") }}</p>
    <a class="hero-discord" :href="discordLink.href" target="_blank" rel="noreferrer"
      ><Icon :icon="discordLink.icon" width="2rem" /> {{ t("hero.discord") }}</a
    >
    <div class="social-links" aria-label="Social links">
      <a
        v-for="social in socialLinks"
        :key="social.label"
        :href="social.href"
        target="_blank"
        rel="noreferrer"
      >
        <Icon :icon="social.icon" width="1.175rem" /> {{ social.label }}</a
      >
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  padding: 8rem 1.25rem 6rem;
  margin-left: calc(50% - 50vw);
  min-height: 100svh;
  gap: 1.25rem;
  text-align: center;
  background:
    linear-gradient(
      to bottom,
      rgba(9, 9, 11, 0) 0%,
      rgba(9, 9, 11, 0.15) 50%,
      rgba(9, 9, 11, 0.75) 75%,
      var(--color-bg) 100%
    ),
    url("@/assets/images/feather_banner_bg.png") center / cover;
}
.hero h1 {
  color: var(--color-brand);
  font-family: var(--font-brand);
  font-size: 6.25rem;
  text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  text-transform: uppercase;
}
.hero-subtitle {
  color: var(--color-title);
  font-family: var(--font-accent);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.11em;
  text-transform: uppercase;

  .subtitle-divider {
    color: var(--color-brand);
    margin: 0 0.7rem;
  }
}
.hero-description {
  max-width: 37.56rem;
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.88em;
}
.hero-discord {
  display: inline-flex;
  align-items: center;
  height: 2.75rem;
  padding: 0 0.92rem;
  color: var(--color-brand-muted);
  font-family: var(--font-title);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  gap: 0.46rem;
  border-radius: 0.28rem;
  background: var(--color-brand);
  text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-brand) 25%, transparent);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 3.5rem;
}
.social-links a {
  display: inline-flex;
  align-items: center;
  height: 2.4rem;
  color: var(--color-title);
  font-family: var(--font-title);
  font-size: 0.748rem;
  font-weight: 500;
  gap: 0.27rem;
  padding: 0 0.8rem;
  border: 0.11rem solid var(--color-line);
  border-radius: 0.16rem;
  text-transform: uppercase;

  &:hover {
    background: var(--color-title);
    border-color: var(--color-title);
    color: var(--color-line);
    text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-title) 25%, transparent);
  }
}

@media (max-width: 760px) {
  .hero h1 {
    font-size: clamp(3.1rem, 11vw, 4.5rem);
  }
  .hero-subtitle {
    font-size: clamp(0.75rem, 3.2vw, 0.8rem);
    letter-spacing: 0.08em;
  }
  .hero-description {
    font-size: 0.9rem;
    line-height: 1.6;
    max-width: 27rem;
  }
  .hero-discord {
    font-size: 0.82rem;
    height: 2.5rem;
  }
  .social-links {
    width: 70%;
    gap: 0.4rem;
    margin-top: 1.8rem;
  }
  .social-links a {
    font-size: 0.7rem;
    height: 2.4rem;
    padding: 0 0.55rem;
  }
}
@media (max-height: 700px) and (min-width: 761px) {
  .hero {
    padding-bottom: 3rem;
    padding-top: 5rem;
  }
}
</style>
