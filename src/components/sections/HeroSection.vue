<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { socialLinks, discordLink } from "@/data/site";

const { t } = useI18n();

const subtitleParts = computed(() => t("hero.subtitle").split("/"));
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-content">
      <h1 id="hero-title">{{ t("hero.title") }}</h1>

      <p class="hero-subtitle">
        <template v-for="(part, index) in subtitleParts" :key="`${part}-${index}`">
          <span v-if="index" class="subtitle-divider">/</span>
          {{ part }}
        </template>
      </p>

      <p class="hero-description">{{ t("hero.description") }}</p>

      <a class="hero-cta" :href="discordLink.href" target="_blank" rel="noreferrer">
        <Icon :icon="discordLink.icon" width="2rem" />
        {{ t("hero.cta") }}
      </a>

      <div class="social-links" aria-label="Social links">
        <a
          v-for="social in socialLinks"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noreferrer"
        >
          <Icon :icon="social.icon" width="1.175rem" />
          {{ social.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100svh;
  text-align: center;
  contain: paint layout;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    -webkit-mask: linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%);
    mask: linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%);
    background:
      linear-gradient(
        to bottom,
        color-mix(in srgb, var(--color-bg) 0%, transparent) 0%,
        color-mix(in srgb, var(--color-bg) 15%, transparent) 50%,
        color-mix(in srgb, var(--color-bg) 75%, transparent) 75%,
        color-mix(in srgb, var(--color-bg) 100%, transparent) 100%
      ),
      image-set(
          url("@/assets/images/background/hero_banner.avif") type("image/avif"),
          url("@/assets/images/background/hero_banner.webp") type("image/webp")
        )
        center / cover no-repeat;
  }
}

.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  padding: 2rem 1.25rem;
}

.hero h1 {
  color: var(--color-brand);
  font-family: var(--font-brand);
  font-size: clamp(3.2rem, 12vw, 6.25rem);
  line-height: 1.05;
  text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  text-transform: uppercase;
  word-break: break-word;
}
.hero-subtitle {
  color: var(--color-title);
  font-family: var(--font-accent);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.11em;
  word-spacing: -0.2em;

  .subtitle-divider {
    color: var(--color-brand);
    margin: 0 0.5rem;
  }
}
.hero-description {
  max-width: 37.56rem;
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.75em;
}

.hero-cta {
  overflow: hidden;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  height: 2.85rem;
  padding: 0 1.25rem;
  color: var(--color-brand-muted);
  font-family: var(--font-title);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  gap: 0.5rem;
  border-radius: 0.28rem;
  background: var(--color-brand);
  text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  box-shadow: 0 0.25rem 0.75rem color-mix(in srgb, var(--color-brand) 20%, transparent);
  transition:
    transform 250ms ease,
    box-shadow 250ms ease,
    filter 250ms ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      color-mix(in srgb, #fff 35%, transparent),
      transparent
    );
    transition: left 550ms ease-in-out;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.4rem 1.25rem color-mix(in srgb, var(--color-brand) 40%, transparent);
    filter: brightness(1.08);

    &::before {
      left: 140%;
    }
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 0.2rem 0.5rem color-mix(in srgb, var(--color-brand) 30%, transparent);
  }
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 2.5rem;
  width: 100%;
  max-width: 32rem;
}
.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  color: var(--color-title);
  font-family: var(--font-title);
  font-size: 0.85rem;
  font-weight: 500;
  gap: 0.4rem;
  padding: 0 1rem;
  border: 0.15rem solid var(--color-line-soft);
  border-radius: 0.2rem;
  text-transform: uppercase;
  transition:
    background-color 250ms ease,
    border-color 250ms ease,
    color 250ms ease,
    text-shadow 250ms ease,
    transform 250ms ease;

  &:hover {
    background: var(--color-title);
    border-color: var(--color-title);
    color: var(--color-line);
    text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-title) 25%, transparent);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
}

@supports (-moz-appearance: none) {
  .hero-cta,
  .hero-cta svg {
    will-change: transform;
    transform: translateZ(0);
  }

  .social-links a,
  .social-links a svg {
    will-change: transform;
    transform: translateZ(0);
  }
}

@media (min-width: 1921px), (min-height: 1081px) {
  .hero-content {
    gap: 1.5rem;
  }
  .hero h1 {
    font-size: 7.5rem;
    text-shadow: 0 0 1.5rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  }
  .hero-subtitle {
    font-size: 1.32rem;
  }
  .hero-description {
    font-size: 1.2rem;
    max-width: 45.07rem;
  }
  .hero-cta {
    height: 3.3rem;
    font-size: 1.2rem;
    padding: 0 1.1rem;
  }
  .social-links {
    margin-top: 4.2rem;
    max-width: 50rem;
  }
  .social-links a {
    height: 3.24rem;
    font-size: 0.96rem;
  }
}

@media (max-width: 760px) {
  .hero-content {
    gap: 1rem;
  }
  .hero h1 {
    font-size: clamp(2.5rem, 12vw, 3.8rem);
  }
  .hero-subtitle {
    font-size: clamp(0.8rem, 3.5vw, 0.95rem);
    letter-spacing: 0.05em;
  }
  .hero-description {
    font-size: 0.925rem;
    line-height: 1.6;
    max-width: 27rem;
  }
  .hero-cta {
    font-size: 0.9rem;
    height: 2.75rem;
    width: 100%;
    max-width: 18rem;
  }
  .social-links {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  .social-links a {
    font-size: 0.75rem;
    height: 2.75rem;
    padding: 0 0.75rem;
    flex: 1 1 calc(50% - 0.5rem);
    max-width: 12rem;
  }
}

@media (max-height: 650px) {
  .hero {
    min-height: auto;
    padding: 3rem 0;
  }
  .social-links {
    margin-top: 1.25rem;
  }
}
</style>
