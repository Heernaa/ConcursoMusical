<script setup>
import LeaderboardEmpty from '@/components/leaderboard/LeaderboardEmpty.vue'
import { onMounted, ref } from 'vue'

const ranking = ref([])
const cargando = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const respuesta = await import('@/data/ranking.json')
    ranking.value = respuesta.default
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
    <LeaderboardEmpty v-else-if="ranking.length < 1"/>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.leaderboard {
  @apply min-w-screen min-h-full flex flex-col justify-center items-center;
}

h1 {
  @apply text-display font-titulo;
}
</style>
