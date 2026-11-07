<script setup>
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import TrophyIcon from '@/components/svg/TrophyIcon.vue'

defineProps({
  titulo: {
    type: String,
    default: 'Aún no hay puntuaciones',
  },
  descripcion: {
    type: String,
    default: '¡Sé el primero en aparecer en el ranking!',
  },
  // Nombre de la ruta a la que lleva el CTA. Si no se pasa, el CTA no se muestra.
  ctaLink: {
    type: String,
    default: '',
  },
  ctaTexto: {
    type: String,
    default: 'Jugar ahora',
  },
})
</script>

<!-- Empty State / RiVERLAND. Slot #icono: trofeo por defecto -->
<template>
  <div class="vacio">
    <div class="icono">
      <slot name="icono"><TrophyIcon class="glifo" /></slot>
    </div>
    <div class="textos">
      <h3 class="titulo">{{ titulo }}</h3>
      <p class="descripcion">{{ descripcion }}</p>
    </div>
    <PrimaryButton v-if="ctaLink" :link-to="ctaLink">{{ ctaTexto }}</PrimaryButton>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.vacio {
  @apply flex w-full flex-col items-center gap-8 px-8 py-12;
}
.icono {
  @apply grid size-24 shrink-0 place-items-center bg-morado-terciario text-negro;
}
.glifo {
  @apply size-12;
}
.textos {
  @apply flex w-full flex-col items-center gap-3 text-center text-blanco;
}
.titulo {
  @apply font-cuerpo text-[44px]/[1.1] font-black tracking-[0.02em] uppercase;
}
.descripcion {
  @apply font-cuerpo text-cuerpo font-light opacity-85;
}
</style>
