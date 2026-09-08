<script setup lang="ts">
import { useI18n } from "vue-i18n";
import SiteFooter from "@/components/layout/SiteFooter.vue";
import SiteHeader from "@/components/layout/SiteHeader.vue";
import SectionHeading from "@/components/widgets/SectionHeading.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import TeamSection from "@/components/sections/TeamSection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import MatchesSection from "@/components/sections/MatchesSection.vue";
import PartnersSection from "@/components/sections/PartnersSection.vue";
import StaffSection from "@/components/sections/StaffSection.vue";
import { teamRegions } from "@/data/teams";
import Atmosphere from "@/components/background/Atmosphere.vue";

const { t } = useI18n();
</script>

<template>
  <div class="site-shell">
    <Atmosphere v-once />
    <SiteHeader v-once />
    <main>
      <HeroSection v-once />

      <!-- Teams -->
      <section id="teams" class="content-section" aria-labelledby="teams-title">
        <SectionHeading
          :title="t('sections.teams.title')"
          :description="t('sections.teams.description')"
          v-once
        />
        <TeamSection :regions="teamRegions" />
      </section>

      <!-- FAQ -->
      <section id="faq" class="content-section" aria-labelledby="faq-title">
        <SectionHeading
          :title="t('sections.faq.title')"
          :description="t('sections.faq.description')"
          v-once
        />
        <FaqSection />
      </section>

      <!-- Matches -->
      <section id="matches" class="content-section" aria-labelledby="matches-title" v-once>
        <SectionHeading
          :title="t('sections.matches.title')"
          :description="t('sections.matches.description')"
        />
        <MatchesSection />
      </section>

      <!-- Partners -->
      <section id="partners" class="content-section" aria-labelledby="partners-title" v-once>
        <SectionHeading
          :title="t('sections.partners.title')"
          :description="t('sections.partners.description')"
        />
        <PartnersSection />
      </section>

      <!-- Staff -->
      <section id="staff" class="content-section" aria-labelledby="staff-title">
        <SectionHeading
          :title="t('sections.staff.title')"
          :description="t('sections.staff.description')"
          v-once
        />
        <StaffSection />
      </section>
    </main>
    <SiteFooter v-once />
  </div>
</template>

<style scoped>
.site-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-body);
  position: relative;
  z-index: 1;
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
  position: relative;
  scroll-margin-top: 6rem;
  z-index: 2;
}
@media (max-width: 760px) {
  .content-section {
    margin-top: 3rem;
  }
}
</style>
