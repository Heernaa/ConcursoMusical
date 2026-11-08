<script setup>
defineProps({
  // Alto y ancho en px de Figma (se escalan con --u si la vista lo define).
  // Las capas (glitch, cuerpo, pico) se estiran con la barra.
  alto: {
    type: Number,
    default: 240,
  },
  ancho: {
    type: Number,
    default: 16,
  },
  // Capas opcionales (Figma: Glitch · Corte Glitch · Pico). El Reproductor las usa sin glitch ni corte.
  glitch: {
    type: Boolean,
    default: true,
  },
  corteGlitch: {
    type: Boolean,
    default: true,
  },
  pico: {
    type: Boolean,
    default: true,
  },
})
</script>

<!-- Barra Frecuencia / RiVERLAND. Decorativa. -->
<template>
  <div
    class="barra"
    :style="{ height: `calc(${alto} * var(--u, 1px))`, width: `calc(${ancho} * var(--u, 1px))` }"
    aria-hidden="true"
  >
    <template v-if="glitch">
      <div class="glitch-magenta"></div>
      <div class="glitch-morado"></div>
    </template>
    <div class="cuerpo"></div>
    <div v-if="pico" class="pico"></div>
    <div v-if="corteGlitch" class="corte">
      <div class="hueco"></div>
      <div class="desplazado"></div>
      <div class="desplazado-2"></div>
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.barra {
  @apply relative shrink-0;
}
.glitch-magenta {
  @apply absolute top-3.75 bottom-0 -left-0.75 w-full bg-magenta-secundario opacity-80;
}
.glitch-morado {
  @apply absolute top-1.75 bottom-0 left-0.75 w-full bg-morado-terciario opacity-85;
}
.cuerpo {
  @apply absolute top-2.5 bottom-0 left-0 w-full bg-linear-to-b from-verde-primario to-verde-oscuro;
  box-shadow: 0 0 calc(12 * var(--u, 1px)) rgba(117, 251, 77, 0.45);
}
.pico {
  @apply absolute top-0 left-0 h-1 w-full bg-blanco;
}
.corte {
  @apply absolute top-[29.17%] bottom-[65.83%] left-0 w-full;
}
.hueco {
  @apply absolute top-0 left-0 h-1 w-full bg-negro;
}
.desplazado {
  @apply absolute top-1.25 left-1.75 h-1.5 w-4 bg-magenta-secundario;
}
.desplazado-2 {
  @apply absolute top-0 -left-1.5 h-0.5 w-2.5 bg-verde-primario;
}
</style>
