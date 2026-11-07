<!-- Step Card / RiVERLAND · Acento=Verde. Slots: #icono · título (defecto) · #descripcion -->
<template>
  <article class="tarjeta">
    <div class="icono">
      <slot name="icono"><img src="@/assets/icons/nota.svg" alt="" class="glifo" /></slot>
    </div>
    <h3 class="titulo"><slot>Escucha</slot></h3>
    <p class="descripcion">
      <slot name="descripcion">Reproduce un fragmento de 5 segundos de una cancion popular</slot>
    </p>
  </article>
</template>

<style scoped>
@reference '../../assets/main.css';

.tarjeta {
  @apply flex min-w-0 flex-1 flex-col items-center gap-6 border-2 border-verde-primario bg-negro p-8 drop-shadow-[8px_8px_0_var(--color-magenta-secundario)];
}
.icono {
  @apply grid size-16 shrink-0 place-items-center bg-verde-primario;
}
.glifo {
  @apply size-8;
}
.titulo {
  @apply text-center font-titulo text-h3 uppercase;
}
.descripcion {
  @apply text-center font-subtitulo text-lead font-light opacity-85;
}
</style>
