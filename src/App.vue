<script setup lang="ts">
import NavBar from './components/navigation/NavBar.vue'
</script>

<template>
  <div class="contenedor">
    <NavBar /> 
    <RouterView class="flex-1"/>
  </div>
</template>

<style scoped>
  .contenedor{
    @apply flex min-h-full flex-col
  }
</style>
