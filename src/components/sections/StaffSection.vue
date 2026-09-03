<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { staff, staffRoles } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const { t } = useI18n();
const uiStore = useUiStore();
const visibleStaff = computed(() =>
  staff.filter((member) => member.roles.includes(uiStore.activeStaffRole)),
);
</script>

<template>
  <section id="staff" class="content-section staff-section" aria-labelledby="staff-title">
    <slot />
    <div class="staff-tabs" role="tablist" :aria-label="t('staff.roles.label')">
      <button
        v-for="role in staffRoles"
        :key="role.id"
        type="button"
        role="tab"
        :aria-selected="uiStore.activeStaffRole === role.id"
        :class="{ active: uiStore.activeStaffRole === role.id }"
        @click="uiStore.selectStaffRole(role.id)"
      >
        {{ t(role.label) }}
      </button>
    </div>
    <div class="staff-grid">
      <article v-for="member in visibleStaff" :key="member.name" class="staff-card">
        <div class="staff-avatar" :style="{ backgroundColor: member.color }">
          <Icon :icon="member.icon" width="42" />
        </div>
        <div>
          <h3>{{ member.name }}</h3>
          <p v-for="role in member.subRoles" :key="role">- {{ t(role) }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.staff-grid {
  border: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.staff-tabs {
  border-bottom: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.staff-tabs button {
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.58rem;
  min-height: 2rem;
  padding: 0.5rem;
  text-transform: uppercase;
}
.staff-tabs button.active,
.staff-tabs button:hover {
  border-bottom-color: var(--color-brand);
  color: var(--color-brand);
}
.staff-card {
  align-items: center;
  background: linear-gradient(90deg, rgba(26, 188, 156, 0.14), transparent 78%);
  border-right: 1px solid var(--color-line);
  display: flex;
  min-height: 8rem;
}
.staff-avatar {
  align-items: center;
  align-self: stretch;
  border-right: 1px solid var(--color-line);
  color: var(--color-title);
  display: flex;
  justify-content: center;
  width: 6rem;
}
.staff-card h3 {
  font-family: var(--font-title);
  font-size: 1.1rem;
  text-transform: uppercase;
}
.staff-card p {
  color: var(--color-text);
  font-size: 0.55rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  padding-right: 0.7rem;
}
.staff-section {
  margin-bottom: 4rem;
}
@media (max-width: 760px) {
  .staff-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .staff-tabs button:nth-child(-n + 4) {
    border-bottom: 1px solid var(--color-line);
  }
  .staff-grid {
    grid-template-columns: 1fr;
  }
  .staff-card {
    border-bottom: 1px solid var(--color-line);
    border-right: 0;
  }
  .staff-avatar {
    min-height: 5.5rem;
    width: 5.5rem;
  }
  .staff-section {
    margin-bottom: 5rem;
  }
}
</style>
