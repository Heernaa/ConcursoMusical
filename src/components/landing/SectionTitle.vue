<!-- Section Title / RiVERLAND. Slot por defecto: título · #subtitulo -->
<template>
  <div class="seccion">
    <h2 class="titulo"><slot>¿Cómo funciona?</slot></h2>
    <p class="subtitulo">
      <slot name="subtitulo">Un juego simple pero adictivo que pondrá a prueba tus conocimientos musicales</slot>
    </p>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.seccion {
  @apply flex w-200 max-w-full flex-col items-center gap-4 text-center;
}
.titulo {
  @apply font-cuerpo text-titular font-black uppercase;
}
.subtitulo {
  @apply font-cuerpo text-lead font-light opacity-85;
}
</style>
