<script setup lang="ts">
import NavBar from './components/navigation/NavBar.vue'
</script>

<template>
  <div class="contenedor">
    <NavBar />
    <RouterView class="flex-1" />
  </div>
</template>

<style scoped>
.contenedor {
  @apply flex min-h-screen flex-col;
  /* Las vistas miden el ancho con cqw (ancho sin la barra de scroll) en vez de vw (la incluye) */
  container-type: inline-size;
}
</style>
