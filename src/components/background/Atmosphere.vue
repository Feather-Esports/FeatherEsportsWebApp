<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useEventListener, useWindowSize } from "@vueuse/core";

const CELL_SIZE = 22;
const INTERACTION_RADIUS = 6;
const INTERACTION_RADIUS_SQUARED = INTERACTION_RADIUS ** 2;

const { width, height } = useWindowSize();
const squareElements = ref<(HTMLElement | null)[]>([]);
let pointerX = -1;
let pointerY = -1;
let frameId = 0;
let affectedIndices: number[] = [];

const columns = computed(() => Math.ceil(width.value / CELL_SIZE));
const rows = computed(() => Math.ceil(height.value / CELL_SIZE));
const squares = computed(() =>
  Array.from({ length: columns.value * rows.value }, (_, index) => index),
);

function setSquareElement(index: number, element: unknown) {
  squareElements.value[index] = element instanceof HTMLElement ? element : null;
}

function resetSquares() {
  for (const index of affectedIndices) {
    squareElements.value[index]?.style.setProperty("--intensity", "0");
  }
  affectedIndices = [];
}

function updateSquares() {
  frameId = 0;
  resetSquares();

  if (pointerX < 0 || pointerY < 0) {
    return;
  }

  const centerColumn = Math.floor(pointerX / CELL_SIZE);
  const centerRow = Math.floor(pointerY / CELL_SIZE);
  const firstColumn = Math.max(0, centerColumn - INTERACTION_RADIUS);
  const lastColumn = Math.min(columns.value - 1, centerColumn + INTERACTION_RADIUS);
  const firstRow = Math.max(0, centerRow - INTERACTION_RADIUS);
  const lastRow = Math.min(rows.value - 1, centerRow + INTERACTION_RADIUS);

  for (let row = firstRow; row <= lastRow; row += 1) {
    for (let column = firstColumn; column <= lastColumn; column += 1) {
      const index = row * columns.value + column;
      const centerX = column * CELL_SIZE + CELL_SIZE / 2;
      const centerY = row * CELL_SIZE + CELL_SIZE / 2;
      const distanceX = (pointerX - centerX) / CELL_SIZE;
      const distanceY = (pointerY - centerY) / CELL_SIZE;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      const element = squareElements.value[index];

      if (element && distanceSquared <= INTERACTION_RADIUS_SQUARED) {
        const intensity = Math.max(0.08, 1 - distanceSquared / INTERACTION_RADIUS_SQUARED);
        element.style.setProperty("--intensity", intensity.toString());
        affectedIndices.push(index);
      }
    }
  }
}

function scheduleUpdate() {
  if (frameId === 0) {
    frameId = requestAnimationFrame(updateSquares);
  }
}

useEventListener("pointermove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  scheduleUpdate();
});
useEventListener("pointerleave", () => {
  pointerX = -1;
  pointerY = -1;
  scheduleUpdate();
});

onBeforeUnmount(() => {
  if (frameId !== 0) {
    cancelAnimationFrame(frameId);
  }
});
</script>

<template>
  <div class="atmosphere" aria-hidden="true">
    <div class="grid" :style="{ '--columns': columns }">
      <span
        v-for="index in squares"
        :key="index"
        class="square"
        :ref="(element) => setSquareElement(index, element)"
      />
    </div>
  </div>
</template>

<style scoped>
.atmosphere {
  background: radial-gradient(circle at 78% 12%, transparent 22rem);
  height: 100vh;
  inset: 0;
  pointer-events: none;
  position: fixed;
  width: 100%;
  z-index: -1;
}
.grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 22px);
  grid-auto-rows: 22px;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.square {
  align-self: center;
  height: 3px;
  justify-self: center;
  --intensity: 0;
  opacity: calc(0.45 + var(--intensity) * 0.55);
  width: 3px;
  background: color-mix(
    in srgb,
    var(--color-brand) calc(var(--intensity) * 100%),
    var(--color-grid)
  );
  box-shadow: 0 0 calc(var(--intensity) * 16px) calc(var(--intensity) * 5px) var(--color-glow);
  transform: scale(calc(1 + var(--intensity) * 1.1));
}
</style>
