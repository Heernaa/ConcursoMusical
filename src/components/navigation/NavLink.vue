<!--
  Estados: default · hover · active (pressed) · focus-visible
  · activo (aria-current="page") · disabled (aria-disabled="true")
-->

<script setup>
const { linkTo } = defineProps({
  linkTo: { type: String, requiered: true},
})
</script>

<template>
  <RouterLink class="enlace" :to="linkTo">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
@reference '../../assets/main.css';

.enlace {
  @apply inline-flex cursor-pointer items-center border-2 border-transparent px-4 py-3 font-titulo text-boton text-blanco uppercase;
}
.enlace:hover {
  @apply border-verde-primario text-verde-primario shadow-[0_0_12px_rgba(117,251,77,0.35)];
}
.enlace:focus-visible {
  @apply border-magenta-secundario shadow-[0_0_12px_rgba(234,51,214,0.6)] outline-none;
}
.enlace:active {
  @apply border-transparent bg-verde-oscuro text-negro shadow-none;
}
.enlace[aria-current='page'] {
  @apply border-verde-primario bg-verde-primario text-negro;
}
.enlace[aria-current='page']:hover {
  @apply text-negro;
}
.enlace[aria-disabled='true'] {
  @apply pointer-events-none text-[#6b6b6b];
}
</style>
