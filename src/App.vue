<script setup lang="ts">
import { useI18n } from "vue-i18n"

import { discordLink, socialLinks } from "@/data/site"
import { teamRegions } from "@/data/teams"

const { t } = useI18n()

const SCRIPT_ID = "organization-schema"

let sectionObserver: IntersectionObserver | undefined

onMounted(() => {
  if (document.getElementById(SCRIPT_ID)) return

  const sameAsLinks = [discordLink.href, ...socialLinks.map(link => link.href)]

  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Feather Esports",
    url: "https://feather-esports.github.io",
    logo: "https://feather-esports.github.io/images/brand/logo.png",
    sport: "Overwatch",
    description: "Grassroots Overwatch organization competing across multiple skill tiers.",
    sameAs: sameAsLinks,
  }

  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.id = SCRIPT_ID
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)

  const sections = document.querySelectorAll(".content-section")

  sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement

        if (entry.isIntersecting) {
          target.classList.add("is-visible")
          return
        }

        target.classList.remove("is-visible")
      })
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  )

  sections.forEach(section => sectionObserver?.observe(section))
})

onUnmounted(() => {
  const existingScript = document.getElementById(SCRIPT_ID)
  if (existingScript) existingScript.remove()

  sectionObserver?.disconnect()
})
</script>

<template>
  <div class="site-shell">
    <Atmosphere />
    <SiteHeader />
    <main>
      <HeroSection />

      <section id="teams" class="content-section reveal-section" aria-labelledby="teams-title">
        <SectionHeading heading-id="teams-title" :title="t('sections.teams.title')" :description="t('sections.teams.description')" />
        <TeamSection :regions="teamRegions" />
      </section>

      <section id="faq" class="content-section reveal-section" aria-labelledby="faq-title">
        <SectionHeading heading-id="faq-title" :title="t('sections.faq.title')" :description="t('sections.faq.description')" />
        <FaqSection />
      </section>

      <section id="matches" class="content-section reveal-section" aria-labelledby="matches-title">
        <SectionHeading heading-id="matches-title" :title="t('sections.matches.title')" :description="t('sections.matches.description')" />
        <MatchesSection />
      </section>

      <section id="partners" class="content-section reveal-section" aria-labelledby="partners-title">
        <SectionHeading heading-id="partners-title" :title="t('sections.partners.title')" :description="t('sections.partners.description')" />
        <PartnersSection />
      </section>

      <section id="staff" class="content-section reveal-section" aria-labelledby="staff-title">
        <SectionHeading heading-id="staff-title" :title="t('sections.staff.title')" :description="t('sections.staff.description')" />
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
  opacity: 0;
  transform: translateY(2.25rem);
  transition:
    opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 760px) {
    margin-top: 3rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
