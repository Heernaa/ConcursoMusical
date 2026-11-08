<!-- Estados: default · hover · active (pressed) · focus-visible · disabled. Slot #icono: flecha por defecto -->

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  // Nombre de la ruta. Si no se pasa, se renderiza un <button> (p. ej. "Saltar" en la partida).
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

<template>
  <component
    :is="linkTo ? RouterLink : 'button'"
    :to="linkTo ? { name: linkTo } : undefined"
    :type="linkTo ? undefined : type"
    class="secundario"
  >
    <slot></slot>
    <slot name="icono"><span class="flecha">→</span></slot>
  </component>
</template>

<style scoped>
@reference '../../assets/main.css';

.secundario {
  @apply flex h-12 cursor-pointer items-center gap-3 border border-verde-primario bg-negro px-6 font-titulo text-boton text-verde-primario uppercase;
  border-width: round(calc(2 * var(--u, 1px)), 1px);
}
.secundario:hover {
  @apply border-magenta-secundario text-magenta-secundario;
  box-shadow: 0 0 calc(16 * var(--u, 1px)) rgba(234, 51, 214, 0.5);
}
.secundario:focus-visible {
  @apply border-blanco outline-none;
  box-shadow: 0 0 0 calc(3 * var(--u, 1px)) #ea33d6;
}
.secundario:active {
  @apply border-verde-oscuro bg-verde-primario text-negro shadow-none;
}
.secundario:disabled {
  @apply cursor-not-allowed border-[#333] bg-negro text-[#6b6b6b] shadow-none;
}

.flecha {
  @apply leading-none from-magenta-secundario;
  font-size: calc(16 * var(--u, 1px));
}
</style>
