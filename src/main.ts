import "./assets/styles/colors.css"
import "./assets/styles/fonts.css"
import "./assets/styles/global.css"

import App from "./App.vue"

import { createPinia } from "pinia"
import { initLenis } from "./lib/lenis"
import { i18n } from "./locales"
import router from "./router"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

initLenis()

app.mount("#app")
