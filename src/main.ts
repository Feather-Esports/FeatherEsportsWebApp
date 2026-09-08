import "./assets/styles/global.css"
import "./assets/styles/fonts.css"
import "./assets/styles/colors.css"

import { createApp } from "vue"

import App from "./App.vue"

import { createPinia } from "pinia"
import { i18n } from "./locales"
import router from "./router"
import LenisVue from "lenis/vue"

// The package provides a stylesheet without TypeScript declarations.
// @ts-expect-error -- side-effect stylesheet import
import "vue3-flag-icons/styles"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(LenisVue)

app.mount("#app")
