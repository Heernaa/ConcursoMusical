<script setup>
import SegmentoProgreso from '@/components/game/SegmentoProgreso.vue'

defineProps({
  // Texto de la izquierda, p. ej. "Pregunta 03 / 10"
  pregunta: {
    type: String,
    default: 'Pregunta 03 / 10',
  },
  // Texto de la derecha, p. ej. "30%"
  porcentaje: {
    type: String,
    default: '30%',
  },
  // Estado de cada segmento, uno por canción: 'completado' | 'actual' | 'pendiente'
  segmentos: {
    type: Array,
    default: () => [
      'completado',
      'completado',
      'actual',
      'pendiente',
      'pendiente',
      'pendiente',
      'pendiente',
      'pendiente',
      'pendiente',
      'pendiente',
    ],
  },
})
</script>

<!-- Progreso Juego / RiVERLAND. 10 segmentos (uno por canción). -->
<template>
  <div class="progreso">
    <div class="info">
      <p class="pregunta">{{ pregunta }}</p>
      <p class="porcentaje">{{ porcentaje }}</p>
    </div>
    <div class="segmentos" role="presentation">
      <SegmentoProgreso v-for="(estado, i) in segmentos" :key="i" :estado="estado" />
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.progreso {
  @apply flex w-full flex-col gap-3;
}
.info {
  @apply flex items-center justify-between gap-4 whitespace-nowrap uppercase;
}
.pregunta {
  @apply font-titulo text-boton text-blanco;
}
.porcentaje {
  @apply font-subtitulo text-h4 text-verde-primario;
}
.segmentos {
  @apply flex w-full gap-1.5;
}
</style>
