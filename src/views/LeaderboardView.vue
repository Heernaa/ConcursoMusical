<script setup>
import LeaderboardEmpty from '@/components/leaderboard/LeaderboardEmpty.vue'
import LeaderboardList from '@/components/leaderboard/LeaderboardList.vue'
import { onMounted, ref } from 'vue'

const ranking = ref([])
const cargando = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const respuesta = await fetch('/api/ranking')
    if (!respuesta.ok) {
      throw new Error('Error en la petición')
    }
    ranking.value = await respuesta.json()
  } catch (e) {
    console.error(e)
    error.value('No se pudo cargar el JSON')
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <section class="leaderboard">
    <h1 v-if="cargando">Cargando...</h1>
    <LeaderboardEmpty v-else-if="ranking.length === 0" />
    <LeaderboardList :entradas="ranking" :jugadores="ranking.length" />
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.leaderboard {
  @apply w-full min-h-full flex flex-col justify-center items-center py-14;
}

h1 {
  @apply text-display font-titulo;
}
</style>
