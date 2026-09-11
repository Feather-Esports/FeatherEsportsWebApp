import { defineStore } from "pinia"

export const useUiStore = defineStore("ui", () => {
  const activeTeamRegion = ref("emea")
  const activeStaffRole = ref("founders")
  const openFaq = ref<string | null>(null)
  const legalModalOpen = ref(false)

  function selectTeamRegion(region: string): void {
    activeTeamRegion.value = region
  }

  function selectStaffRole(role: string): void {
    activeStaffRole.value = role
  }

  function toggleFaq(label: string): void {
    openFaq.value = openFaq.value === label ? null : label
  }

  function openLegalModal(): void {
    legalModalOpen.value = true
  }

  function closeLegalModal(): void {
    legalModalOpen.value = false
  }

  return {
    activeTeamRegion,
    activeStaffRole,
    openFaq,
    legalModalOpen,
    selectTeamRegion,
    selectStaffRole,
    toggleFaq,
    openLegalModal,
    closeLegalModal,
  }
})
