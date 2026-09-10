<script setup lang="ts">
defineProps<{
  headingId?: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="section-heading">
    <div>
      <h2 :id="headingId">{{ title }}</h2>
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
    var(--color-bg);
  border-left: 2px solid var(--color-brand);
  padding: 1.5rem 1.875rem;

  & h2 {
    margin: 0;
    font-family: var(--font-title);
    font-size: 1.563rem;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--color-title);

    @media (max-width: 640px) {
      font-size: 1.25rem;
    }
  }

  & p {
    margin: 0.7rem 0 0 0;
    font-family: var(--font-body);
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text);

    @media (max-width: 640px) {
      margin-top: 0.5rem;
      font-size: 0.813rem;
    }
  }

  @media (max-width: 640px) {
    padding: 1rem 1.25rem;
  }
}
</style>
