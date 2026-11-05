<!-- Step Card / RiVERLAND · Acento=Morado. Slots: #icono · título (defecto) · #descripcion -->
<template>
  <article class="tarjeta">
    <div class="icono">
      <slot name="icono"><img src="@/assets/icons/corona.svg" alt="" class="glifo" /></slot>
    </div>
    <h3 class="titulo"><slot>Compite</slot></h3>
    <p class="descripcion">
      <slot name="descripcion">Gana 10 puntos por respuesta correcta y sube en el ranking</slot>
    </p>
  </article>
</template>

<style scoped>
@reference '../../assets/main.css';

.tarjeta {
  @apply flex min-w-0 flex-1 flex-col items-center gap-6 border-2 border-morado-terciario bg-negro p-8 drop-shadow-[8px_8px_0_var(--color-verde-primario)];
}
.icono {
  @apply grid size-16 shrink-0 place-items-center bg-morado-terciario;
}
.glifo {
  @apply size-8;
}
.titulo {
  @apply text-center font-titulo text-h3 uppercase;
}
.descripcion {
  @apply text-center font-cuerpo text-lead font-light opacity-85;
}
</style>
