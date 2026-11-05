<!-- Estados: default · hover · active (pressed) · focus-visible · disabled. Slot #icono: flecha por defecto -->
<template>
  <button type="button" class="secundario">
    <slot>Ver line up</slot>
    <slot name="icono"><span class="flecha">→</span></slot>
  </button>
</template>

<style scoped>
@reference '../../assets/main.css';

.secundario {
  @apply flex h-12 cursor-pointer items-center gap-3 border-2 border-verde-primario bg-negro px-6 font-titulo text-boton text-verde-primario uppercase;
}
.secundario:hover {
  @apply border-magenta-secundario text-magenta-secundario shadow-[0_0_16px_rgba(234,51,214,0.5)];
}
.secundario:focus-visible {
  @apply border-blanco shadow-[0_0_0_3px_#ea33d6] outline-none;
}
.secundario:active {
  @apply border-verde-oscuro bg-verde-primario text-negro shadow-none;
}
.secundario:disabled {
  @apply cursor-not-allowed border-[#333] bg-negro text-[#6b6b6b] shadow-none;
}

.flecha {
  @apply text-[16px] leading-none font-black;
}
</style>
