<script setup>
defineProps({
  puntos: {
    type: [String, Number],
    default: 20,
  },
})
</script>

<!-- Marcador Puntos / RiVERLAND. Marcador de puntos del jugador en partida. -->
<template>
  <div class="marcador">
    <span class="icono">
      <img src="@/assets/icons/trofeo-marcador.svg" alt="" class="trofeo" />
    </span>
    <p class="puntos">{{ puntos }}</p>
    <p class="unidad">pts</p>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.marcador {
  @apply flex shrink-0 items-center gap-3.5 border-2 border-verde-primario bg-negro py-2.5 pr-5 pl-2.5 shadow-bloque-morado-6;
}
.icono {
  @apply grid size-11 shrink-0 place-items-center bg-verde-primario;
}
.trofeo {
  @apply size-6.5;
}
.puntos {
  @apply font-titulo text-h2 whitespace-nowrap text-verde-primario uppercase;
}
.unidad {
  @apply font-titulo text-boton whitespace-nowrap text-blanco uppercase;
}
</style>
