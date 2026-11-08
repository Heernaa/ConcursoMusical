import { onMounted, onBeforeUnmount } from 'vue'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const DURATION_MS = 2000
const CYCLE_MS = 120 // tiempo base entre cambios de letra; súbelo para ir más lento

/**
 * Efecto "decodificado" al hacer hover/focus: las letras muestran caracteres
 * aleatorios (A-Z, 0-9) y se resuelven al azar hasta formar el texto original.
 * El color lo gestiona el CSS del elemento (clase `.noise` en los caracteres sin resolver).
 *
 * @param {import('vue').Ref<HTMLElement|null>} containerRef contenedor de los títulos
 * @param {string} selector selector de los elementos a animar dentro del contenedor
 */
export function useGlitchText(containerRef, selector = 'h1') {
  const cleanups = []

  function setup(el) {
    const text = el.textContent.trim()
    el.textContent = ''
    el.setAttribute('aria-label', text)
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0')

    const chars = [...text].map((c) => {
      const span = document.createElement('span')
      span.className = 'ch'
      span.textContent = c
      span.dataset.c = c
      span.setAttribute('aria-hidden', 'true')
      el.appendChild(span)
      return span
    })

    let raf = 0

    const reset = () => {
      cancelAnimationFrame(raf)
      chars.forEach((s) => {
        s.textContent = s.dataset.c
        s.classList.remove('noise')
        s.style.minWidth = ''
      })
    }

    const start = () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      cancelAnimationFrame(raf)
      // Fija el ancho de cada letra para que el título no se mueva mientras cicla
      chars.forEach((s) => {
        s.style.minWidth = `${s.getBoundingClientRect().width}px`
      })
      const t0 = performance.now()
      const resolveAt = chars.map(
        (_, i) => DURATION_MS * 0.25 + Math.random() * DURATION_MS * 0.7 + i * 10,
      )
      const nextAt = chars.map(() => 0)

      const tick = (now) => {
        const t = now - t0
        let done = true
        chars.forEach((s, i) => {
          if (s.dataset.c === ' ') return
          if (t >= resolveAt[i]) {
            s.textContent = s.dataset.c
            s.classList.remove('noise')
          } else {
            done = false
            if (t >= nextAt[i]) {
              s.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0]
              s.classList.add('noise')
              nextAt[i] = t + CYCLE_MS * (0.7 + Math.random() * 0.6)
            }
          }
        })
        if (!done) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    el.addEventListener('mouseenter', start)
    el.addEventListener('focus', start)
    el.addEventListener('mouseleave', reset)
    el.addEventListener('blur', reset)

    cleanups.push(() => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', start)
      el.removeEventListener('focus', start)
      el.removeEventListener('mouseleave', reset)
      el.removeEventListener('blur', reset)
    })
  }

  onMounted(() => {
    containerRef.value?.querySelectorAll(selector).forEach(setup)
  })

  onBeforeUnmount(() => cleanups.forEach((fn) => fn()))
}
