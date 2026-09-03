import { defineStore } from "pinia"
import { ref } from "vue"

export const useUiStore = defineStore("ui", () => {
  const activeTeamRegion = ref("emea")
  const activeStaffRole = ref("founders")
  const openFaq = ref<string | null>(null)

  function selectTeamRegion(region: string) {
    activeTeamRegion.value = region
  }

  function selectStaffRole(role: string) {
    activeStaffRole.value = role
  }

  function toggleFaq(label: string) {
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
