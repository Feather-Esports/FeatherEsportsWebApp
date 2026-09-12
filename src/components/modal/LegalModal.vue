<script setup lang="ts">
import { useUiStore } from "@/stores/ui"
import { Icon } from "@iconify/vue"
import { onClickOutside, useEventListener } from "@vueuse/core"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const uiStore = useUiStore()

useEventListener("keydown", (e: KeyboardEvent) => {
  if (uiStore.legalModalOpen && e.key === "Escape") uiStore.closeLegalModal()
})

const legalModalRef = ref<HTMLElement | null>(null)
onClickOutside(legalModalRef, () => {
  if (legalModalRef.value) uiStore.closeLegalModal()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="uiStore.legalModalOpen" class="modal-backdrop">
        <div class="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" ref="legalModalRef">
          <div class="modal-header">
            <h2 id="legal-modal-title">{{ t("legal.title") }}</h2>
            <button type="button" class="close-button" :aria-label="t('legal.close')" @click="uiStore.closeLegalModal()">
              <Icon icon="pixel:times" />
            </button>
          </div>

          <div class="legal-copy">
            <p>{{ t("legal.paragraphs.1") }}</p>
            <p>{{ t("legal.paragraphs.2") }}</p>

            <ul>
              <li>{{ t("legal.list.1") }}</li>
              <li>{{ t("legal.list.2") }}</li>
              <li>{{ t("legal.list.3") }}</li>
            </ul>

            <p class="modal-contact">{{ t("legal.contact") }}: {{ t("legal.email") }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  z-index: 9999;
  position: fixed;
  display: grid;
  place-items: center;
  inset: 0;
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  padding: 1rem;
  overscroll-behavior: contain;
  touch-action: none;
}

.legal-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  box-shadow: 0 20px 48px color-mix(in srgb, var(--color-bg) 35%, transparent);
  width: min(100%, 30rem);
  max-height: calc(100dvh - 2rem);
  padding: 1.1rem;
  border-radius: 0.19rem;
  overscroll-behavior: contain;
  touch-action: pan-y;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
}

h2 {
  font-family: var(--font-title);
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-title);
}

.close-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  background: transparent;
  border: 1px solid var(--color-line);
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.19rem;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease;

  @media (hover: hover) {
    &:hover {
      background: color-mix(in srgb, var(--color-brand) 10%, transparent);
      border-color: var(--color-brand);
      color: var(--color-title);
    }
  }

  svg {
    font-size: 0.85rem;
  }
}

.legal-copy {
  font-size: 0.75rem;
  line-height: 1.7;
  color: var(--color-text);

  & p,
  & ul {
    margin: 0 0 0.75rem;
  }

  & ul {
    padding-left: 1.1rem;
  }

  & li + li {
    margin-top: 0.25rem;
  }
}

.modal-contact {
  margin-bottom: 0;
  font-weight: 600;
  color: var(--color-brand);
}

.modal-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 200ms ease;

    & .legal-modal {
      transform: translateZ(0);
      will-change: transform, opacity;
      transition:
        opacity 200ms ease,
        transform 200ms ease;
    }
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;

    & .legal-modal {
      opacity: 0;
      transform: translateY(0.5rem) scale(0.98) translateZ(0);
    }
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;

    & .legal-modal {
      opacity: 1;
      transform: translateY(0) scale(1) translateZ(0);
    }
  }
}

.legal-modal {
  transform: translateZ(0);
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .modal-fade {
    &-enter-active,
    &-leave-active,
    &-enter-active .legal-modal,
    &-leave-active .legal-modal {
      transition: none;
      will-change: auto;
    }
  }
}
</style>
