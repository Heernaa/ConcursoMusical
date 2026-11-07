<script setup>
import { computed } from 'vue'
import BarrasEcualizador from './BarrasEcualizador.vue'

// Variantes de podio (Figma: Posición=1º | 2º | 3º). El resto usa la variante compacta.
const PODIO = {
  1: { etiqueta: 'Campeón', acento: 'verde' },
  2: { etiqueta: 'Subcampeón', acento: 'magenta' },
  3: { etiqueta: 'Tercer puesto', acento: 'morado' },
}

const props = defineProps({
  posicion: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  // Canciones acertadas (0-10)
  aciertos: {
    type: Number,
    required: true,
  },
  // Tiempo total en segundos
  tiempo: {
    type: Number,
    required: true,
  },
  puntos: {
    type: Number,
    required: true,
  },
})

const podio = computed(() => PODIO[props.posicion] ?? null)
const posicionTexto = computed(() => String(props.posicion).padStart(2, '0'))
// Separador de miles con punto (8.450). Se evita toLocaleString('es-ES') porque no agrupa números de 4 cifras.
const puntosTexto = computed(() => String(props.puntos).replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
</script>

<!-- Leaderboard Entry / B — Ecualizador. Variante según `posicion` (1º, 2º, 3º, resto). Estados: default · hover -->
<template>
  <li class="entrada" :class="podio ? ['podio', podio.acento] : 'resto'">
    <div class="rango">
      <span class="numero">{{ posicionTexto }}</span>
    </div>

    <div class="jugador">
      <span v-if="podio" class="etiqueta">{{ podio.etiqueta }}</span>
      <span class="nombre">{{ nombre }}</span>
      <span class="detalle">{{ aciertos }}/10 aciertos · {{ tiempo }}s</span>
    </div>

    <BarrasEcualizador class="ecualizador" :aciertos="aciertos" :compacto="!podio" />

    <div class="puntuacion">
      <span class="puntos">{{ puntosTexto }}</span>
      <span class="unidad">Puntos</span>
    </div>
  </li>
</template>

<style scoped>
@reference '../../assets/main.css';

/* ---------- Comunes ---------- */
.entrada {
  @apply flex items-center gap-6 border-solid px-6 transition-[background-color,border-color] duration-200;
}
.rango {
  @apply flex shrink-0 items-center;
}
.numero {
  @apply font-titulo whitespace-nowrap uppercase transition-[color,text-shadow,-webkit-text-stroke-color] duration-200;
}
.jugador {
  @apply flex min-w-0 flex-1 flex-col items-start gap-1 overflow-hidden whitespace-nowrap;
}
.nombre {
  @apply max-w-full truncate text-blanco uppercase;
}
.detalle,
.unidad {
  @apply font-cuerpo text-base/[1.4] font-light text-gris-texto;
}
.puntuacion {
  @apply flex w-52.5 shrink-0 flex-col items-end whitespace-nowrap;
}
.puntos {
  @apply font-titulo uppercase;
}
.unidad {
  @apply uppercase;
}

/* ---------- Podio (1º, 2º, 3º) ---------- */
.verde {
  --acento: var(--color-verde-primario);
}
.magenta {
  --acento: var(--color-magenta-secundario);
}
.morado {
  --acento: var(--color-morado-terciario);
}

.podio {
  @apply border-l-2 border-(--acento) bg-linear-to-r from-(--acento)/18 to-transparent py-4;
}
.podio:hover {
  /* El borde crece 2px → 6px; el padding compensa para que el contenido no se mueva */
  @apply border-l-6 from-(--acento)/42 pl-5;
}
.podio .rango {
  @apply w-42.5;
}
.podio .numero {
  @apply text-display text-(--acento);
}
.podio:hover .numero {
  text-shadow: 0 0 18px color-mix(in srgb, var(--acento) 90%, transparent);
}
.podio .etiqueta {
  @apply font-cuerpo text-base/[1.4] font-bold text-(--acento) uppercase;
}
.podio .nombre {
  @apply font-titulo text-h4;
}
.podio .ecualizador {
  @apply text-(--acento);
}
.podio .puntos {
  @apply text-[32px]/[1.1] tracking-[0.02em] text-(--acento);
}

/* ---------- Resto (4º en adelante) ---------- */
.resto {
  @apply border-b border-gris-borde py-3.5;
}
.resto:hover {
  @apply border-l-4 border-b-transparent border-l-verde-primario bg-linear-to-r from-morado-terciario/40 to-transparent pl-5;
}
.resto .rango {
  @apply w-22;
}
.resto .numero {
  @apply text-[32px]/[1.1] tracking-[0.02em] text-transparent;
  -webkit-text-stroke: 1px var(--color-blanco);
}
.resto:hover .numero {
  @apply text-verde-primario;
  -webkit-text-stroke-color: transparent;
  text-shadow: 0 0 12px rgba(117, 251, 77, 0.6);
}
.resto .nombre {
  @apply font-subtitulo text-cuerpo/[1.2] tracking-[0.01em];
}
.resto .ecualizador {
  @apply text-morado-terciario;
}
.resto:hover .ecualizador {
  @apply text-verde-primario;
}
.resto .puntos {
  @apply text-h4 text-blanco;
}
</style>
