<script setup>
defineProps({
  // Figma: Estado=Completado | Actual | Pendiente
  estado: {
    type: String,
    default: 'completado',
    validator: (valor) => ['completado', 'actual', 'pendiente'].includes(valor),
  },
})
</script>

<!-- Segmento Progreso / RiVERLAND. Un segmento de la barra de progreso (1 por pregunta). -->
<template>
  <span class="segmento" :class="estado"></span>
</template>

<style scoped>
@reference '../../assets/main.css';

.segmento {
  @apply block h-3 min-w-0 flex-1;
}
.completado {
  @apply bg-verde-primario;
}
.actual {
  @apply bg-magenta-secundario shadow-glow-magenta;
}
.pendiente {
  @apply bg-blanco/15;
}
</style>
