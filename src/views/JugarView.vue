<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useJugadorStore } from '@/stores/jugador'
import PosterJugar from '@/components/game/PosterJugar.vue'
import PasoInstruccion from '@/components/game/PasoInstruccion.vue'
import InputNombre from '@/components/game/InputNombre.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'

// TODO: nombre de la ruta de la vista del juego, cuando exista
const RUTA_PARTIDA = 'partida'
const ERROR_NOMBRE_VACIO = 'Escribe un nombre para poder jugar'

const router = useRouter()
const jugador = useJugadorStore()

const nombre = ref(jugador.nombre)
const error = ref('')

// En cuanto el usuario vuelve a escribir, se quita el error
watch(nombre, () => {
  error.value = ''
})

function comenzar() {
  if (nombre.value.trim() === '') {
    error.value = ERROR_NOMBRE_VACIO
    return
  }

  jugador.registrar(nombre.value)

  if (router.hasRoute(RUTA_PARTIDA)) {
    router.push({ name: RUTA_PARTIDA })
  } else {
    console.warn(`[JugarView] Falta la ruta "${RUTA_PARTIDA}" para empezar la partida.`)
  }
}
</script>

<!-- MacBook Air - Jugar · Nombre V2 — Póster -->
<template>
  <main class="jugar">
    <PosterJugar />

    <section class="registro">
      <div class="contenido">
        <header class="encabezado">
          <h2 class="titulo">¿Cómo se juega?</h2>
          <p class="subtitulo">Tres pasos. Cero excusas. Ponte nombre y dale al play.</p>
        </header>

        <ol class="instrucciones">
          <PasoInstruccion acento="verde" numero="1">
            Escucha el fragmento de la canción
          </PasoInstruccion>
          <PasoInstruccion acento="magenta" numero="2">
            Elige la respuesta correcta entre 4 opciones
          </PasoInstruccion>
          <PasoInstruccion acento="morado">
            <template #icono>
              <img src="@/assets/icons/trofeo-instruccion.svg" alt="" class="icono-paso" />
            </template>
            Gana 10 puntos por cada respuesta correcta
          </PasoInstruccion>
        </ol>

        <img src="@/assets/divisor.svg" alt="" class="divisor" />

        <form class="formulario" novalidate @submit.prevent="comenzar">
          <InputNombre v-model="nombre" :error="error" />
          <div class="acciones">
            <PrimaryButton type="submit" class="comenzar">Comenzar juego</PrimaryButton>
            <SecondaryButton link-to="ranking">Ranking</SecondaryButton>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

.jugar {
  @apply flex items-stretch max-lg:flex-col;
}
.jugar > .poster {
  @apply max-lg:w-full;
}

/* Columna derecha */
.registro {
  @apply flex min-w-0 flex-1 bg-negro p-18 max-sm:px-6 max-sm:py-12;
}
.contenido {
  @apply flex w-full max-w-144 flex-col gap-8;
}

.encabezado {
  @apply flex flex-col gap-2;
}
.titulo {
  @apply font-cuerpo text-[44px]/[1.1] font-black tracking-[0.02em] text-verde-primario uppercase;
}
.subtitulo {
  @apply font-cuerpo text-cuerpo font-light text-blanco;
}

.instrucciones {
  @apply m-0 flex list-none flex-col gap-2 p-0;
}
.icono-paso {
  @apply size-7;
}

.divisor {
  @apply h-0.5 max-w-full;
}

.formulario {
  @apply flex flex-col gap-8;
}
.acciones {
  @apply flex items-center gap-4 max-sm:flex-col max-sm:items-stretch;
}
/* El primario ocupa el espacio libre y centra su texto (Figma: Label Segment flex-1) */
.comenzar {
  @apply flex-1;
}
.comenzar :deep(.etiqueta) {
  @apply flex-1 justify-center;
}
</style>
