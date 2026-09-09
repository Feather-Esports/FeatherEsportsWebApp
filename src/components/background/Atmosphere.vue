<script setup lang="ts">
import { Icon } from "@iconify/vue";

type FloatingPlus = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  driftX: string;
  driftY: string;
};

const pluses: FloatingPlus[] = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${2 + ((index * 37) % 94)}%`,
  top: `${2 + ((index * 53) % 94)}%`,
  size: `${0.7 + (index % 4) * 0.2}rem`,
  delay: `${(index % 6) * -0.8}s`,
  duration: `${5 + (index % 4)}s`,
  driftX: `${index % 2 ? 4 : -4}rem`,
  driftY: `${index % 3 ? -3 : 3}rem`,
}));
</script>

<template>
  <div class="atmosphere-grid" aria-hidden="true" />
  <div class="atmosphere-pluses" aria-hidden="true">
    <Icon
      v-for="plus in pluses"
      :key="`plus-${plus.id}`"
      class="atmosphere-plus"
      icon="pixel:plus"
      :style="{
        '--left': plus.left,
        '--top': plus.top,
        '--size': plus.size,
        '--delay': plus.delay,
        '--duration': plus.duration,
        '--drift-x': plus.driftX,
        '--drift-y': plus.driftY,
      }"
    />
  </div>
</template>

<style scoped>
.atmosphere-grid,
.atmosphere-pluses {
  inset: 0;
  width: 100vw;
  pointer-events: none;
}

.atmosphere-grid {
  z-index: 0;
  position: fixed;
  height: 100vh;
  opacity: 0.7;
  background-image: radial-gradient(circle, var(--color-grid) 0.125rem, transparent 0.14rem);
  background-position: center;
  background-size: 1.875rem 1.875rem;
}

.atmosphere-pluses {
  z-index: 2;
  position: absolute;
  bottom: 0;
  height: auto;
}
.atmosphere-plus {
  z-index: 2;
  position: absolute;
  left: var(--left);
  top: var(--top);
  width: var(--size);
  height: var(--size);
  color: var(--color-brand);
  animation: float-plus var(--duration) ease-in-out var(--delay) infinite alternate;
}
@keyframes float-plus {
  from {
    opacity: 0.3;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  to {
    opacity: 0.8;
    transform: translate3d(var(--drift-x), var(--drift-y), 0) rotate(90deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .atmosphere-plus {
    animation: none;
    opacity: 0.45;
  }
}
</style>
