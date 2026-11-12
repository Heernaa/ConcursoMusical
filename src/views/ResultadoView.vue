<script setup>
import ProgresoJuego from '@/components/game/ProgresoJuego.vue'
import BarraFrecuencia from '@/components/landing/BarraFrecuencia.vue'
import StepCardVerde from '@/components/landing/StepCardVerde.vue'
import StepCardMagenta from '@/components/landing/StepCardMagenta.vue'
import StepCardMorado from '@/components/landing/StepCardMorado.vue'
import LeaderboardEntry from '@/components/leaderboard/LeaderboardEntry.vue'
import ResumenRespuesta from '@/components/resultado/ResumenRespuesta.vue'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import { useJugadorStore } from '@/stores/jugador'

// TODO: solo plantilla. Todos los valores de esta vista están fijos (copiados de Figma);
// sustituirlos por el estado de la partida (store de Pinia) al dinamizarla.

const VALOR_ACIERTO = 10

const jugador = useJugadorStore()

const nombre = jugador.nombre
const numAciertos = jugador.numAciertos
const listaAciertos = [...jugador.listaAciertos]

const puntuacion = VALOR_ACIERTO * numAciertos

jugador.reiniciar()

</script>

<!-- MacBook Air - Resultado V2 — Escenario -->
<template>
  <main class="resultado">
    <ProgresoJuego
      pregunta="Partida completa · 10/ 10"
      porcentaje="100%"
      :segmentos="Array(10).fill('completado')"
    />

    <section class="escenario">
      <div class="mensaje">
        <p class="etiqueta">Partida terminada</p>
        <h1 class="titulo">¡Bien jugado, {{ nombre }}!</h1>
        <p class="subtitulo">Has adivinado {{ numAciertos }} de las 10 canciones del setlist</p>
        <div class="ecualizador" aria-hidden="true">
          <BarraFrecuencia
            v-for="(alto, i) in [24, 52, 36, 68, 44, 60, 30, 72, 48, 64, 40, 56, 28, 70, 46, 62, 34, 58, 42, 66]"
            :key="i"
            :alto="alto"
            :ancho="10"
            :glitch="false"
            :corte-glitch="false"
          />
        </div>
      </div>

      <div class="puntuacion">
        <p class="puntos">{{ puntuacion }}</p>
        <p class="unidad">Puntos totales</p>
      </div>
    </section>

    <section class="estadisticas">
      <StepCardVerde>
        {{ numAciertos }} / 10
        <template #icono><img src="@/assets/icons/diana.svg" alt="" /></template>
        <template #descripcion>Aciertos · 10 puntos por cada uno</template>
      </StepCardVerde>
      <StepCardMagenta>
        {{ 10 - numAciertos }}
        <template #icono><img src="@/assets/icons/cruz-negra.svg" alt="" /></template>
        <template #descripcion>Fallos · sin penalización</template>
      </StepCardMagenta>
      <StepCardMorado>
        x4
        <template #descripcion>Mejor racha de aciertos seguidos</template>
      </StepCardMorado>
    </section>

    <section class="bloque">
      <h2 class="etiqueta">Tu puesto en el ranking</h2>
      <ul>
        <LeaderboardEntry
          :posicion="4"
          :nombre="nombre"
          :aciertos="numAciertos"
          :puntos="puntuacion"
          :detalle="`${numAciertos}/10 aciertos · racha x4`"
          destacada
        />
      </ul>
    </section>

    <section class="bloque">
      <h2 class="etiqueta">Resumen de la partida</h2>
      <ol class="resumen">
        <ResumenRespuesta v-for="(respuesta, i) in listaAciertos" :numero="i+1"
          :cancion="respuesta.nombre" :artista="respuesta.artistas" :resultado="respuesta.correcta ?
          'acierto' : 'fallo'"/>
      </ol>
    </section>

    <div class="acciones">
      <p class="nota">Tu puntuación se ha guardado en el leaderboard</p>
      <div class="botones">
        <SecondaryButton link-to="ranking">
          Ver ranking
          <template #icono>
            <span class="flecha">→</span>
            <img src="@/assets/icons/trofeo.svg" alt="" />
          </template>
        </SecondaryButton>
        <PrimaryButton link-to="jugar">Jugar otra vez</PrimaryButton>
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

/* Cuerpo del frame: 1120 px de contenido con 80 px de margen lateral y 40 px arriba/abajo */
.resultado {
  @apply mx-auto flex w-full max-w-320 flex-col gap-10 px-20 py-10 max-lg:px-10 max-sm:px-4;
}

/* Etiquetas verdes de sección ("Partida terminada", "Tu puesto…", "Resumen…") */
.etiqueta {
  @apply font-titulo text-boton whitespace-nowrap text-verde-primario uppercase;
}

/* Escenario: mensaje + puntuación */
.escenario {
  @apply flex items-center justify-between gap-12 overflow-hidden border-2 border-magenta-secundario bg-linear-to-r from-morado-terciario to-negro px-14 py-12 shadow-bloque-magenta-12 max-lg:flex-col max-lg:items-start max-sm:px-6;
}

.mensaje {
  @apply flex min-w-0 flex-col items-start gap-3;
}

/* BBH Bartle no tiene tildes ni ¡: Beiruti Black (como "¿Qué canción es?" en JuegoView) */
.titulo {
  @apply font-cuerpo text-display/[0.95] font-black text-blanco uppercase max-sm:text-h1;
}

.subtitulo {
  @apply font-light text-blanco/70;
}

.ecualizador {
  @apply flex h-18 w-100 max-w-full items-end gap-1.5 overflow-hidden pt-3;
}

.puntuacion {
  @apply flex shrink-0 flex-col items-end font-titulo whitespace-nowrap uppercase max-lg:items-start;
}

/* 170 px en Figma: no hay token de main.css de ese tamaño */
.puntos {
  @apply font-titulo leading-none tracking-[0.02em] text-verde-primario;
  font-size: calc(170 * var(--u, 1px));
}

.unidad {
  @apply font-titulo text-boton text-blanco;
}

/* Estadísticas: 3 Step Cards */
.estadisticas {
  @apply flex gap-8 max-md:flex-col;
}

/* Tu puesto / Resumen */
.bloque {
  @apply flex flex-col gap-4;
}

/* 2 columnas de 5 filas (01-05 | 06-10); 1 columna en móvil */
.resumen {
  @apply grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-6 gap-y-2.5 max-md:grid-flow-row max-md:grid-cols-1 max-md:grid-rows-none;
}

/* Acciones */
.acciones {
  @apply flex items-center justify-between gap-6 max-md:flex-col max-md:items-stretch;
}

.nota {
  @apply font-cuerpo text-base/[1.4] font-bold text-blanco/60;
}

.botones {
  @apply flex items-start gap-4 max-sm:flex-col max-sm:items-stretch;
}

.flecha {
  @apply leading-none;
  font-size: calc(16 * var(--u, 1px));
}
</style>
