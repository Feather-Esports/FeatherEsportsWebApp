import { defineStore } from "pinia"
import { ref } from "vue"

export const useUiStore = defineStore("ui", () => {
  const openAccordion = ref<string | null>(null)
  const activeTeamRegion = ref("emea")
  const activeStaffRole = ref("founders")

  function toggleAccordion(label: string) {
    openAccordion.value = openAccordion.value === label ? null : label
  }

  function selectTeamRegion(region: string) {
    activeTeamRegion.value = region
  }

  function selectStaffRole(role: string) {
    activeStaffRole.value = role
  }

  return {
    activeStaffRole,
    activeTeamRegion,
    openAccordion,
    selectStaffRole,
    selectTeamRegion,
    toggleAccordion,
  }
})
