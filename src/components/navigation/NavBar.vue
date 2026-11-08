<script setup lang="ts">
import NavLink from './NavLink.vue'
</script>

<!-- Header / RiVERLAND. Slot por defecto: los NavLink. -->
<template>
  <header class="barra">
    <span class="titulo"><RouterLink :to="{ name: 'home' }">RiVERLAND</RouterLink></span>
    <nav class="enlaces">
      <NavLink link-to="jugar">jugar</NavLink>
      <NavLink link-to="ranking">ranking</NavLink>
    </nav>
  </header>
</template>

<style scoped>
@reference '../../assets/main.css';

.barra {
  @apply flex h-22 w-full items-center justify-between border-b border-blanco/30 px-7;
}
.titulo {
  @apply font-titulo text-h2 uppercase transition delay-50 duration-300 ease-in-out;
}
.titulo:hover {
  @apply font-titulo text-h2 uppercase text-verde-primario;
}
.enlaces {
  @apply flex items-center gap-2;
}
</style>
