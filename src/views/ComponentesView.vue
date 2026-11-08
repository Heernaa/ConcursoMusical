<script setup>
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/buttons/SecondaryButton.vue'
import NavLink from '@/components/navigation/NavLink.vue'
import NavBar from '@/components/navigation/NavBar.vue'
import SectionTitle from '@/components/landing/SectionTitle.vue'
import StepCardVerde from '@/components/landing/StepCardVerde.vue'
import StepCardMagenta from '@/components/landing/StepCardMagenta.vue'
import StepCardMorado from '@/components/landing/StepCardMorado.vue'
import BarraFrecuencia from '@/components/landing/BarraFrecuencia.vue'
import GameSection from '@/components/game/GameSection.vue'
import HeaderJuego from '@/components/game/HeaderJuego.vue'
import ProgresoJuego from '@/components/game/ProgresoJuego.vue'
import SegmentoProgreso from '@/components/game/SegmentoProgreso.vue'
import ReproductorFragmento from '@/components/game/ReproductorFragmento.vue'
import OpcionRespuesta from '@/components/game/OpcionRespuesta.vue'
</script>

<template>
  <main class="vista">
    <section class="seccion">
      <h2 class="titulo">Botones</h2>
      <p class="aviso">Pasa el ratón, pulsa y navega con Tab para ver hover, pressed y focus.</p>
      <div class="fila">
        <PrimaryButton>Jugar ahora</PrimaryButton>
        <PrimaryButton disabled />
        <SecondaryButton />
        <SecondaryButton>
          Ver ranking
          <template #icono><img src="@/assets/icons/trofeo.svg" alt="" class="trofeo" /></template>
        </SecondaryButton>
        <SecondaryButton disabled />
      </div>
    </section>

    <section class="seccion">
      <h2 class="titulo">Navegación</h2>
      <div class="fila fila-centrada">
        <NavLink href="#">Line up</NavLink>
        <NavLink href="#" aria-current="page">Activo</NavLink>
        <NavLink href="#" aria-disabled="true">Disabled</NavLink>
      </div>
      <NavBar>
        <NavLink href="#">Jugar</NavLink>
        <NavLink href="#">Leaderboard</NavLink>
      </NavBar>
    </section>

    <section class="seccion seccion-centrada">
      <SectionTitle />
      <div class="tarjetas">
        <StepCardVerde />
        <StepCardMagenta />
        <StepCardMorado />
      </div>
      <BarraFrecuencia />
    </section>

    <GameSection />

    <section class="seccion">
      <h2 class="titulo">Partida</h2>
      <HeaderJuego />
      <ProgresoJuego />
      <div class="fila fila-centrada">
        <SegmentoProgreso estado="completado" class="segmento-muestra" />
        <SegmentoProgreso estado="actual" class="segmento-muestra" />
        <SegmentoProgreso estado="pendiente" class="segmento-muestra" />
      </div>
      <ReproductorFragmento />
      <ReproductorFragmento estado="reproduciendo" :progreso="50" />
      <p class="aviso">Opción Respuesta: pasa el ratón por la primera para ver el hover.</p>
      <div class="opciones">
        <OpcionRespuesta />
        <OpcionRespuesta estado="seleccionada" />
        <OpcionRespuesta estado="correcta" />
        <OpcionRespuesta estado="incorrecta" />
        <OpcionRespuesta estado="deshabilitada" />
      </div>
    </section>
  </main>
</template>

<style scoped>
@reference '../assets/main.css';

.vista {
  @apply flex flex-col gap-16 p-10;
}
.seccion {
  @apply flex flex-col gap-8;
}
.seccion-centrada {
  @apply items-center gap-16;
}
.titulo {
  @apply font-titulo text-h2 uppercase;
}
.aviso {
  @apply font-cuerpo text-lead font-light;
}
.fila {
  @apply flex flex-wrap items-start gap-8;
}
.fila-centrada {
  @apply items-center;
}
.tarjetas {
  @apply flex w-full gap-8;
}
.trofeo {
  @apply size-4;
}
.segmento-muestra {
  @apply w-10 flex-none;
}
.opciones {
  @apply flex w-140 max-w-full flex-col gap-6;
}
</style>
