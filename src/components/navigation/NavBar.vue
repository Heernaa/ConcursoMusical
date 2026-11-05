<script setup lang="ts">
import NavLink from './NavLink.vue';

</script>

<!-- Header / RiVERLAND. Slot por defecto: los NavLink. -->
<template>
  <header class="barra">
    <span class="titulo"><slot name="titulo">RiVERLAND</slot></span> 
    <nav class="enlaces">
      <NavLink link-to="otro">Otro</NavLink>
    </nav>
  </header>
</template>

<style scoped>
@reference '../../assets/main.css';

.barra {
  @apply flex h-22 w-full items-center justify-between border-b border-blanco/30 px-7;
}
.titulo {
  @apply font-titulo text-h2 uppercase;
}
.enlaces {
  @apply flex items-center gap-2;
}
</style>
