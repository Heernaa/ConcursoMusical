<script setup>
defineProps({
  // Nº de pregunta con dos cifras, p. ej. "01"
  numero: {
    type: String,
    required: true,
  },
  cancion: {
    type: String,
    required: true,
  },
  artista: {
    type: String,
    required: true,
  },
  // Figma: Resultado=Acierto | Fallo
  resultado: {
    type: String,
    default: 'acierto',
    validator: (valor) => ['acierto', 'fallo'].includes(valor),
  },
})
</script>

<!-- Resumen Respuesta / RiVERLAND. Fila del resumen: número, canción, artista y resultado (+10 / +0). -->
<template>
  <li class="fila" :class="resultado">
    <span class="numero">{{ numero }}</span>
    <div class="cancion">
      <span class="titulo">{{ cancion }}</span>
      <span class="artista">{{ artista }}</span>
    </div>
    <div class="estado">
      <img
        v-if="resultado === 'acierto'"
        src="@/assets/icons/check-24.svg"
        alt="Acierto"
        class="icono"
      />
      <img v-else src="@/assets/icons/cruz-24.svg" alt="Fallo" class="icono" />
      <span class="puntos">{{ resultado === 'acierto' ? '+10' : '+0' }}</span>
    </div>
  </li>
</template>

<style scoped>
@reference '../../assets/main.css';

.fila {
  @apply flex h-16 w-full items-center border border-blanco/15 bg-negro;
}
.numero {
  @apply grid size-16 shrink-0 place-items-center font-subtitulo text-h4 text-negro uppercase;
}
.cancion {
  @apply flex min-w-0 flex-1 flex-col items-start px-4 font-cuerpo text-base/[1.4];
}
.titulo {
  @apply max-w-full truncate font-bold text-blanco;
}
.artista {
  @apply max-w-full truncate font-light text-blanco/60;
}
.estado {
  @apply flex shrink-0 items-center gap-3 pr-5;
}
.icono {
  @apply shrink-0;
}
.puntos {
  @apply font-titulo text-boton uppercase;
}

/* Acierto */
.acierto .numero {
  @apply bg-verde-primario;
}
.acierto .puntos {
  @apply text-verde-primario;
}

/* Fallo */
.fallo .numero {
  @apply bg-magenta-secundario;
}
.fallo .puntos {
  @apply text-magenta-secundario;
}
</style>
