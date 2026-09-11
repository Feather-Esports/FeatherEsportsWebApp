<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { useResizeObserver, useScroll } from "@vueuse/core"
import { useI18n } from "vue-i18n"

import { staff, staffRoles, staffSubRoles, type StaffMember, type StaffRole, type StaffRoleId, type StaffSubRoleId } from "@/data/site"
import { useUiStore } from "@/stores/ui"

const { t } = useI18n()
const uiStore = useUiStore()

const subRoleMap = new Map<string, string>(staffSubRoles.map(sr => [sr.id, sr.label]))

const staffAvatars = import.meta.glob<string>("@/assets/images/staff/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
})

const activeStaffRoles = computed<readonly StaffRole[]>(() => staffRoles.filter(role => staff.some(member => member.roles.includes(role.id))))

const visibleStaff = computed<StaffMember[]>(() => staff.filter(member => member.roles.includes(uiStore.activeStaffRole as StaffRoleId)))

const carouselRef = ref<HTMLElement | null>(null)
const { x: scrollX } = useScroll(carouselRef, { behavior: "smooth" })

const canScrollLeft = ref<boolean>(false)
const canScrollRight = ref<boolean>(false)

function updateScrollState(): void {
  const el = carouselRef.value
  if (!el) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  const maxScrollLeft = Math.max(el.scrollWidth - el.clientWidth, 0)
  const hasOverflow = maxScrollLeft > 0

  canScrollLeft.value = hasOverflow && el.scrollLeft > 1
  canScrollRight.value = hasOverflow && el.scrollLeft < maxScrollLeft - 1
}

useResizeObserver(carouselRef, updateScrollState)

function scrollCarousel(direction: "left" | "right"): void {
  const el = carouselRef.value
  if (!el) return

  const amount = el.clientWidth * 0.8
  scrollX.value += direction === "left" ? -amount : amount
}

function getSubRoleLabel(id: StaffSubRoleId | string): string {
  const labelKey = subRoleMap.get(id)
  return labelKey ? t(labelKey) : id
}

watch(
  () => uiStore.activeStaffRole,
  async () => {
    await nextTick()
    if (carouselRef.value) {
      carouselRef.value.scrollLeft = 0
    }
    updateScrollState()
  },
)

watch(scrollX, updateScrollState)

onMounted(() => {
  Object.values(staffAvatars).forEach(url => {
    const img = new Image()
    img.src = url
    img.decode().catch(() => {})
  })
  updateScrollState()
})
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
      @click="uiStore.selectStaffRole(role.id)"
    >
      {{ t(role.label) }}
    </button>
  </div>

  <div class="carousel-container">
    <button v-if="canScrollLeft" type="button" class="carousel-arrow prev" aria-label="Scroll left" @click="scrollCarousel('left')">
      <Icon icon="pixel:angle-left" />
    </button>

    <Transition name="fade-slide" mode="out-in" @after-enter="updateScrollState">
      <div :key="uiStore.activeStaffRole" ref="carouselRef" class="staff-grid" tabindex="-1">
        <article v-for="member in visibleStaff" :key="member.id" class="staff-card" :style="{ '--member-color': member.color }">
          <img class="staff-avatar" :src="staffAvatars[`/src/assets/images/staff/${member.id}.webp`]" :alt="member.name" loading="eager" decoding="async" draggable="false" />
          <div class="staff-details">
            <h3>{{ member.name }}</h3>
            <p v-for="subRoleId in member.subRoles" :key="subRoleId">- {{ getSubRoleLabel(subRoleId) }}</p>
          </div>
        </article>
      </div>
    </Transition>

    <button v-if="canScrollRight" type="button" class="carousel-arrow next" aria-label="Scroll right" @click="scrollCarousel('right')">
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
}

.staff-tabs {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-top: 0.9rem;
  background: var(--color-bg);
  width: 100%;

  & button {
    position: relative;
    font-family: var(--font-title);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text);
    background: transparent;
    border: 0;
    border-bottom: 2px solid var(--color-line);
    width: 100%;
    min-height: 2.75rem;
    padding: 0.5rem;
    transition:
      background 200ms ease,
      color 200ms ease,
      border-color 200ms ease;

    @media (hover: hover) {
      &:hover:not(.active) {
        color: color-mix(in srgb, var(--color-brand) 70%, transparent);
        background: linear-gradient(360deg, color-mix(in srgb, var(--color-brand) 10%, transparent) 0%, transparent 75%, transparent 100%);
        border-bottom-color: color-mix(in srgb, var(--color-brand) 70%, var(--color-line));
      }
    }

    &.active {
      color: var(--color-brand);
      background: linear-gradient(360deg, color-mix(in srgb, var(--color-brand) 20%, transparent) 0%, transparent 75%, transparent 100%);
      border-bottom-color: var(--color-brand);
    }

    &:focus-visible {
      z-index: 1;
      outline: 2px solid var(--color-brand);
      outline-offset: -2px;
    }
  }

  @media (max-width: 640px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(2, 1fr);
  }
}

.staff-grid {
  display: flex;
  gap: 1rem;
  background: var(--color-bg);
  width: 100%;
  padding: 0.5rem 0;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.staff-card {
  display: flex;
  flex: 0 0 calc(33.333% - 0.67rem);
  gap: 1rem;
  background: linear-gradient(90deg, color-mix(in srgb, var(--member-color) 50%, transparent) 0%, transparent 95%, transparent 100%), var(--color-bg);
  height: 9rem;
  border-radius: 0.19rem;
  scroll-snap-align: start;

  & h3 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-family: var(--font-title);
    font-size: 1.15rem;
    font-weight: 600;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 640px) {
      font-size: 1rem;
    }
  }

  & p {
    font-family: var(--font-body);
    font-size: 0.81rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--color-text);
    padding-right: 0.5rem;
  }

  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 0.5rem);
  }

  @media (max-width: 640px) {
    flex: 0 0 85%;
    height: 7.5rem;
  }
}

.staff-avatar {
  color: var(--color-title);
  width: auto;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  flex-shrink: 0;
}

.staff-details {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 0;
}

.carousel-arrow {
  z-index: 10;
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.45rem;
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-bg) 75%, transparent);
  border: none;
  padding: 0.9rem 0.6rem;
  border-radius: 0.19rem;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    opacity 200ms ease;

  @media (hover: hover) {
    &:hover {
      background: var(--color-brand);
      color: var(--color-bg);
    }
  }

  &.prev {
    left: 0.5rem;
  }

  &.next {
    right: 0.5rem;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    display: none;
  }
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

@supports (-moz-appearance: none) {
  .carousel-container {
    transform: translateZ(0);
    contain: layout;
    will-change: transform, opacity;
  }
}
</style>
