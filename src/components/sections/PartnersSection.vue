<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { useClipboard } from "@vueuse/core"

import { partners, type Partner } from "@/data/site"

const { copy, copied, text: copiedText } = useClipboard({ copiedDuring: 1500 })

const partnerLogos = import.meta.glob<string>("@/assets/images/partners/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
})

function getPartnerLogo(partnerId: string): string | undefined {
  return partnerLogos[`/src/assets/images/partners/${partnerId}.webp`]
}

function handleCopy(code: string): void {
  if (code) copy(code)
}
</script>

<template>
  <div class="partners-grid">
    <article v-for="partner in partners as Partner[]" :key="partner.id" class="partner-card" :class="{ 'is-cta': partner.id === 'cta' }">
      <a :href="partner.link" target="_blank" rel="noopener noreferrer" class="partner-link-overlay" :aria-label="partner.label" />

      <div class="partner-header">
        <img v-if="partner.id !== 'cta'" class="partner-logo" :src="getPartnerLogo(partner.id)" :alt="partner.label" draggable="false" />
        <div class="partner-name">
          {{ partner.label }}
        </div>
        <Icon class="partner-icon" :icon="partner.id === 'cta' ? 'pixel:plus' : 'pixel:external-link'" />
      </div>

      <p class="partner-description">{{ partner.description }}</p>

      <button v-if="partner.code" type="button" class="partner-code" :aria-label="`Copy affiliate code for ${partner.label}`" @click="handleCopy(partner.code)">
        <span class="code-content">
          <Icon class="code-icon" icon="pixel:copy" />
          <span>{{ copied && copiedText === partner.code ? "Copied" : partner.code }}</span>
        </span>
      </button>
    </article>
  </div>
</template>

<style scoped>
.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 0.9rem;
  gap: 0.63rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.partner-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  min-height: 10.63rem;
  padding: 1rem;
  border-radius: 0.19rem;
  cursor: pointer;
  transition:
    border-color 180ms ease,
    background-color 180ms ease;

  &.is-cta {
    border-style: dashed;
  }

  @media (hover: hover) {
    &:hover {
      background: color-mix(in srgb, var(--color-brand) 6%, var(--color-bg));
      border-color: color-mix(in srgb, var(--color-brand) 55%, var(--color-line));
    }
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 0.875rem;
  }
}

.partner-link-overlay {
  z-index: 1;
  position: absolute;
  inset: 0;
}

.partner-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.partner-logo {
  width: auto;
  max-width: 5rem;
  height: 1.38rem;
  object-fit: contain;
  flex-shrink: 0;
}

.partner-name {
  font-family: var(--font-title);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-title);
  overflow: hidden;

  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
}

.partner-icon {
  margin-left: auto;
  font-size: 1.13rem;
  color: var(--color-title);
  flex-shrink: 0;
}

.partner-description {
  flex: 1;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text);
}

.partner-code {
  z-index: 2;
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--color-text);
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem 0.85rem;
  border-radius: 0.25rem;
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease;

  & .code-icon {
    font-size: 0.9rem;
    color: var(--color-text);
    flex-shrink: 0;
    transition: color 160ms ease;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--color-title);
      border-color: color-mix(in srgb, var(--color-brand) 60%, var(--color-line));
      background: color-mix(in srgb, var(--color-brand) 10%, rgba(255, 255, 255, 0.02));

      & .code-icon {
        color: var(--color-brand);
      }
    }
  }

  &:focus-visible {
    outline-offset: 2px;
  }
}

.code-content {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: left;
  text-transform: uppercase;
}
</style>
