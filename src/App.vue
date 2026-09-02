<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import SiteFooter from "@/components/layout/SiteFooter.vue";
import SiteHeader from "@/components/layout/SiteHeader.vue";
import AccordionList from "@/components/ui/AccordionList.vue";
import HeroSection from "@/components/ui/HeroSection.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import StaffSection from "@/components/ui/StaffSection.vue";
import TeamRoster from "@/components/ui/TeamRoster.vue";
import { faqs, teamRegions } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const { t } = useI18n();
const uiStore = useUiStore();
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="top">
      <HeroSection />

      <section id="teams" class="content-section" aria-labelledby="teams-title">
        <SectionHeading
          :title="t('sections.teams.title')"
          :description="t('sections.teams.description')"
        />
        <TeamRoster :regions="teamRegions" />
      </section>

      <section id="matches" class="content-section compact" aria-labelledby="matches-title">
        <SectionHeading
          :title="t('sections.matches.title')"
          :description="t('sections.matches.description')"
        />
        <div class="empty-state">
          <Icon icon="pixel:calendar-alt-solid" />
          <p>{{ t("matches.empty") }}</p>
          <span>{{ t("matches.hint") }}</span>
        </div>
      </section>

      <section id="faq" class="content-section" aria-labelledby="faq-title">
        <SectionHeading
          :title="t('sections.faq.title')"
          :description="t('sections.faq.description')"
        />
        <AccordionList
          :items="faqs"
          numbered
          :open-item="uiStore.openAccordion"
          @toggle="uiStore.toggleAccordion"
        />
      </section>

      <StaffSection>
        <SectionHeading
          :title="t('sections.staff.title')"
          :description="t('sections.staff.description')"
        />
      </StaffSection>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-shell {
  display: flex;
  flex-direction: column;
  isolation: isolate;
  min-height: 100vh;
  font-family: var(--font-body);
  position: relative;
  z-index: 1;
}
.site-shell::before {
  background-image: radial-gradient(var(--color-grid) 1px, transparent 1px);
  background-size: 1rem 1rem;
  content: "";
  inset: 0;
  opacity: 0.42;
  pointer-events: none;
  position: fixed;
  z-index: -1;
}
main {
  flex: 1;
  width: 100%;
  padding: 0 0 5rem;
}
.content-section {
  margin: 4.5rem auto 0;
  max-width: 68rem;
  padding: 0 1.25rem;
  scroll-margin-top: 6rem;
}
.empty-state {
  align-items: center;
  border: 1px solid var(--color-line);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  min-height: 10rem;
  padding: 2.5rem 1rem;
  text-align: center;
}
.empty-state svg {
  color: var(--color-brand);
}
.empty-state p {
  color: var(--color-title);
  font-family: var(--font-title);
  font-size: 1.1rem;
  text-transform: uppercase;
}
.empty-state span {
  font-size: 0.58rem;
}
@media (max-width: 760px) {
  .content-section {
    margin-top: 3rem;
  }
}
</style>
