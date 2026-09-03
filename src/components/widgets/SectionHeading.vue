<script setup lang="ts">
defineProps<{ title: string; description: string }>();
</script>

<template>
  <div class="section-heading">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: flex-start;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-brand) 15%, transparent) 0%,
      transparent 100%
    ),
    #09090b;
  border-left: 2px solid var(--color-brand);
  padding: 1.5rem 1.875rem;
}
h2 {
  color: var(--color-title);
  font-family: var(--font-title);
  font-size: 1.563rem;
  font-weight: 700;
  text-transform: uppercase;
}
p {
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.875rem;
  margin-top: 0.7rem;
}
</style>
