<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useJugadorStore } from '@/stores/jugador'
import PosterJugar from '@/components/game/PosterJugar.vue'
import PasoInstruccion from '@/components/game/PasoInstruccion.vue'
import InputNombre from '@/components/game/InputNombre.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import GameSection from '@/components/game/GameSection.vue'
import JuegoView from './JuegoView.vue'

// TODO: nombre de la ruta de la vista del juego, cuando exista
const RUTA_PARTIDA = 'partida'
const ERROR_NOMBRE_VACIO = 'Escribe un nombre para poder jugar'
const ERROR_NOMBRE_CORTO = 'El nombre debe tener al menos 3 caracteres'

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
  } else if (nombre.value.trim().length < 3) {
    error.value = ERROR_NOMBRE_CORTO
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
  <main v-if="jugador.nombre === ''" class="jugar">
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

        <div class="divisor" aria-hidden="true"></div>

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
  <main v-else>
    <JuegoView />
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

/*
  Escalado relativo al diseño de Figma (frame de 1280 × 813: navbar de 88 px + cuerpo de 725 px).
  --u equivale a "1 px de Figma". En pantallas grandes vale lo que haga falta para que el cuerpo
  quepa entero, tanto a lo ancho como a lo alto (a 1280 × 813 vale exactamente 1px; en 2K, ~1.7px).
  Tailwind 4 calcula todos los espaciados (p-*, gap-*, w-*, size-*...) como var(--spacing) × N y
  los tamaños de texto del tema como var(--text-*), así que redefinirlos aquí escala toda la vista
  (incluidos los botones y la barra de frecuencia) sin tocar cada clase.
*/
.jugar {
  --u: 1px;
  /* Alto del NavBar de App.vue (h-22). Si cambias su altura, cámbialo también aquí. */
  --alto-navbar: 5.5rem;
  @apply flex items-stretch max-lg:flex-col;
}
@media (width >= 64rem) {
  .jugar {
    /*
      La vista mide exactamente el alto de la pantalla menos el NavBar: nunca hay scroll.
      flex: none anula el flex-1 que pone App.vue en <RouterView>; si no, el navegador usaría el
      alto del contenido (que por redondeos puede pasarse en una fracción de píxel) en vez de este.
    */
    flex: none;
    height: calc(100svh - var(--alto-navbar));
    overflow: hidden;
    /* 727 en vez de 725: margen para los redondeos de interlineado, así nada se corta */
    --u: min(calc(100vw / 1280), calc((100svh - var(--alto-navbar)) / 727));
    --spacing: calc(var(--u) * 4);
    --text-boton: calc(14 * var(--u));
    --text-base: calc(16 * var(--u));
    --text-cuerpo: calc(20 * var(--u));
    --text-h4: calc(24 * var(--u));
  }
}
/* En móvil, los textos grandes (titular, título) se reducen para que quepan */
@media (width < 40rem) {
  .jugar {
    --u: 0.65px;
  }
}
.jugar > .poster {
  @apply max-lg:w-full;
}

/* Columna derecha */
.registro {
  @apply flex min-w-0 flex-1 bg-negro p-18 max-sm:px-6 max-sm:py-12;
}
/* Como en Figma: todo el contenido ocupa el ancho del panel (menos el padding) */
.contenido {
  @apply flex w-full flex-col gap-8;
}

.encabezado {
  @apply flex flex-col gap-2;
}
.titulo {
  @apply font-cuerpo leading-[1.1] font-black tracking-[0.02em] text-verde-primario uppercase;
  font-size: calc(44 * var(--u, 1px));
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

/*
  Divisor de Figma (576px de ancho) repetido a lo ancho para que ocupe todo el panel sin estirar los
  trazos. El patrón es de 18px (trazo de 10 + hueco de 8) y 576 = 32 × 18, así que encaja sin cortes.
  En Figma la línea mide 0 de alto y el trazo de 2px se dibuja hacia arriba: el margen negativo hace
  que no ocupe espacio en el flujo, igual que en el diseño.
*/
.divisor {
  @apply -mt-0.5 h-0.5 w-full shrink-0 bg-repeat-x;
  background-image: url('@/assets/divisor.svg');
  background-size: calc(576 * var(--u, 1px)) 100%;
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
