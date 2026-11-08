<script setup>
import HeaderJuego from '@/components/game/HeaderJuego.vue'
import ProgresoJuego from '@/components/game/ProgresoJuego.vue'
import ReproductorFragmento from '@/components/game/ReproductorFragmento.vue'
import OpcionRespuesta from '@/components/game/OpcionRespuesta.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import { useJugadorStore } from '@/stores/jugador'
import { onMounted, ref, computed } from 'vue'

const jugador = useJugadorStore()

const canciones = ref([])
const cargando = ref(true)
const error = ref(null)

const cancionActual = ref(0)

onMounted(async () => {
  try {
    const response = await import('@/data/songs.json')
    canciones.value = response.default.songs
    console.log(canciones.value)
  } catch (e) {
      console.error(e)
      error.value = "Error en la carga de canciones"
  } finally {
    cargando.value = false
  }
})

const preguntaActual = computed(() => `Pregunta ${cancionActual.value}/10`);
const porcentajeActual = computed(() => `${(cancionActual.value/10)*100}%`)

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
    <HeaderJuego titulo="Adivina la canción" :jugador="jugador.nombre" :puntos="20" />

    <ProgresoJuego
      :pregunta="preguntaActual"
      :porcentaje="porcentajeActual"
      :segmentos="[
        'completado',
        'completado',
        'actual',
        'pendiente',
        'pendiente',
        'pendiente',
        'pendiente',
        'pendiente',
        'pendiente',
        'pendiente',
      ]"
    />

    <section class="escenario">
      <div class="numero-pregunta">
        <p class="numero">03</p>
        <p class="total">de 10 temas</p>
      </div>
      <ReproductorFragmento
        class="reproductor"
        estado="reproduciendo"
        tiempo="0:02 / 0:05"
        ayuda="Escuchando… ¡atento al estribillo!"
        :progreso="40"
      />
    </section>

    <div class="pregunta">
      <h2 class="titulo">¿Qué canción es?</h2>
      <p class="indicacion">Elige antes de que acabe el fragmento</p>
    </div>

    <div class="opciones">
      <OpcionRespuesta letra="A" respuesta="Someone Like You" />
      <OpcionRespuesta letra="B" respuesta="Rolling in the Deep" />
      <OpcionRespuesta letra="C" respuesta="Set Fire to the Rain" />
      <OpcionRespuesta letra="D" respuesta="Hello" estado="seleccionada" />
    </div>

    <div class="acciones">
      <p class="nota">+10 puntos si aciertas · sin penalización por fallo</p>
      <div class="botones">
        <SecondaryButton>Saltar</SecondaryButton>
        <PrimaryButton>Confirmar respuesta</PrimaryButton>
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
