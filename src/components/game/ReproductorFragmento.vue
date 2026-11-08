<script setup>
import BarraFrecuencia from '@/components/landing/BarraFrecuencia.vue'

defineProps({
  // Figma: Estado=Listo | Reproduciendo
  estado: {
    type: String,
    default: 'listo',
    validator: (valor) => ['listo', 'reproduciendo'].includes(valor),
  },
  tiempo: {
    type: String,
    default: '0:00 / 0:05',
  },
  ayuda: {
    type: String,
    default: 'Reproducir fragmento de 5 segundos',
  },
  // Relleno de la barra de tiempo, de 0 a 100 (%)
  progreso: {
    type: Number,
    default: 0,
  },
})

// El botón play/pausa avisa al padre; la lógica de audio vive fuera del componente
defineEmits(['alternar'])

// Alturas (px de Figma) de las 24 barras del ecualizador en cada estado
const ALTURAS_REPRODUCIENDO = [
  18, 40, 26, 58, 34, 64, 22, 48, 70, 30, 56, 38, 62, 24, 44, 66, 28, 52, 36, 60, 20, 46, 32, 54,
]
const ALTURAS_LISTO = [
  6, 10, 7, 15, 9, 16, 6, 12, 18, 8, 14, 10, 16, 6, 11, 17, 7, 13, 9, 15, 6, 12, 8, 14,
]
const ANCHO_BARRA = 10
</script>

<!-- Reproductor / RiVERLAND. Botón play/pausa + ecualizador + timeline del fragmento de 5 s. -->
<template>
  <div class="reproductor" :class="estado">
    <button
      type="button"
      class="play"
      :aria-label="estado === 'reproduciendo' ? 'Pausar fragmento' : 'Reproducir fragmento'"
      @click="$emit('alternar')"
    >
      <img v-if="estado === 'reproduciendo'" src="@/assets/icons/pausa.svg" alt="" class="icono" />
      <img v-else src="@/assets/icons/play.svg" alt="" class="icono" />
    </button>

    <div class="pista">
      <div class="ecualizador" aria-hidden="true">
        <BarraFrecuencia
          v-for="(alto, i) in estado === 'reproduciendo' ? ALTURAS_REPRODUCIENDO : ALTURAS_LISTO"
          :key="i"
          :alto="alto"
          :ancho="ANCHO_BARRA"
          :glitch="false"
          :corte-glitch="false"
          class="barra"
        />
      </div>

      <div class="timeline">
        <img src="@/assets/icons/volumen.svg" alt="" class="volumen" />
        <div class="track">
          <div class="relleno" :style="{ width: `${progreso}%` }"></div>
        </div>
        <p class="tiempo">{{ tiempo }}</p>
      </div>

      <p class="ayuda">{{ ayuda }}</p>
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.reproductor {
  @apply flex min-w-0 items-center gap-10;
}

/* Botón play / pausa */
.play {
  @apply grid size-32 shrink-0 cursor-pointer place-items-center bg-verde-primario shadow-bloque-morado-8 outline-none;
}
.reproduciendo .play {
  @apply bg-magenta-secundario shadow-bloque-verde-8;
}
.play:focus-visible {
  outline: calc(3 * var(--u, 1px)) solid var(--color-blanco);
  outline-offset: calc(3 * var(--u, 1px));
}
.icono {
  @apply size-14;
}

/* Pista */
.pista {
  @apply flex min-w-0 flex-1 flex-col items-start gap-4 overflow-hidden;
}
.ecualizador {
  @apply flex h-18 w-full items-end gap-1.5 overflow-hidden;
}
.listo .barra {
  @apply opacity-50;
}

.timeline {
  @apply flex w-full items-center gap-4;
}
.volumen {
  @apply size-6 shrink-0;
}
.track {
  @apply flex h-2 min-w-0 flex-1 overflow-hidden bg-blanco/15;
}
.relleno {
  @apply h-full bg-verde-primario;
}
.tiempo {
  @apply shrink-0 font-titulo text-boton whitespace-nowrap text-blanco uppercase;
}
.reproduciendo .tiempo {
  @apply text-verde-primario;
}

.ayuda {
  @apply font-cuerpo text-cuerpo font-light whitespace-nowrap text-blanco/60;
}
</style>
