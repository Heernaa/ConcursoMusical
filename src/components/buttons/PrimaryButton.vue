<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  linkTo: {
    type: String,
    required: true,
  },
})
</script>

<!-- Estados: default · hover · active (pressed) · focus-visible · disabled -->
<template>
  <RouterLink :to="{ name: linkTo }" class="primario">
    <span class="etiqueta"><slot>Participar</slot></span>
    <span class="flecha">→</span>
  </RouterLink>
</template>

<style scoped>
@reference '../../assets/main.css';

.primario {
  @apply flex cursor-pointer items-start overflow-clip border-2 border-morado-terciario bg-negro shadow-[0_0_12px_rgba(117,251,77,0.45)];
}
.primario:hover {
  @apply border-verde-primario shadow-[0_0_19px_rgba(234,51,214,0.7)];
}
.primario:focus-visible {
  @apply border-blanco shadow-[0_0_0_3px_#ea33d6,0_0_12px_rgba(117,251,77,0.45)] outline-none;
}
.primario:active {
  @apply border-morado-terciario shadow-none;
}
.primario:disabled {
  @apply cursor-not-allowed border-[#333] shadow-none;
}

.etiqueta {
  @apply flex items-center bg-verde-primario px-6 py-3.5 font-titulo text-boton text-negro uppercase;
}
.primario:hover .etiqueta {
  @apply bg-magenta-secundario;
}
.primario:active .etiqueta {
  @apply bg-verde-oscuro;
}
.primario:disabled .etiqueta {
  @apply bg-[#141414] text-[#6b6b6b];
}

.flecha {
  @apply flex items-center bg-morado-terciario p-3.5 text-[16px] leading-none font-black text-blanco;
}
.primario:hover .flecha {
  @apply bg-verde-primario text-negro;
}
.primario:active .flecha {
  @apply bg-morado-terciario text-blanco;
}
.primario:disabled .flecha {
  @apply bg-[#1f1f1f] text-[#6b6b6b];
}
</style>
