<script setup>
import { useJugadorStore } from '@/stores/jugador';

const jugador = useJugadorStore()
</script>

<template>
  <section class="seccion">
    <h2 class="titulo">Jugador: {{ jugador.nombre }}</h2>

    <!-- Input Nombre / RiVERLAND -->
    <div class="bloque">
      <h4 class="subtitulo">Input Nombre</h4>
      <label class="campo">
        <span class="etiqueta">Tu nombre</span>
        <span class="caja">
          <img src="@/assets/icons/usuario.svg" alt="" class="icono" />
          <input type="text" placeholder="Introduce tu nombre" class="entrada" />
        </span>
      </label>
    </div>

    <!-- Opción Respuesta / RiVERLAND -->
    <div class="bloque">
      <h4 class="subtitulo">Opción Respuesta</h4>
      <button type="button" class="opcion">
        <span class="letra">A</span>
        <span class="respuesta">Rolling in the Deep</span>
        <span class="estado"></span>
      </button>
    </div>
  </section>
</template>

<style scoped>
@reference '../../assets/main.css';

.seccion {
  @apply flex flex-col gap-8;
}
.titulo {
  @apply font-titulo text-h2 uppercase;
}
.bloque {
  @apply flex flex-col gap-4;
}
.subtitulo {
  @apply font-subtitulo text-h4 uppercase;
}

/* Input Nombre */
.campo {
  @apply flex w-130 max-w-full flex-col gap-2.5;
}
.etiqueta {
  @apply font-titulo text-boton text-verde-primario uppercase;
}
.caja {
  @apply flex items-center gap-3.5 border-2 border-blanco/35 bg-negro px-5 py-4;
}
.icono {
  @apply size-6;
}
.entrada {
  @apply w-full bg-transparent font-cuerpo text-lead font-light focus:outline-none;
}
.entrada::placeholder {
  @apply text-blanco/50;
}

/* Opción Respuesta */
.opcion {
  @apply flex h-18 w-140 max-w-full items-center border-2 border-blanco/30 bg-negro text-left;
}
.letra {
  @apply grid size-18 shrink-0 place-items-center bg-morado-terciario font-titulo text-h3 uppercase;
}
.respuesta {
  @apply min-w-0 flex-1 truncate px-6 font-cuerpo text-lead-strong font-bold;
}
.estado {
  @apply size-18 shrink-0;
}
</style>
