<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

import Atmosphere from "@/components/background/Atmosphere.vue";
import SiteFooter from "@/components/layout/SiteFooter.vue";
import SiteHeader from "@/components/layout/SiteHeader.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import MatchesSection from "@/components/sections/MatchesSection.vue";
import PartnersSection from "@/components/sections/PartnersSection.vue";
import StaffSection from "@/components/sections/StaffSection.vue";
import TeamSection from "@/components/sections/TeamSection.vue";
import SectionHeading from "@/components/widgets/SectionHeading.vue";

import { socialLinks, discordLink } from "@/data/site";
import { teamRegions } from "@/data/teams";

const { t } = useI18n();

onMounted(() => {
  const sameAsLinks = [discordLink.href, ...socialLinks.map((link) => link.href)];

  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Feather Esports",
    url: "https://feather-esports.github.io",
    logo: "https://feather-esports.github.io/images/brand/logo.png",
    sport: "Overwatch",
    description: "Grassroots Overwatch organization competing across multiple skill tiers.",
    sameAs: sameAsLinks,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "organization-schema";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
});
</script>

<template>
  <div class="site-shell">
    <Atmosphere />
    <SiteHeader />
    <main>
      <HeroSection />

      <section id="teams" class="content-section" aria-labelledby="teams-title">
        <SectionHeading
          heading-id="teams-title"
          :title="t('sections.teams.title')"
          :description="t('sections.teams.description')"
        />
        <TeamSection :regions="teamRegions" />
      </section>

      <section id="faq" class="content-section" aria-labelledby="faq-title">
        <SectionHeading
          heading-id="faq-title"
          :title="t('sections.faq.title')"
          :description="t('sections.faq.description')"
        />
        <FaqSection />
      </section>

      <section id="matches" class="content-section" aria-labelledby="matches-title">
        <SectionHeading
          heading-id="matches-title"
          :title="t('sections.matches.title')"
          :description="t('sections.matches.description')"
        />
        <MatchesSection />
      </section>

      <section id="partners" class="content-section" aria-labelledby="partners-title">
        <SectionHeading
          heading-id="partners-title"
          :title="t('sections.partners.title')"
          :description="t('sections.partners.description')"
        />
        <PartnersSection />
      </section>

      <section id="staff" class="content-section" aria-labelledby="staff-title">
        <SectionHeading
          heading-id="staff-title"
          :title="t('sections.staff.title')"
          :description="t('sections.staff.description')"
        />
        <StaffSection />
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
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

  @media (max-width: 760px) {
    margin-top: 3rem;
  }
}
</style>
