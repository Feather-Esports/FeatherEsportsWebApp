<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { Icon } from "@iconify/vue";

const CELL_SIZE = 30;
const PLUS_COUNT = 25;

const { width, height } = useWindowSize();

const columns = computed(() => Math.ceil(width.value / CELL_SIZE));
const rows = computed(() => Math.ceil(height.value / CELL_SIZE));
const squares = computed(() =>
  Array.from({ length: columns.value * rows.value }, (_, index) => index),
);

const pluses = computed(() =>
  Array.from({ length: PLUS_COUNT }, (_, index) => ({
    id: index,
    left: `${2 + ((index * 37) % 94)}%`,
    top: `${2 + ((index * 53) % 94)}%`,
    size: `${0.7 + (index % 4) * 0.25}rem`,
    delay: `${(index % 6) * -0.8}s`,
    duration: `${5 + (index % 4)}s`,
    driftX: `${index % 2 ? 5 : -5}rem`,
    driftY: `${index % 3 ? -4 : 4}rem`,
  })),
);
</script>

<template>
  <div class="atmosphere-grid" aria-hidden="true">
    <div class="grid" :style="{ '--columns': columns }">
      <span v-for="index in squares" :key="index" class="square" />
    </div>
  </div>
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
}
.atmosphere-pluses {
  z-index: 2;
  position: absolute;
  bottom: 0;
  height: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 30px);
  grid-auto-rows: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.square {
  justify-self: center;
  align-self: center;
  width: 4px;
  height: 4px;
  background: var(--color-grid);
  opacity: 0.7;
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
</style>
