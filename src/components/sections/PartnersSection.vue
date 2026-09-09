<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { partners } from "@/data/site";
import { ref } from "vue";

const copiedCode = ref<string | null>(null);

function openPartner(link: string): void {
  if (!link) {
    return;
  }

  if (link.startsWith("mailto:")) {
    window.location.href = link;
    return;
  }

  window.open(link, "_blank", "noopener,noreferrer");
}

async function copyCode(code: string): Promise<void> {
  if (!code) {
    return;
  }

  try {
    await navigator.clipboard.writeText(code);
    copiedCode.value = code;

    window.setTimeout(() => {
      if (copiedCode.value === code) {
        copiedCode.value = null;
      }
    }, 1500);
  } catch {
    copiedCode.value = null;
  }
}

const partnerLogos = import.meta.glob("@/assets/images/partners/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
</script>

<template>
  <div class="partners-grid">
    <article
      v-for="partner in partners"
      :key="partner.id"
      class="partner-card"
      :class="{ 'is-cta': partner.id === 'cta' }"
      role="link"
      tabindex="0"
      @click="openPartner(partner.link)"
      @keydown.enter.prevent="openPartner(partner.link)"
      @keydown.space.prevent="openPartner(partner.link)"
    >
      <div class="partner-header">
        <img
          v-if="partner.id !== 'cta'"
          class="partner-logo"
          :src="partnerLogos[`/src/assets/images/partners/${partner.id}.webp`]"
          :alt="partner.id"
          draggable="false"
        />
        <div class="partner-name">
          {{ partner.label }}
        </div>
        <Icon
          class="partner-icon"
          :icon="partner.id === 'cta' ? 'pixel:plus' : 'pixel:external-link'"
        />
      </div>

      <p class="partner-description">{{ partner.description }}</p>

      <button
        v-if="partner.code"
        type="button"
        class="partner-code"
        @click.stop="copyCode(partner.code)"
        :aria-label="`Copy affiliate code for ${partner.id}`"
      >
        <span class="code-content">
          <Icon class="code-icon" icon="pixel:copy" />
          <span>{{ copiedCode === partner.code ? "Copied" : partner.code }}</span>
        </span>
      </button>
    </article>
  </div>
</template>

<style scoped>
.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.63rem;
  margin-top: 0.9rem;
}

.partner-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 10.63rem;
  gap: 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: 0.19rem;
  background: var(--color-bg);
  padding: 1rem;
  cursor: pointer;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: color-mix(in srgb, var(--color-brand) 55%, var(--color-line));
    background: color-mix(in srgb, var(--color-brand) 6%, var(--color-bg));
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-brand) 15%, transparent);
  }
}
.partner-card.is-cta {
  border-style: dashed;
}

.partner-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.partner-logo {
  height: 1.38rem;
  width: auto;
}
.partner-name {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.1;
  color: var(--color-title);
  text-transform: uppercase;
}
.partner-icon {
  justify-self: end;
  margin-left: auto;
  font-size: 1.13rem;
  color: var(--color-title);
}

.partner-description {
  flex: 1;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text);
}

.partner-code {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid var(--color-line);
  border-radius: 0.25rem;
  background: var(--color-panel);
  color: var(--color-text);
  padding: 0.6rem 0.85rem;
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease;

  &:hover {
    color: var(--color-title);
    border-color: color-mix(in srgb, var(--color-brand) 60%, var(--color-line));
    background: color-mix(in srgb, var(--color-brand) 10%, rgba(255, 255, 255, 0.02));
  }
}

.code-content {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.76rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: left;
}

.code-icon {
  font-size: 0.9rem;
  color: var(--color-text);
  transition: color 160ms ease;
}
.partner-code:hover .code-icon {
  color: var(--color-brand);
}

@media (max-width: 760px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }

  .partner-card {
    min-height: 15rem;
  }
}
</style>
