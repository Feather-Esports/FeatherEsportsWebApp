import Lenis from "lenis"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function scrollToSection(sectionId: string, options: { offset?: number; duration?: number } = {}): void {
  const section = document.getElementById(sectionId)
  if (!section) return

  const offset = options.offset ?? 72
  const duration = options.duration ?? 1.1
  const lenis = window.__lenis

  if (lenis) {
    lenis.scrollTo(section, { offset: -offset, duration })
    return
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function initLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined

  const existingLenis = window.__lenis
  if (existingLenis) return existingLenis

  const lenis = new Lenis({
    duration: 0.8,
    smoothWheel: true,
    wheelMultiplier: 0.75,
    touchMultiplier: 1,
    lerp: 0.06,
    syncTouch: false,
    gestureOrientation: "vertical",
  })

  function raf(time: number): void {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  window.__lenis = lenis
  return lenis
}
