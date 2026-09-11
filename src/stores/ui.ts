import { defineStore } from "pinia"

export const useUiStore = defineStore("ui", () => {
  const activeTeamRegion = ref("emea")
  const activeStaffRole = ref("founders")
  const openFaq = ref<string | null>(null)

  function selectTeamRegion(region: string): void {
    activeTeamRegion.value = region
  }

  function selectStaffRole(role: string): void {
    activeStaffRole.value = role
  }

  function toggleFaq(label: string): void {
    openFaq.value = openFaq.value === label ? null : label
  }

  return {
    activeStaffRole,
    activeTeamRegion,
    openFaq,
    selectStaffRole,
    selectTeamRegion,
    toggleFaq,
  }
})
