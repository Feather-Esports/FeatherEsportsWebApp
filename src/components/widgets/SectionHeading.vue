<script setup lang="ts">
defineProps<{ title: string; description: string }>();
</script>

<template>
  <div class="section-heading">
    <div>
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.section-heading {
  align-items: flex-start;
  background: linear-gradient(90deg, var(--color-heading-glow), transparent);
  border-left: 2px solid var(--color-brand);
  display: flex;
  padding: 1rem 1.25rem;
}
h2 {
  font-family: var(--font-title);
  font-size: 1.7rem;
  text-transform: uppercase;
}
p {
  color: var(--color-text);
  font-size: 0.57rem;
  margin-top: 0.2rem;
}
</style>
