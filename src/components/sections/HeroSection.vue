<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { Icon } from "@iconify/vue"

import { socialLinks, discordLink, type SocialLink } from "@/data/site"

const { t } = useI18n()

const subtitleParts = computed<string[]>(() =>
  t("hero.subtitle")
    .split("/")
    .map(part => part.trim()),
)
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-content">
      <h1 id="hero-title">{{ t("hero.title") }}</h1>

      <p class="hero-subtitle">
        <template v-for="(part, index) in subtitleParts" :key="part">
          <span v-if="index > 0" class="subtitle-divider" aria-hidden="true">/</span>
          <span>{{ part }}</span>
        </template>
      </p>

      <p class="hero-description">{{ t("hero.description") }}</p>

      <a class="hero-cta" :href="discordLink.href" target="_blank" rel="noopener noreferrer">
        <Icon :icon="discordLink.icon" />
        <span>{{ t("hero.cta") }}</span>
      </a>

      <nav class="social-links" :aria-label="t('hero.socialsLabel')">
        <a v-for="social in socialLinks as SocialLink[]" :key="social.label" :href="social.href" target="_blank" rel="noopener noreferrer" :aria-label="social.label">
          <Icon :icon="social.icon" />
          <span>{{ social.label }}</span>
        </a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  min-height: 100svh;
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
      image-set(url("@/assets/images/background/hero_banner.avif") type("image/avif"), url("@/assets/images/background/hero_banner.webp") type("image/webp")) center / cover
        no-repeat;
  }

  @media (max-height: 650px) {
    min-height: auto;
    padding: 3rem 0;
  }
}

.hero-content {
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  padding: 2rem 1.25rem;

  @media (min-width: 1921px), (min-height: 1081px) {
    gap: 1.5rem;
  }

  @media (max-width: 760px) {
    gap: 1rem;
  }
}

h1 {
  font-family: var(--font-brand);
  font-size: clamp(3.2rem, 12vw, 6.25rem);
  font-weight: 500;
  text-transform: uppercase;
  word-break: break-word;
  text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  color: var(--color-brand);

  @media (min-width: 1921px), (min-height: 1081px) {
    font-size: 7.5rem;
    text-shadow: 0 0 1.5rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  }

  @media (max-width: 760px) {
    font-size: clamp(2.5rem, 12vw, 3.8rem);
  }
}

.hero-subtitle {
  font-family: var(--font-accent);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.11em;
  word-spacing: -0.2em;
  color: var(--color-title);

  & .subtitle-divider {
    color: var(--color-brand);
    margin: 0 0.5rem;
  }

  @media (min-width: 1921px), (min-height: 1081px) {
    font-size: 1.32rem;
  }

  @media (max-width: 760px) {
    font-size: clamp(0.8rem, 3.5vw, 0.95rem);
    letter-spacing: 0.05em;
  }
}

.hero-description {
  font-size: 1rem;
  line-height: 1.75em;
  color: var(--color-text);
  max-width: 37.56rem;

  @media (min-width: 1921px), (min-height: 1081px) {
    font-size: 1.2rem;
    max-width: 45.07rem;
  }

  @media (max-width: 760px) {
    font-size: 0.925rem;
    line-height: 1.6;
    max-width: 27rem;
  }
}

.hero-cta {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  gap: 0.5rem;
  font-family: var(--font-title);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-brand) 25%, transparent);
  color: var(--color-brand-muted);
  background: var(--color-brand);
  box-shadow: 0 0.25rem 0.75rem color-mix(in srgb, var(--color-brand) 20%, transparent);
  height: 2.85rem;
  padding: 0 1.25rem;
  border-radius: 0.28rem;
  overflow: hidden;
  transition:
    transform 250ms ease,
    box-shadow 250ms ease,
    filter 250ms ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    background: linear-gradient(120deg, transparent, color-mix(in srgb, #fff 35%, transparent), transparent);
    width: 60%;
    height: 100%;
    pointer-events: none;
    transition: left 550ms ease-in-out;
  }

  svg {
    font-size: 2rem;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0.4rem 1.25rem color-mix(in srgb, var(--color-brand) 40%, transparent);
      filter: brightness(1.08);

      &::before {
        left: 140%;
      }
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0.2rem 0.5rem color-mix(in srgb, var(--color-brand) 30%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--color-title);
    outline-offset: 3px;
  }

  @media (min-width: 1921px), (min-height: 1081px) {
    font-size: 1.2rem;
    height: 3.3rem;
    padding: 0 1.1rem;
  }

  @media (max-width: 760px) {
    font-size: 0.9rem;
    width: 100%;
    max-width: 18rem;
    height: 2.75rem;
  }
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 0.6rem;
  width: 100%;
  max-width: 32rem;

  & a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-title);
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--color-title);
    border: 0.15rem solid var(--color-line-soft);
    height: 2.75rem;
    padding: 0 1rem;
    border-radius: 0.2rem;
    transition:
      background-color 250ms ease,
      border-color 250ms ease,
      color 250ms ease,
      text-shadow 250ms ease,
      transform 250ms ease;

    svg {
      font-size: 1.175rem;
    }

    @media (hover: hover) {
      &:hover {
        transform: translateY(-2px);
        color: var(--color-line);
        text-shadow: 0 0 1.25rem color-mix(in srgb, var(--color-title) 25%, transparent);
        background: var(--color-title);
        border-color: var(--color-title);
      }
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 2px solid var(--color-brand);
      outline-offset: 2px;
    }

    @media (min-width: 1921px), (min-height: 1081px) {
      font-size: 0.96rem;
      height: 3.24rem;
    }

    @media (max-width: 760px) {
      flex: 1 1 calc(50% - 0.5rem);
      font-size: 0.75rem;
      max-width: 12rem;
      height: 2.75rem;
      padding: 0 0.75rem;
    }
  }

  @media (min-width: 1921px), (min-height: 1081px) {
    margin-top: 4.2rem;
    max-width: 50rem;
  }

  @media (max-width: 760px) {
    margin-top: 1.5rem;
    gap: 0.5rem;
  }

  @media (max-height: 650px) {
    margin-top: 1.25rem;
  }
}

@supports (-moz-appearance: none) {
  .hero-cta,
  .hero-cta svg,
  .social-links a,
  .social-links a svg {
    transform: translateZ(0);
    will-change: transform;
  }
}
</style>
