<script setup>
import MarcadorPuntos from '@/components/game/MarcadorPuntos.vue'

defineProps({
  titulo: {
    type: String,
    default: 'Adivina la canción',
  },
  jugador: {
    type: String,
    default: 'Javi',
  },
  puntos: {
    type: [String, Number],
    default: 20,
  },
})
</script>

<!-- Header Juego / RiVERLAND. Título + jugador a la izquierda, marcador de puntos a la derecha. -->
<template>
  <header class="header-juego">
    <div class="juego">
      <span class="icono">
        <img src="@/assets/icons/nota.svg" alt="" class="nota" />
      </span>
      <div class="textos">
        <h1 class="titulo">{{ titulo }}</h1>
        <p class="jugador">Jugador · {{ jugador }}</p>
      </div>
    </div>
    <MarcadorPuntos :puntos="puntos" />
  </header>
</template>

<style scoped>
@reference '../../assets/main.css';

.header-juego {
  @apply flex w-full items-center justify-between gap-6;
}
.juego {
  @apply flex min-w-0 items-center gap-4;
}
.icono {
  @apply grid size-14 shrink-0 place-items-center bg-magenta-secundario shadow-bloque-verde-4;
}
.nota {
  @apply size-8;
}
.textos {
  @apply flex min-w-0 flex-col gap-1 font-cuerpo font-bold whitespace-nowrap;
}
/* Anula el estilo base de h1 (BBH Bartle): en Figma es Beiruti Bold (Lead Strong) */
.titulo {
  @apply font-cuerpo text-lead-strong font-bold tracking-normal text-blanco uppercase;
}
.jugador {
  @apply font-cuerpo text-base/[1.4] font-bold text-verde-primario;
}
</style>
