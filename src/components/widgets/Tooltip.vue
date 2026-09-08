<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";

withDefaults(defineProps<{ id?: string }>(), { id: "tooltip" });

const visible = ref(false);
const tooltipElement = ref<HTMLElement>();
const tooltipStyle = ref<Record<string, string>>({});

function updatePosition() {
  const trigger = tooltipElement.value?.previousElementSibling;
  if (!(trigger instanceof HTMLElement) || !tooltipElement.value) return;

  const gutter = 12;
  const triggerCenter = trigger.getBoundingClientRect().left + trigger.offsetWidth / 2;
  const { width } = tooltipElement.value.getBoundingClientRect();
  const left = Math.min(
    Math.max(gutter, triggerCenter - width / 2),
    window.innerWidth - width - gutter,
  );

  tooltipStyle.value = {
    left: `${left}px`,
    top: `${trigger.getBoundingClientRect().bottom + 16}px`,
    "--pointer-left": `${triggerCenter - left}px`,
  };
}

function show() {
  visible.value = true;
  void nextTick(updatePosition);
}

function hide() {
  visible.value = false;
}

onMounted(() => window.addEventListener("resize", updatePosition));
onUnmounted(() => window.removeEventListener("resize", updatePosition));
</script>

<template>
  <div class="tooltip" @mouseenter="show" @mouseleave="hide">
    <span
      :aria-describedby="visible ? id : undefined"
      class="tooltip-trigger"
      @focusin="show"
      @focusout="hide"
    >
      <slot name="trigger" />
    </span>
    <Transition name="tooltip-fade">
      <div
        v-if="visible"
        :id="id"
        ref="tooltipElement"
        class="tooltip-content"
        role="tooltip"
        :style="tooltipStyle"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
}
.tooltip-trigger {
  display: inline-flex;
}

.tooltip-content {
  z-index: 20;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: min(15rem, calc(100vw - 1.5rem));
  padding: 1rem 1rem;
  gap: 0.5rem;
  background: var(--color-title);
  border-radius: 0.19rem;
  color: var(--color-bg);
  text-align: left;

  &::before {
    content: "";
    position: absolute;
    top: -0.85rem;
    left: var(--pointer-left);
    transform: translateX(-50%);
    border-bottom: 0.9rem solid var(--color-title);
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
  }
  &::after {
    content: "";
    position: absolute;
    top: -1rem;
    left: 0;
    width: 100%;
    height: 1rem;
  }
  & :deep(strong) {
    font-family: var(--font-title);
    font-size: 0.75rem;
    font-weight: 600;
  }
  & :deep(p) {
    font-family: var(--font-body);
    font-size: 0.75rem;
  }
}

.tooltip-fade {
  &-enter-active,
  &-leave-active {
    transition:
      opacity 180ms ease,
      transform 180ms ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-0.35rem);
  }
}

@media (max-width: 760px) {
  .tooltip-content {
    width: min(15rem, calc(100vw - 1.5rem));

    &::before {
      left: var(--pointer-left);
    }
  }
}
</style>
