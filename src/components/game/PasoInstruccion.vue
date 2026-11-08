<script setup>
defineProps({
  // Color del badge (Figma: Acento=Verde | Magenta | Morado)
  acento: {
    type: String,
    default: 'verde',
    validator: (valor) => ['verde', 'magenta', 'morado'].includes(valor),
  },
  numero: {
    type: [String, Number],
    default: '',
  },
})
</script>

<!-- Instrucción / RiVERLAND. Slots: texto (defecto) · #icono (sustituye al número). Va dentro de un <ol>. -->
<template>
  <li class="paso" :class="acento">
    <span class="badge" aria-hidden="true">
      <slot name="icono">{{ numero }}</slot>
    </span>
    <p class="texto"><slot>Escucha el fragmento de la canción</slot></p>
  </li>
</template>

<style scoped>
@reference '../../assets/main.css';

.paso {
  @apply flex w-full items-center gap-5 py-3;
}
.badge {
  @apply grid size-12 shrink-0 place-items-center overflow-hidden font-titulo text-h4 uppercase;
}
.verde .badge {
  @apply bg-verde-primario text-negro shadow-[4px_4px_0_var(--color-magenta-secundario)];
}
.magenta .badge {
  @apply bg-magenta-secundario text-negro shadow-[4px_4px_0_var(--color-morado-terciario)];
}
.morado .badge {
  @apply bg-morado-terciario text-blanco shadow-[4px_4px_0_var(--color-verde-primario)];
}
.texto {
  @apply min-w-0 flex-1 font-cuerpo text-cuerpo font-light text-blanco;
}
</style>
