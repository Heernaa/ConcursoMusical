<script setup>
import BarraFrecuencia from '@/components/landing/BarraFrecuencia.vue'

// Alturas (px) de las 28 barras del ecualizador, en el orden de Figma
const ALTURAS_BARRAS = [
  40, 90, 60, 130, 80, 110, 50, 140, 70, 120, 96, 44, 128, 66, 104, 36, 118, 84, 58, 134, 76, 100,
  48, 124, 90, 62, 112, 52,
]
const ANCHO_BARRA = 10
</script>

<!-- Póster (Jugar · Nombre V2). Panel magenta decorativo con el titular y el ecualizador. -->
<template>
  <aside class="poster">
    <div class="titular">
      <p class="antetitulo">Temporada 01 · Ronda express</p>
      <h1 class="frases">
        <span class="linea">10 temas.</span>
        <span class="sticker">5 seg.</span>
        <span class="linea">1 nombre.</span>
      </h1>
    </div>

    <div class="ecualizador" aria-hidden="true">
      <BarraFrecuencia
        v-for="(alto, i) in ALTURAS_BARRAS"
        :key="i"
        :alto="alto"
        :ancho="ANCHO_BARRA"
      />
    </div>

    <p class="pie">RiVERLAND Music Quiz · Edición 2027</p>
  </aside>
</template>

<style scoped>
@reference '../../assets/main.css';

.poster {
  @apply flex w-140 shrink-0 flex-col justify-between gap-10 overflow-hidden bg-magenta-secundario px-14 py-16 max-sm:px-6 max-sm:py-12;
}

/* Titular */
.titular {
  @apply flex w-full flex-col items-start gap-3 overflow-hidden;
}
.antetitulo {
  @apply font-titulo text-boton whitespace-nowrap text-negro uppercase max-sm:whitespace-normal;
}
.frases {
  @apply m-0 flex flex-col items-start gap-3 font-titulo text-[46px]/[1.05] tracking-[0.02em] whitespace-nowrap text-negro uppercase max-sm:text-[30px];
}
.sticker {
  @apply bg-negro px-4 py-2 text-verde-primario shadow-[6px_6px_0_var(--color-verde-primario)];
}

/* Ecualizador */
.ecualizador {
  @apply flex h-35 w-full shrink-0 items-end gap-1.5 overflow-hidden;
}

.pie {
  @apply font-cuerpo text-base/[1.4] font-bold whitespace-nowrap text-negro;
}
</style>
