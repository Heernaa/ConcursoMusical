<!-- Barra Frecuencia / RiVERLAND. Decorativa. -->
<template>
  <div class="barra" aria-hidden="true">
    <div class="glitch-magenta"></div>
    <div class="glitch-morado"></div>
    <div class="cuerpo"></div>
    <div class="pico"></div>
    <div class="corte">
      <div class="hueco"></div>
      <div class="desplazado"></div>
      <div class="desplazado-2"></div>
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.barra {
  @apply relative h-60 w-4;
}
.glitch-magenta {
  @apply absolute top-3.75 bottom-0 -left-0.75 w-4 bg-magenta-secundario opacity-80;
}
.glitch-morado {
  @apply absolute top-1.75 bottom-0 left-0.75 w-4 bg-morado-terciario opacity-85;
}
.cuerpo {
  @apply absolute top-2.5 bottom-0 left-0 w-4 bg-linear-to-b from-verde-primario to-verde-oscuro shadow-[0_0_12px_rgba(117,251,77,0.45)];
}
.pico {
  @apply absolute top-0 left-0 h-1 w-4 bg-blanco;
}
.corte {
  @apply absolute top-[29.17%] bottom-[65.83%] left-0 w-4;
}
.hueco {
  @apply absolute top-0 left-0 h-1 w-4 bg-negro;
}
.desplazado {
  @apply absolute top-1.25 left-1.75 h-1.5 w-4 bg-magenta-secundario;
}
.desplazado-2 {
  @apply absolute top-0 -left-1.5 h-0.5 w-2.5 bg-verde-primario;
}
</style>
