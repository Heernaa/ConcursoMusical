<script setup>
import HeaderJuego from '@/components/game/HeaderJuego.vue'
import ProgresoJuego from '@/components/game/ProgresoJuego.vue'
import ReproductorFragmento from '@/components/game/ReproductorFragmento.vue'
import OpcionRespuesta from '@/components/game/OpcionRespuesta.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import { useJugadorStore } from '@/stores/jugador'
import { onMounted, ref, computed, watch } from 'vue'

const jugador = useJugadorStore()

const PUNTOS_ACIERTO = 10
const NUMERO_PREGUNTAS = 10


const segmentosBase = ref(Array(NUMERO_PREGUNTAS).fill('pendiente'))

const canciones = ref([])

const cargando = ref(true)
const error = ref(null)

const indice = ref(0)
const cancionActual = computed(() => indice.value + 1)

onMounted(async () => {
  try {
    const response = await import('@/data/songs.json')
    canciones.value = response.default.songs
  } catch (e) {
    console.error(e)
    error.value = 'Error en la carga de canciones'
  } finally {
    cargando.value = false
  }
})

const cancion = computed(() => canciones.value[indice.value])
console.log(cancion)

const opciones = computed(() => cancion.value?.opciones ?? [])
console.log({ Opciones: opciones })

const opcionCorrecta = computed(() => opciones.value.find((opcion) => opcion.correcta))
const opcionesIncorrectas = computed(() => opciones.value.filter((opcion) => !opcion.correcta))

function barajar(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

const opcionesPreguntas = computed(() =>
  barajar([opcionCorrecta.value, ...barajar(opcionesIncorrectas.value).slice(0, 3)]),
)

const seleccionada = ref(null)
const seleccionConfirmada = ref(false)

function seleccionar(opcion) {
  seleccionada.value = opcion.nombre
}

function estadoOpcion(opcion) {
  if (seleccionConfirmada.value === false) {
    if (seleccionada.value === null) return 'default'
    return (seleccionada.value == opcion.nombre) ? 'seleccionada' : 'default'
  } else {
    if (opcion.nombre != seleccionada.value) {
      return 'deshabilitada'
    } else if (opcion.correcta) {
      return 'correcta'
    } else return 'incorrecta'
  }
}

const comprobado = ref(false)

function comprobarCorrecta() {
  if (seleccionada.value !== null && seleccionada.value == opcionCorrecta.value.nombre) {
    jugador.sumarAcierto()
  }
  comprobado.value = true
}

function confirmarSeleccion() {
  seleccionConfirmada.value = true
}

watch(opcionCorrecta, (valor) => {
  console.log('correcta:', valor)
})
watch(opcionesIncorrectas, (valor) => {
  console.log('incorrectas:', valor)
})
watch(opcionesPreguntas, (valor) => {
  console.log('opciones:', valor)
})

watch(indice, () => {
  seleccionada.value = null
  seleccionConfirmada.value = false
  comprobado.value = false
})

const segmentos = computed(() =>
  segmentosBase.value.map((segmento, i) => {
    if (i === indice.value) {
      return 'actual'
    } else if (i < indice.value) {
      return 'completado'
    } else {
      return 'pendiente'
    }
  }),
)

const puntos = computed(() => jugador.numAciertos * PUNTOS_ACIERTO)
const preguntaActual = computed(() => `Pregunta ${cancionActual.value}/10`)
const porcentajeActual = computed(() => `${(indice.value / 10) * 100}%`)

// TODO: solo plantilla. Todos los valores de esta vista están fijos (copiados de Figma);
// sustituirlos por el estado de la partida (store de Pinia / Howler) al dinamizarla.
</script>

<!-- MacBook Air - Juego V2 — Escenario -->
<template>
  <main v-if="cargando" class="flex flex-col min-h-full min-w-full justify-center items-center">
    <h1>Cargando...</h1>
  </main>
  <main v-else-if="error !== null" class="min-h-full min-w-full justify-center items-center">
    <h1>{{ error }}</h1>
  </main>
  <main v-else class="juego">
    <HeaderJuego titulo="Adivina la canción" :jugador="jugador.nombre" :puntos="puntos" />

    <ProgresoJuego :pregunta="preguntaActual" :porcentaje="porcentajeActual" :segmentos="segmentos" />

    <section class="escenario">
      <div class="numero-pregunta">
        <p class="numero">{{ cancionActual }}</p>
        <p class="total">de 10 temas</p>
      </div>
      <ReproductorFragmento class="reproductor" estado="reproduciendo" tiempo="0:02 / 0:05"
        ayuda="Escuchando… ¡atento al estribillo!" :progreso="40" />
    </section>

    <div class="pregunta">
      <h2 class="titulo">¿Qué canción es?</h2>
      <p class="indicacion">Elige antes de que acabe el fragmento</p>
    </div>

    <div class="opciones">
      <OpcionRespuesta v-for="(opcion, i) in opcionesPreguntas" :key="opcion.nombre"
        :letra="String.fromCharCode(65 + i)" :respuesta="opcion.nombre" :estado="estadoOpcion(opcion)"
        @click="seleccionar(opcion)" />

    </div>


    <div class="acciones">
      <p class="nota">+10 puntos si aciertas · sin penalización por fallo</p>
      <div class="botones">
        <SecondaryButton :disabled="indice >= 9 || !seleccionConfirmada" @click="indice++">Saltar</SecondaryButton>
        <PrimaryButton :disabled="comprobado" @click="confirmarSeleccion(), comprobarCorrecta(), jugador.registrarRespuesta(seleccionada)">Confirmar respuesta
        </PrimaryButton>
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

/* Cuerpo del frame: 1120 px de contenido con 80 px de margen lateral y 40 px arriba/abajo */
.juego {
  @apply mx-auto flex w-full max-w-320 flex-col gap-8 px-20 py-10 max-lg:px-10 max-sm:px-4;
}

/* Escenario: número de la pregunta + reproductor */
.escenario {
  @apply flex items-center gap-12 overflow-hidden border-2 border-magenta-secundario bg-linear-to-r from-morado-terciario to-negro px-12 py-10 shadow-bloque-magenta-12 max-lg:flex-col max-lg:items-start max-sm:px-6;
}

.numero-pregunta {
  @apply flex shrink-0 flex-col items-start font-titulo whitespace-nowrap uppercase;
}

/* 150 px en Figma: no hay token de main.css de ese tamaño */
.numero {
  @apply font-titulo leading-none tracking-[0.02em] text-verde-primario;
  font-size: calc(150 * var(--u, 1px));
}

.total {
  @apply font-titulo text-boton text-blanco;
}

.reproductor {
  @apply min-w-0 flex-1 max-lg:w-full max-sm:flex-col max-sm:items-start;
}

/* Pregunta */
.pregunta {
  @apply flex items-end justify-between gap-6 max-md:flex-col max-md:items-start;
}

.titulo {
  @apply font-cuerpo text-display font-black whitespace-nowrap text-blanco uppercase max-sm:text-h1;
}

.indicacion {
  @apply font-cuerpo text-cuerpo font-light text-blanco/60;
}

/* Opciones 2 × 2 */
.opciones {
  @apply grid grid-cols-2 gap-5 max-md:grid-cols-1;
}

/* Acciones */
.acciones {
  @apply flex items-center justify-between gap-6 pt-2 max-md:flex-col max-md:items-stretch;
}

.nota {
  @apply font-cuerpo text-base/[1.4] font-bold text-blanco/60;
}

.botones {
  @apply flex items-start gap-4 max-sm:flex-col max-sm:items-stretch;
}
</style>
