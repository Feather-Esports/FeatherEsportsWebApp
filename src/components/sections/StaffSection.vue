<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { staff, staffRoles, staffSubRoles } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const { t } = useI18n();
const uiStore = useUiStore();

const subRoleLabelMap = computed<Map<string, string>>(
  () => new Map(staffSubRoles.map((subRole) => [subRole.id, subRole.label])),
);

const staffAvatars = import.meta.glob("@/assets/images/staff/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const activeStaffRoles = computed(() =>
  staffRoles.filter((role) => staff.some((member) => member.roles.includes(role.id))),
);

const visibleStaff = computed(() =>
  staff.filter((member) => member.roles.includes(uiStore.activeStaffRole)),
);

const carouselRef = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
let resizeObserver: ResizeObserver | null = null;

function updateScrollState(): void {
  const element = carouselRef.value;
  if (!element) {
    canScrollLeft.value = false;
    canScrollRight.value = false;
    return;
  }

  const maxScrollLeft = Math.max(element.scrollWidth - element.clientWidth, 0);
  const hasOverflow = maxScrollLeft > 0;

  canScrollLeft.value = hasOverflow && element.scrollLeft > 1;
  canScrollRight.value = hasOverflow && element.scrollLeft < maxScrollLeft - 1;
}

function attachObserverAndScroll(): void {
  const element = carouselRef.value;
  if (!element) {
    return;
  }

  resizeObserver?.disconnect();
  resizeObserver = new ResizeObserver(updateScrollState);
  resizeObserver.observe(element);
  updateScrollState();
}

function scrollCarousel(direction: "left" | "right"): void {
  const element = carouselRef.value;
  if (!element) {
    return;
  }

  const scrollAmount = element.clientWidth * 0.8;
  element.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
}

function getSubRoleLabel(id: string): string {
  const labelKey = subRoleLabelMap.value.get(id);
  return labelKey ? t(labelKey) : id;
}

function handleRoleChange(roleId: string): void {
  uiStore.selectStaffRole(roleId);
}

watch([visibleStaff, () => uiStore.activeStaffRole], async () => {
  await nextTick();
  const element = carouselRef.value;
  if (!element) {
    return;
  }

  element.scrollLeft = 0;
  updateScrollState();
});

onMounted(() => {
  attachObserverAndScroll();
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="staff-tabs" role="tablist" :aria-label="t('staff.roles.label')">
    <button
      v-for="role in activeStaffRoles"
      :key="role.id"
      type="button"
      role="tab"
      :aria-selected="uiStore.activeStaffRole === role.id"
      :class="{ active: uiStore.activeStaffRole === role.id }"
      @click="handleRoleChange(role.id)"
    >
      {{ t(role.label) }}
    </button>
  </div>

  <div class="carousel-container">
    <button
      v-if="canScrollLeft"
      type="button"
      class="carousel-arrow prev"
      aria-label="Scroll left"
      @click="scrollCarousel('left')"
    >
      <Icon icon="pixel:angle-left" />
    </button>

    <Transition
      name="fade-slide"
      mode="out-in"
      @after-enter="attachObserverAndScroll"
      @leave="updateScrollState"
    >
      <div
        :key="uiStore.activeStaffRole"
        ref="carouselRef"
        class="staff-grid"
        @scroll="updateScrollState"
      >
        <article
          v-for="member in visibleStaff"
          :key="member.id"
          class="staff-card"
          :style="{ '--member-color': member.color }"
        >
          <img
            class="staff-avatar"
            :src="staffAvatars[`/src/assets/images/staff/${member.id}.webp`]"
            :alt="member.name"
            draggable="false"
          />
          <div>
            <h3>{{ member.name }}</h3>
            <p v-for="subRoleId in member.subRoles" :key="subRoleId">
              - {{ getSubRoleLabel(subRoleId) }}
            </p>
          </div>
        </article>
      </div>
    </Transition>

    <button
      v-if="canScrollRight"
      type="button"
      class="carousel-arrow next"
      aria-label="Scroll right"
      @click="scrollCarousel('right')"
    >
      <Icon icon="pixel:angle-right" />
    </button>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 0.9rem;
  will-change: transform;
}

.staff-grid {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100%;
  padding: 0.5rem 0;
  background: var(--color-bg);
  scrollbar-width: none;
}

.staff-grid::-webkit-scrollbar {
  display: none;
}

.staff-card {
  flex: 0 0 calc(33.333% - 0.67rem);
  scroll-snap-align: start;
  box-sizing: border-box;
  display: flex;
  height: 9rem;
  gap: 1rem;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--member-color) 50%, transparent) 0%,
      transparent 95%,
      transparent 100%
    ),
    var(--color-bg);
}

.carousel-arrow {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: color-mix(in srgb, var(--color-bg) 50%, transparent);
  color: var(--color-text);
  border: none;
  font-size: 1.45rem;
  padding: 0.9rem 0.6rem;
  cursor: pointer;
  border-radius: 0.19rem;
  transition:
    background-color 200ms ease,
    opacity 200ms ease;
}

.carousel-arrow:hover {
  background: var(--color-brand);
  color: var(--color-title);
}

.carousel-arrow.prev {
  left: 0.5rem;
}
.carousel-arrow.next {
  right: 0.5rem;
}

.staff-tabs {
  border-bottom: 1px solid var(--color-line);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  width: 100%;
  background: var(--color-bg);
  margin-top: 0.9rem;
}

.staff-tabs button {
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--color-text);
  font-style: var(--font-title);
  font-size: 0.75rem;
  font-weight: 600;
  min-height: 2rem;
  padding: 0.5rem;
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;
  transition:
    background 200ms ease,
    color 200ms ease,
    border-color 200ms ease;

  &:hover {
    border-bottom-color: color-mix(in srgb, var(--color-brand) 70%, var(--color-line));
    color: color-mix(in srgb, var(--color-brand) 70%, transparent);
    background: linear-gradient(
      360deg,
      color-mix(in srgb, var(--color-brand) 10%, transparent) 0%,
      transparent 75%,
      transparent 100%
    );
  }

  &.active {
    border-bottom-color: var(--color-brand);
    color: var(--color-brand);
    background: linear-gradient(
      360deg,
      color-mix(in srgb, var(--color-brand) 20%, transparent) 0%,
      transparent 75%,
      transparent 100%
    );
  }
}

.staff-avatar {
  color: var(--color-title);
  height: 100%;
  width: auto;
}

.staff-card h3 {
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  font-family: var(--font-title);
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
}

.staff-card p {
  padding-right: 0.7rem;
  font-family: var(--font-body);
  font-size: 0.81rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-text);
}

.fade-slide {
  &-enter-active,
  &-leave-active {
    transition:
      opacity 250ms ease,
      transform 250ms ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@media (max-width: 900px) {
  .staff-card {
    flex: 0 0 calc(50% - 0.5rem);
  }
}
@media (max-width: 600px) {
  .staff-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .staff-tabs button:nth-child(-n + 4) {
    border-bottom: 1px solid var(--color-line);
  }
  .staff-card {
    flex: 0 0 100%;
  }
}
</style>
