<script setup>
// import LeaderboardEmpty from '@/components/leaderboard/LeaderboardEmpty.vue'
import { ref } from 'vue';

// const ranking = ref([])
const cargando = ref(true)


</script>

<template>
  <section class="leaderboard">
    <h1 v-if="cargando">Cargando...</h1>
  </section>
  

</template>

<style scoped>
@reference "../assets/main.css";

.leaderboard {
  @apply min-w-screen min-h-full flex flex-col justify-center items-center
}

h1 {
  @apply text-display font-titulo
}

</style>
