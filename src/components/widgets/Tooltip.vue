<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(defineProps<{ id?: string }>(), {
  id: "tooltip",
});

const visible = ref(false);
const tooltipElement = ref<HTMLElement | null>(null);
const tooltipStyle = ref<Record<string, string>>({});

function updatePosition(): void {
  const trigger = tooltipElement.value?.previousElementSibling;
  if (!(trigger instanceof HTMLElement) || !tooltipElement.value) {
    return;
  }

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

function handleMouseEnter(): void {
  visible.value = true;
  void nextTick(updatePosition);
}

function handleMouseLeave(): void {
  visible.value = false;
}

function handleFocusIn(): void {
  visible.value = true;
  void nextTick(updatePosition);
}

function handleFocusOut(): void {
  visible.value = false;
}

onMounted(() => window.addEventListener("resize", updatePosition));
onUnmounted(() => window.removeEventListener("resize", updatePosition));
</script>

<template>
  <div class="tooltip" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <span
      :aria-describedby="visible ? props.id : undefined"
      class="tooltip-trigger"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <slot name="trigger" />
    </span>

    <Transition name="tooltip-fade">
      <div
        v-if="visible"
        :id="props.id"
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
  display: inline-flex;
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
  gap: 0.5rem;
  text-align: left;
  color: var(--color-bg);
  background: var(--color-title);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
  width: min(15rem, calc(100vw - 1.5rem));
  padding: 1rem;
  border-radius: 0.19rem;

  &::before {
    content: "";
    position: absolute;
    top: -0.85rem;
    left: var(--pointer-left, 50%);
    transform: translateX(-50%);
    border-bottom: 0.9rem solid var(--color-title);
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    pointer-events: none;
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
    margin: 0;
    font-family: var(--font-body);
    font-size: 0.75rem;
    line-height: 1.4;
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
</style>
