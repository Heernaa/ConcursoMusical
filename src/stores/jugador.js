import { ref } from 'vue'
import { defineStore } from 'pinia'

// Jugador de la partida actual. Lo rellena la vista Jugar y lo leerá la vista del juego.
export const useJugadorStore = defineStore('jugador', () => {
  const nombre = ref('')

  function registrar(nuevoNombre) {
    nombre.value = nuevoNombre.trim()
  }

  return { nombre, registrar }
})
