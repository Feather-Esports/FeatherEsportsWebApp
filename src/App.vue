<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

type AccordionItem = {
  label: string;
  detail: string;
  color: string;
};

const teams: AccordionItem[] = [
  {
    label: "EMEA teams",
    detail: "Our European rosters and the players representing Feather.",
    color: "lime",
  },
  {
    label: "NA teams",
    detail: "North American competition, community, and upcoming rosters.",
    color: "red",
  },
  {
    label: "SA teams",
    detail: "South American players building the next Feather chapter.",
    color: "orange",
  },
  {
    label: "OCE teams",
    detail: "Oceanic talent, tournaments, and regional events.",
    color: "blue",
  },
];

const faqs: AccordionItem[] = [
  {
    label: "How do I join a team?",
    detail: "Keep an eye on our announcements and submit your details when tryouts open.",
    color: "muted",
  },
  {
    label: "Where can I watch Feather?",
    detail: "Follow our social channels for match schedules and live broadcast links.",
    color: "muted",
  },
  {
    label: "Do you host community events?",
    detail: "Yes. Community cups and scrims are part of our regular calendar.",
    color: "muted",
  },
  {
    label: "How can I work with Feather?",
    detail: "Reach out through our business contact channels with a short introduction.",
    color: "muted",
  },
  {
    label: "Where is Feather based?",
    detail: "We are an online-first organization with teams across multiple regions.",
    color: "muted",
  },
];

const staff = [
  { name: "Blaco", role: "Community Staff", color: "#49c31a", icon: "game-icons:feather" },
  {
    name: "Kepler",
    role: "Networking and Team Staff",
    color: "#35309c",
    icon: "solar:planet-2-bold",
  },
  { name: "Yiruzu", role: "Tech and Media Staff", color: "#1298df", icon: "solar:widget-5-bold" },
];

const openItem = ref<string | null>(null);

function toggleItem(label: string) {
  openItem.value = openItem.value === label ? null : label;
}
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="Feather Esports home">
        <Icon icon="game-icons:feather" width="23" />
        <span>Feather</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a class="active" href="#top">Home</a>
        <a href="#teams">Teams</a>
        <a href="#matches">Matches</a>
        <a href="#faq">FAQ</a>
        <a href="#staff">Staff</a>
      </nav>
      <div class="header-actions">
        <a class="action-link" href="#matches"><Icon icon="solar:cup-star-bold" /> 1 WIP</a>
        <a class="discord-link" href="#community"
          ><Icon icon="simple-icons:discord" /> Join Discord</a
        >
      </div>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <p class="eyebrow">Overwatch 2 esports organization</p>
        <h1 id="hero-title">Feather Esports</h1>
        <p class="hero-subtitle">Teams <span>/</span> Scrims <span>/</span> Pugs</p>
        <div class="hero-card">
          <p class="card-kicker">Overwatch 2</p>
          <h2>About us</h2>
          <p>
            We are a grassroots Overwatch organization competing in tournaments across multiple
            skill tiers. We are focused on building competitive teams, developing players, and
            growing our place in the Overwatch community.
          </p>
        </div>
        <div class="social-links" id="community" aria-label="Social links">
          <a href="#community"><Icon icon="simple-icons:twitch" /> Twitch</a>
          <a href="#community"><Icon icon="simple-icons:youtube" /> YouTube</a>
          <a href="#community"><Icon icon="simple-icons:x" /> X / Twitter</a>
          <a href="#community"><Icon icon="simple-icons:tiktok" /> TikTok</a>
          <a href="#community"><Icon icon="simple-icons:instagram" /> Instagram</a>
        </div>
      </section>

      <section id="teams" class="content-section" aria-labelledby="teams-title">
        <div class="section-heading">
          <span>01</span>
          <div>
            <h2 id="teams-title">Teams</h2>
            <p>These are our local teams as you yup yup yup.</p>
          </div>
        </div>
        <div class="accordion-list">
          <button
            v-for="team in teams"
            :key="team.label"
            class="accordion-row"
            :class="team.color"
            :aria-expanded="openItem === team.label"
            @click="toggleItem(team.label)"
          >
            <Icon icon="solar:globe-bold" /><strong>{{ team.label }}</strong
            ><Icon
              class="plus"
              :icon="
                openItem === team.label ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'
              "
            />
            <span v-if="openItem === team.label" class="accordion-detail">{{ team.detail }}</span>
          </button>
        </div>
      </section>

      <section id="matches" class="content-section compact" aria-labelledby="matches-title">
        <div class="section-heading">
          <span>02</span>
          <div>
            <h2 id="matches-title">Matches</h2>
            <p>Track our next appearances and results.</p>
          </div>
        </div>
        <div class="empty-state">
          <Icon icon="solar:calendar-mark-bold" />
          <p>No matches scheduled yet.</p>
          <span>Check back soon for the next Feather fixture.</span>
        </div>
      </section>

      <section id="faq" class="content-section" aria-labelledby="faq-title">
        <div class="section-heading">
          <span>03</span>
          <div>
            <h2 id="faq-title">FAQ</h2>
            <p>Take a look at a frequently asked question.</p>
          </div>
        </div>
        <div class="accordion-list numbered">
          <button
            v-for="(faq, index) in faqs"
            :key="faq.label"
            class="accordion-row"
            :aria-expanded="openItem === faq.label"
            @click="toggleItem(faq.label)"
          >
            <span class="row-number">0{{ index + 1 }}</span
            ><strong>{{ faq.label }}</strong
            ><Icon
              class="plus"
              :icon="
                openItem === faq.label ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'
              "
            />
            <span v-if="openItem === faq.label" class="accordion-detail">{{ faq.detail }}</span>
          </button>
        </div>
      </section>

      <section id="staff" class="content-section staff-section" aria-labelledby="staff-title">
        <div class="section-heading">
          <span>04</span>
          <div>
            <h2 id="staff-title">Staff</h2>
            <p>Meet the crew that keeps Feather moving.</p>
          </div>
        </div>
        <div class="staff-grid">
          <article v-for="member in staff" :key="member.name" class="staff-card">
            <div class="staff-avatar" :style="{ backgroundColor: member.color }">
              <Icon :icon="member.icon" width="42" />
            </div>
            <div>
              <h3>{{ member.name }}</h3>
              <p>{{ member.role }}</p>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <a class="wordmark" href="#top"
        ><Icon icon="game-icons:feather" width="20" /><span>Feather</span></a
      ><span class="footer-divider">//</span><a href="#community">Legal notice</a>
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/rajdhani");

:global(:root) {
  --teal: #16d9bc;
  --ink: #080a0c;
  --muted: #7c8588;
  --line: #232b2d;
}
:global(html) {
  scroll-behavior: smooth;
}
:global(body) {
  background: var(--ink);
  color: #f4f7f5;
}
a {
  color: inherit;
  text-decoration: none;
}
.site-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at 74% 28%, rgba(15, 155, 137, 0.12), transparent 18rem),
    radial-gradient(#172022 1px, transparent 1px);
  background-size:
    auto,
    22px 22px;
  font-family: "Martian Mono", monospace;
}
.site-header {
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  min-height: 4.5rem;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgba(8, 10, 12, 0.88);
  backdrop-filter: blur(12px);
}
.wordmark {
  align-items: center;
  color: var(--teal);
  display: inline-flex;
  font-family: "Pixelpurl", monospace;
  font-size: 0.9rem;
  gap: 0.35rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.main-nav {
  display: flex;
  gap: clamp(0.8rem, 2vw, 2rem);
  font-size: 0.65rem;
  text-transform: uppercase;
}
.main-nav a {
  color: #c3cbca;
  padding: 1.5rem 0;
}
.main-nav a.active,
.main-nav a:hover {
  color: var(--teal);
}
.header-actions,
.social-links {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}
.action-link,
.discord-link {
  border: 1px solid #253335;
  color: var(--teal);
  font-size: 0.6rem;
  padding: 0.55rem 0.7rem;
  text-transform: uppercase;
}
.discord-link {
  background: var(--teal);
  color: #061311;
}
main {
  margin: auto;
  max-width: 62rem;
  padding: 0 1.25rem 7rem;
}
.hero {
  min-height: 37rem;
  padding-top: clamp(5rem, 13vw, 10rem);
  text-align: center;
}
.eyebrow,
.card-kicker {
  color: var(--teal);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.hero h1 {
  color: var(--teal);
  font-family: "Pixelpurl", monospace;
  font-size: clamp(2.3rem, 7vw, 5.2rem);
  line-height: 1;
  margin: 1rem 0;
  text-transform: uppercase;
}
.hero-subtitle {
  color: #e8eceb;
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}
.hero-subtitle span {
  color: var(--teal);
  margin: 0 0.7rem;
}
.hero-card {
  border: 1px solid var(--teal);
  margin: 3rem auto 1.5rem;
  max-width: 43rem;
  padding: 1.8rem 2rem;
}
.hero-card h2,
.section-heading h2 {
  font-family: "Rajdhani", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.hero-card p:last-child {
  color: var(--muted);
  font-size: 0.64rem;
  line-height: 1.7;
  margin: 0.9rem auto 0;
  max-width: 38rem;
}
.social-links {
  justify-content: center;
  flex-wrap: wrap;
}
.social-links a {
  border: 1px solid var(--line);
  font-size: 0.6rem;
  padding: 0.55rem 0.7rem;
  text-transform: uppercase;
}
.social-links a:hover {
  border-color: var(--teal);
  color: var(--teal);
}
.content-section {
  margin-top: 6rem;
  scroll-margin-top: 6rem;
}
.section-heading {
  align-items: flex-start;
  background: linear-gradient(90deg, rgba(18, 104, 96, 0.22), transparent);
  border-left: 2px solid var(--teal);
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
}
.section-heading > span {
  color: var(--teal);
  font-size: 0.6rem;
  padding-top: 0.5rem;
}
.section-heading h2 {
  font-size: 1.7rem;
}
.section-heading p {
  color: var(--muted);
  font-size: 0.57rem;
  margin-top: 0.2rem;
}
.accordion-list {
  border-top: 1px solid var(--line);
}
.accordion-row {
  align-items: center;
  background: rgba(5, 7, 8, 0.65);
  border: 0;
  border-bottom: 1px solid var(--line);
  color: #f4f7f5;
  cursor: pointer;
  display: grid;
  font-family: inherit;
  font-size: 0.65rem;
  gap: 1rem;
  grid-template-columns: 1.1rem 1fr 1.25rem;
  padding: 0.9rem 1rem;
  position: relative;
  text-align: left;
  width: 100%;
}
.accordion-row > svg:first-child {
  color: var(--teal);
}
.accordion-row.red > svg:first-child {
  color: #ff5265;
}
.accordion-row.orange > svg:first-child {
  color: #ffbd6b;
}
.accordion-row.blue > svg:first-child {
  color: #45aef4;
}
.accordion-row:hover {
  background: rgba(22, 217, 188, 0.07);
}
.plus {
  color: var(--muted);
}
.accordion-detail {
  color: var(--muted);
  font-size: 0.58rem;
  grid-column: 2 / 3;
  line-height: 1.6;
}
.row-number {
  color: #51595b;
  font-size: 0.55rem;
}
.numbered .accordion-row {
  grid-template-columns: 1.1rem 1fr 1.25rem;
}
.empty-state {
  align-items: center;
  border: 1px dashed var(--line);
  color: var(--muted);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2.5rem 1rem;
  text-align: center;
}
.empty-state svg {
  color: var(--teal);
}
.empty-state p {
  color: #e8eceb;
  font-family: "Rajdhani", sans-serif;
  font-size: 1.1rem;
  text-transform: uppercase;
}
.empty-state span {
  font-size: 0.58rem;
}
.staff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.staff-card {
  align-items: center;
  background: rgba(5, 7, 8, 0.7);
  border-right: 1px solid var(--line);
  display: flex;
  min-height: 7rem;
}
.staff-avatar {
  align-items: center;
  align-self: stretch;
  color: #050708;
  display: flex;
  justify-content: center;
  width: 6rem;
}
.staff-card h3 {
  font-family: "Rajdhani", sans-serif;
  font-size: 1.1rem;
  text-transform: uppercase;
}
.staff-card p {
  color: var(--muted);
  font-size: 0.55rem;
  line-height: 1.5;
  margin-top: 0.2rem;
  padding-right: 0.7rem;
}
.staff-section {
  margin-bottom: 8rem;
}
footer {
  align-items: center;
  border-top: 1px solid var(--line);
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1.8rem;
  color: var(--muted);
  font-size: 0.6rem;
}
footer .wordmark {
  font-size: 0.75rem;
}
.footer-divider {
  color: var(--teal);
}
@media (max-width: 760px) {
  .site-header {
    flex-wrap: wrap;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
  }
  .main-nav {
    order: 3;
    overflow-x: auto;
    width: 100%;
  }
  .main-nav a {
    padding: 0.5rem 0;
    white-space: nowrap;
  }
  .header-actions {
    margin-left: auto;
  }
  .hero {
    min-height: 34rem;
    padding-top: 5rem;
  }
  .hero-card {
    padding: 1.3rem 1rem;
  }
  .content-section {
    margin-top: 4rem;
  }
  .staff-grid {
    grid-template-columns: 1fr;
  }
  .staff-card {
    border-bottom: 1px solid var(--line);
    border-right: 0;
  }
  .staff-avatar {
    min-height: 5.5rem;
    width: 5.5rem;
  }
  .staff-section {
    margin-bottom: 5rem;
  }
}
</style>
