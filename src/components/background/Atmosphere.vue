<script setup lang="ts">
import { Icon } from "@iconify/vue";

const TOTAL_COUNT = 40;
const MIN_SIZE_REM = 0.7;
const MAX_SIZE_REM = 1.8;
const VERTICAL_STEP_PX = 100;
const RANDOM_Y_OFFSET = 80;

type FloatingElement = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  driftX: string;
  driftY: string;
  maxOpacity: number;
};

const elements: FloatingElement[] = Array.from({ length: TOTAL_COUNT }, (_, index) => {
  const topPx = 60 + index * VERTICAL_STEP_PX + ((index * 53) % RANDOM_Y_OFFSET);
  const leftPct = 3 + ((index * 43) % 92);

  const sizeTier = (index % 4) / 3;
  const calculatedSize = MIN_SIZE_REM + sizeTier * (MAX_SIZE_REM - MIN_SIZE_REM);

  return {
    id: index,
    left: `${leftPct}%`,
    top: `${topPx}px`,
    size: `${calculatedSize.toFixed(2)}rem`,
    delay: `${(index % 8) * -0.7}s`,
    duration: `${4.5 + (index % 4)}s`,
    driftX: `${(index % 2 === 0 ? 1 : -1) * (1.5 + (index % 3))}rem`,
    driftY: `${(index % 3 === 0 ? -1 : 1) * (1.5 + (index % 3))}rem`,
    maxOpacity: 0.75,
  };
});
</script>

<template>
  <div class="atmosphere-wrapper" aria-hidden="true">
    <div class="atmosphere-grid" />
    <div class="atmosphere-elements">
      <Icon
        v-for="item in elements"
        :key="`elem-${item.id}`"
        class="atmosphere-element"
        icon="pixel:plus"
        :style="{
          '--left': item.left,
          '--top': item.top,
          '--size': item.size,
          '--delay': item.delay,
          '--duration': item.duration,
          '--drift-x': item.driftX,
          '--drift-y': item.driftY,
          '--max-opacity': item.maxOpacity,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.atmosphere-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.atmosphere-grid {
  z-index: 0;
  position: fixed;
  inset: 0;
  opacity: 0.6;
  background-image: radial-gradient(circle, var(--color-grid) 0.125rem, transparent 0.14rem);
  background-position: center;
  background-size: 1.875rem 1.875rem;
  width: 100vw;
  height: 100vh;
}

.atmosphere-elements {
  z-index: 2;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.atmosphere-element {
  position: absolute;
  left: var(--left);
  top: var(--top);
  color: var(--color-brand);
  width: var(--size);
  height: var(--size);
  will-change: transform, opacity;
  animation: float-element var(--duration) ease-in-out var(--delay) infinite alternate;
}

@keyframes float-element {
  from {
    opacity: 0.15;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  to {
    opacity: var(--max-opacity);
    transform: translate3d(var(--drift-x), var(--drift-y), 0) rotate(90deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .atmosphere-element {
    animation: none;
    opacity: 0.35;
  }
}
</style>
