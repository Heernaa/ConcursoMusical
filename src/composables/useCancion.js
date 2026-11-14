import { Howl } from 'howler'
import { ref, shallowRef, watch, onBeforeUnmount } from 'vue'

export default function useCancion(ruta) {
  const DURACION_MS = 5000

// shallowRef, en lloc de mutar sobre totes les propietats, ho fa unicament sobre el objecte que rep,per tant, nomes al canviar el Howl
  const sonido = shallowRef(null)
  const reproduciendo = ref(false)
  const progreso = ref(0)
  const errorAudio = ref(null)
  let raf = null


  function bucle() {
    const s = sonido.value
    if (!s) return
  // calcula sobre 100, el proges del so, en base als 5000 ms, utilitzant el metode 'seek' de howler, que retorna el punt de la canço en la que es troba el só
    // Con html5: true, seek() devuelve el Howl (no un número) mientras el audio no ha cargado
    const posicion = s.seek()
    if (typeof posicion === 'number') {
      progreso.value = Math.min(100, ((posicion * 1000) / DURACION_MS) * 100)
    }
  // Si el progrés supera el 100%, retorna parar(), que es una funció en la que s'atura el só
    if (progreso.value >= 100) return parar()
  // Si el progrés esta dins la finestra de 5000 ms, es fa la animación amb el bucle
    raf = requestAnimationFrame(bucle)
  }

  function limpiar() {
//  es cancela la animació
    cancelAnimationFrame(raf)
    sonido.value?.unload()
    sonido.value = null
    reproduciendo.value = false
    progreso.value = 0
// reset dels valors que s'utilitzen al ../views/JuegoView.vue per pintar la vista
  }

  watch(
  // es revisa els canvis en la ruta de la canço, al canviar el valor s'executa la resta
    ruta,
  // 'src' agafa el nou valor de ruta, en cas de necesitar el valor anterior sería: watch(ruta, (nueva, anterior))
    (src) => {
      limpiar()
      if (!src) return
  // Si no hay valor en 'src', se retorna con los datos limpios
      sonido.value = new Howl({
        src: [encodeURI(src)],
        html5: true, // mp3 completos: no decodificar todo el archivo

// En los diferentos eventos, se cambian los parametros para el renderizado del la vista
        onplay: () => {
          reproduciendo.value = true
          // Evita dos bucles en paralelo si ya había uno en marcha
          cancelAnimationFrame(raf)
          bucle()
        },
        onpause: () => {
          // En pausa el progreso no avanza: se detiene el bucle hasta el siguiente play
          cancelAnimationFrame(raf)
          reproduciendo.value = false
        },
        onstop: () => {
          reproduciendo.value = false
        },
        onloaderror: (_, e) => {
          errorAudio.value = e
        },
      })
    },
    { immediate: true },
  )

// Función para alternar el estado de la reproduccion y los parametros para el renderizado, segun el valor de reproduciendo, en el boton del componente
  const alternar = () => (reproduciendo.value ? sonido.value?.pause() : sonido.value?.play())

// Función para detener la canción, para la animación y por el evento de 'onstop' también se cambia el renderizado en el momento de confirmación de opcion
  function parar() {
    cancelAnimationFrame(raf)
    sonido.value?.stop()
    // stop() devuelve el audio al inicio: se reinicia la barra para poder volver a escuchar los 5 s
    progreso.value = 0
  }

// Antes de desmontar el componente se limpian los datos, para no continuar con la reproduccion tras desmontar este
  onBeforeUnmount(limpiar)

// Retorno de los parametros y funciones
  return { reproduciendo, progreso, errorAudio, alternar, parar, DURACION_MS }
}
