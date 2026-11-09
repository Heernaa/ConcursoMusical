<script setup>
import { ref } from 'vue'
import { useGlitchText } from '@/composables/useGlitchText'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import TrophyIcon from '@/components/svg/TrophyIcon.vue'
import StepCardVerde from '@/components/landing/StepCardVerde.vue'
import StepCardMagenta from '@/components/landing/StepCardMagenta.vue'
import StepCardMorado from '@/components/landing/StepCardMorado.vue'

const heroTitle = ref(null)
useGlitchText(heroTitle)
</script>

<template>
  <main>
    <section class="hero">
      <h2 class="lead">¿Te crees que sabes de música?</h2>
      <div ref="heroTitle" class="heroTitle">
        <h1>10 temas</h1>
        <h1>5 segundos</h1>
        <h1>1 ranking</h1>
      </div>
      <p>
        Crea tu usuario, escucha 5 segundos de cada canción y adivínala antes que nadie. Las 10
        mejores puntuaciones entran en el leaderboard y las 3 primeras suben al podio.
      </p>
      <div class="cta">
        <PrimaryButton link-to="jugar" />
        <SecondaryButton link-to="ranking">
          ver ranking
          <template #icono><TrophyIcon /></template>
        </SecondaryButton>
      </div>
    </section>

    <section class="instructions">
      <div class="instructionsHeader">
        <h2>Como funciona</h2>
        <p>Un juego simple pero adictivo que pondra a prueba tus conocimientos musicales</p>
      </div>
      <div class="instructionsContent">
        <StepCardVerde class="intructionsCard" />
        <StepCardMagenta class="intructionsCard" />
        <StepCardMorado class="intructionsCard" />
      </div>
    </section>
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

main {
  @apply relative top-0 left-0 flex flex-col gap-0 w-full justify-center items-center;
}

h1 {
  @apply text-6xl m-0 p-0;
}

.hero {
  @apply w-full min-h-[calc(100svh-12svh)] px-30 py-12 inline-flex flex-col justify-center items-center text-center gap-6;
}

.heroTitle {
  @apply inline-flex flex-col justify-center items-center text-center gap-2;
}

/* Glitch de texto: blanco -> morado en 2s; los caracteres aleatorios ya son morados */
.heroTitle h1 {
  @apply text-blanco cursor-default outline-none transition-colors duration-300 ease-linear;
}

.heroTitle h1:hover,
.heroTitle h1:focus {
  @apply text-verde-primario;
}

.heroTitle h1 :deep(.ch) {
  @apply inline-block text-center whitespace-pre;
}

.heroTitle h1 :deep(.ch.noise) {
  @apply text-magenta-secundario;
}

.hero .lead {
  @apply text-lead-strong font-cuerpo font-bold text-verde-primario;
}

.cta {
  @apply inline-flex flex-row justify-between items-center gap-6;
}

.instructions {
  @apply w-full h-auto px-84 py-28 flex flex-col items-center gap-16;
}

.instructionsHeader {
  @apply w-5xl text-center flex flex-col gap-4;
}

.instructionsHeader h2 {
  @apply text-h2 font-titulo font-bold;
}

.instructionsHeader p {
  @apply text-base font-titulo font-medium;
}

.instructionsContent {
  @apply min-w-full min-h-full flex flex-row items-center justify-around gap-8;
}

.intructionsCard {
  @apply max-w-96;
}
</style>
