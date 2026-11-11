import { ref } from 'vue'
import { defineStore } from 'pinia'

// Jugador de la partida actual. Lo rellena la vista Jugar y lo leerá la vista del juego.
export const useJugadorStore = defineStore('jugador', () => {
  const nombre = ref('')
  const numAciertos = ref(0)
  const listaAciertos = ref([])

  function registrar(nuevoNombre) {
    nombre.value = nuevoNombre.trim()
  }

  function sumarAcierto() {
    numAciertos.value += 1
  }

  function registrarRespuesta(respuesta) {
    listaAciertos.value.push(respuesta)
  }

  return { nombre, registrar, sumarAcierto, registrarRespuesta, listaAciertos, numAciertos }
})
