<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  // Nombre de la ruta. Si no se pasa, se renderiza un <button> (p. ej. para enviar un formulario).
  linkTo: {
    type: String,
    default: '',
  },
  // Tipo del <button> cuando no hay linkTo
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<!-- Estados: default · hover · active (pressed) · focus-visible · disabled -->
<template>
  <component
    :is="linkTo ? RouterLink : 'button'"
    :to="linkTo ? { name: linkTo } : undefined"
    :type="linkTo ? undefined : type"
    class="primario"
  >
    <span class="etiqueta"><slot>Participar</slot></span>
    <span class="flecha">→</span>
  </component>
</template>

<style scoped>
@reference '../../assets/main.css';

.primario {
  @apply flex cursor-pointer items-start overflow-clip border border-morado-terciario bg-negro;
  border-width: round(calc(2 * var(--u, 1px)), 1px);
  box-shadow: 0 0 calc(12 * var(--u, 1px)) rgba(117, 251, 77, 0.45);
}
.primario:hover {
  @apply border-verde-primario;
  box-shadow: 0 0 calc(19 * var(--u, 1px)) rgba(234, 51, 214, 0.7);
}
.primario:focus-visible {
  @apply border-blanco outline-none;
  box-shadow:
    0 0 0 calc(3 * var(--u, 1px)) #ea33d6,
    0 0 calc(12 * var(--u, 1px)) rgba(117, 251, 77, 0.45);
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
  @apply flex items-center bg-morado-terciario p-3.5 leading-none font-black text-blanco;
  font-size: calc(16 * var(--u, 1px));
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
