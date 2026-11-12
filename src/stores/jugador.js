import { ref } from 'vue'
import { defineStore } from 'pinia'

// Jugador de la partida actual. Lo rellena la vista Jugar y lo leerá la vista del juego.
export const useJugadorStore = defineStore('jugador', () => {
  const nombre = ref('')
  const numAciertos = ref(0)
  const listaAciertos = ref([])
  const posicion = ref(0)

  function registrar(nuevoNombre) {
    nombre.value = nuevoNombre.trim()
  }

  function sumarAcierto() {
    numAciertos.value += 1
  }

  function registrarRespuesta(respuesta) {
    listaAciertos.value.push(respuesta);
  }

  function reiniciar() {
    nombre.value = ''
    numAciertos.value = 0
    listaAciertos.value = []
    posicion.value = 0
  }

  return { nombre, registrar, sumarAcierto, registrarRespuesta, reiniciar, listaAciertos, numAciertos, posicion }
})
