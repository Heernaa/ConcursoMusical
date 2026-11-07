<script setup>
import { computed } from 'vue'

// Alturas (px) de las 10 barras según Figma: podio (1º-3º) y resto de posiciones
const ALTURAS_PODIO = [18, 29, 39, 23, 34, 44, 26, 36, 21, 31]
const ALTURAS_COMPACTO = [14, 22, 30, 18, 26, 34, 20, 28, 16, 24]

const props = defineProps({
  // Nº de aciertos (0-10): una barra encendida por acierto
  aciertos: {
    type: Number,
    required: true,
  },
  // Versión pequeña (posiciones 4º en adelante)
  compacto: {
    type: Boolean,
    default: false,
  },
})

const barras = computed(() =>
  (props.compacto ? ALTURAS_COMPACTO : ALTURAS_PODIO).map((altura, i) => ({
    altura,
    activa: i < props.aciertos,
  })),
)
</script>

<!-- Ecualizador / B. Las barras activas usan `currentColor`: el color lo pone el padre. -->
<template>
  <div class="ecualizador" role="img" :aria-label="`${aciertos} de 10 aciertos`">
    <span
      v-for="(barra, i) in barras"
      :key="i"
      class="barra"
      :class="{ apagada: !barra.activa }"
      :style="{ height: `${barra.altura}px` }"
    ></span>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.ecualizador {
  @apply flex shrink-0 items-end gap-1;
}
.barra {
  @apply w-1.5 shrink-0 rounded-[2px] bg-current transition-colors duration-200;
}
.barra.apagada {
  @apply bg-gris-borde;
}
</style>
