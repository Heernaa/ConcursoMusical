<script setup>
import { ref } from 'vue'
import LeaderboardList from '@/components/leaderboard/LeaderboardList.vue'
import LeaderboardEntry from '@/components/leaderboard/LeaderboardEntry.vue'
import LeaderboardEmpty from '@/components/leaderboard/LeaderboardEmpty.vue'
import EmptyState from '@/components/leaderboard/EmptyState.vue'

// Datos de ejemplo (los mismos que el prototipo de Figma)
const ENTRADAS_DEMO = [
  { nombre: 'NEONKID', aciertos: 10, tiempo: 31, puntos: 9870 },
  { nombre: 'LA_RUBIA', aciertos: 10, tiempo: 34, puntos: 9420 },
  { nombre: 'BASSMAN', aciertos: 9, tiempo: 29, puntos: 8910 },
  { nombre: 'DJ_LUNA', aciertos: 9, tiempo: 38, puntos: 8450 },
  { nombre: 'TRAPQUEEN', aciertos: 8, tiempo: 41, puntos: 7980 },
  { nombre: 'ROCKOLA', aciertos: 8, tiempo: 44, puntos: 7610 },
  { nombre: 'VINILO_X', aciertos: 7, tiempo: 39, puntos: 7200 },
  { nombre: 'SOFI.WAV', aciertos: 7, tiempo: 47, puntos: 6870 },
  { nombre: 'EL_BAJISTA', aciertos: 6, tiempo: 42, puntos: 6330 },
  { nombre: 'MIXTAPE', aciertos: 6, tiempo: 50, puntos: 5940 },
]

const VARIANTES = [
  { posicion: 1, nombre: 'DJ_LUNA', aciertos: 10, tiempo: 38, puntos: 8450 },
  { posicion: 2, nombre: 'DJ_LUNA', aciertos: 10, tiempo: 38, puntos: 8450 },
  { posicion: 3, nombre: 'DJ_LUNA', aciertos: 9, tiempo: 38, puntos: 8450 },
  { posicion: 4, nombre: 'DJ_LUNA', aciertos: 9, tiempo: 38, puntos: 8450 },
]

// Nº de entradas que se muestran en el demo interactivo (0 = leaderboard vacío)
const cantidad = ref(ENTRADAS_DEMO.length)
</script>

<template>
  <main class="vista">
    <section class="seccion">
      <h2 class="titulo">Leaderboard</h2>
      <p class="aviso">
        Cambia el número de puntuaciones para ver la lista con menos entradas o el estado vacío.
      </p>
      <div class="controles">
        <label for="cantidad" class="etiqueta">Entradas: {{ cantidad }}</label>
        <input
          id="cantidad"
          v-model.number="cantidad"
          type="range"
          min="0"
          :max="ENTRADAS_DEMO.length"
          class="rango"
        />
      </div>
      <LeaderboardList
        v-if="cantidad > 0"
        :entradas="ENTRADAS_DEMO.slice(0, cantidad)"
        :jugadores="1284"
      />
      <LeaderboardEmpty v-else cta-link="otro" />
    </section>

    <section class="seccion">
      <h2 class="titulo">Leaderboard Entry</h2>
      <p class="aviso">Variantes 1º, 2º, 3º y resto. Pasa el ratón por encima para ver el hover.</p>
      <ol class="filas">
        <LeaderboardEntry v-for="v in VARIANTES" :key="v.posicion" v-bind="v" />
      </ol>
    </section>

    <section class="seccion">
      <!-- BBH Bartle no tiene glifo para "Í": se evita la tilde en el título -->
      <h2 class="titulo">Sin puntuaciones</h2>
      <div class="fila">
        <LeaderboardEmpty cta-link="otro" />
        <div class="fondo-gris">
          <EmptyState cta-link="otro" />
        </div>
        <div class="fondo-gris">
          <EmptyState titulo="Sin resultados" descripcion="Variante sin CTA" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

.vista {
  @apply flex flex-col gap-16 p-10;
}
.seccion {
  @apply flex flex-col gap-8;
}
.titulo {
  @apply font-titulo text-h2 uppercase;
}
.aviso {
  @apply font-cuerpo text-lead font-light;
}
.controles {
  @apply flex items-center gap-4;
}
.etiqueta {
  @apply w-32 font-cuerpo text-cuerpo font-bold text-verde-primario uppercase;
}
.rango {
  @apply w-64 accent-verde-primario;
}
.filas {
  @apply m-0 flex w-240 max-w-full list-none flex-col gap-10 bg-negro p-10;
}
.fila {
  @apply flex flex-wrap items-start gap-8;
}
.fondo-gris {
  @apply w-225 max-w-full bg-[#444];
}
</style>
