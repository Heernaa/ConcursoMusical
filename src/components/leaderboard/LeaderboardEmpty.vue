<script setup>
import EmptyState from './EmptyState.vue'

defineProps({
  // Ruta del CTA "Jugar ahora" (se pasa tal cual a EmptyState)
  ctaLink: {
    type: String,
    default: '',
  },
})
</script>

<!-- Leaderboard Empty / RiVERLAND: recuadro del leaderboard sin puntuaciones -->
<template>
  <section class="recuadro">
    <EmptyState :cta-link="ctaLink" />
  </section>
</template>

<style scoped>
@reference '../../assets/main.css';

.recuadro {
  @apply flex w-240 max-w-full flex-col items-center gap-4 border-2 border-morado-terciario bg-negro p-7;
}
</style>
