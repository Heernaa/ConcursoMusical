<script setup>
import { computed } from 'vue'
import LeaderboardEntry from './LeaderboardEntry.vue'

const props = defineProps({
  // Entradas ya ordenadas de mejor a peor: [{ nombre, aciertos, tiempo, puntos }]
  entradas: {
    type: Array,
    required: true,
  },
  // Cifra de la cabecera ("1.284 jugadores esta semana")
  jugadores: {
    type: Number,
    default: 0,
  },
})

const jugadoresTexto = computed(() => String(props.jugadores).replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
</script>

<!-- Leaderboard List / B — Ecualizador. Slots: #etiqueta · #titulo · #estadistica -->
<template>
  <section class="lista">
    <header class="cabecera">
      <div class="titulos">
        <p class="etiqueta"><slot name="etiqueta">Ranking global · Temporada 01</slot></p>
        <h2 class="titulo"><slot name="titulo">Top 10</slot></h2>
      </div>
      <div class="stats">
        <slot name="estadistica">
          <span class="cifra">{{ jugadoresTexto }}</span>
          <span class="leyenda">Jugadores esta semana</span>
        </slot>
      </div>
    </header>

    <div class="columnas" aria-hidden="true">
      <span class="col-rango">#</span>
      <span class="col-jugador">Jugador</span>
      <span class="col-aciertos">Aciertos</span>
      <span class="col-puntos">Puntos</span>
    </div>

    <ol class="entradas">
      <LeaderboardEntry
        v-for="(entrada, i) in entradas"
        :key="`${i}-${entrada.nombre}`"
        :posicion="i + 1"
        :nombre="entrada.nombre"
        :aciertos="entrada.aciertos"
        :tiempo="entrada.tiempo"
        :puntos="entrada.puntos"
      />
    </ol>
  </section>
</template>

<style scoped>
@reference '../../assets/main.css';

.lista {
  @apply flex w-240 max-w-full flex-col gap-4 bg-linear-to-b from-negro to-[#2a0a4a] p-7;
}

/* Cabecera */
.cabecera {
  @apply flex w-full items-end overflow-hidden whitespace-nowrap;
}
.titulos {
  @apply flex min-w-0 flex-1 flex-col items-start;
}
.etiqueta {
  @apply font-cuerpo text-base/[1.4] font-bold text-verde-primario uppercase;
}
.titulo {
  @apply font-titulo text-display text-blanco uppercase;
}
.stats {
  @apply flex shrink-0 flex-col items-end;
}
.cifra {
  @apply font-titulo text-h4 text-blanco uppercase;
}
.leyenda {
  @apply font-cuerpo text-base/[1.4] font-light text-gris-texto uppercase;
}

/* Cabecera de columnas */
.columnas {
  @apply flex w-full items-start gap-6 border-b border-gris-borde px-6 py-2.5 font-cuerpo text-base/[1.4] font-bold text-gris-texto uppercase;
}
.col-rango {
  @apply w-22 shrink-0;
}
.col-jugador {
  @apply min-w-0 flex-1;
}
.col-aciertos {
  @apply w-24 shrink-0;
}
.col-puntos {
  @apply w-52.5 shrink-0 text-right;
}

/* Entradas */
.entradas {
  @apply m-0 flex w-full list-none flex-col p-0;
}
</style>
