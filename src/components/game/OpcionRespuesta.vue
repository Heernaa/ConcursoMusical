<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Figma: Estado=Default | Seleccionada | Correcta | Incorrecta | Deshabilitada.
  // El estado Hover de Figma no es una prop: se aplica con :hover / :focus-visible.
  estado: {
    type: String,
    default: 'default',
    validator: (valor) =>
      ['default', 'seleccionada', 'correcta', 'incorrecta', 'deshabilitada'].includes(valor),
  },
  letra: {
    type: String,
    default: 'A',
  },
  respuesta: {
    type: String,
    default: 'Rolling in the Deep',
  },
})

// Una vez resuelta la pregunta (o deshabilitada) la opción ya no se puede pulsar
const bloqueada = computed(() => ['correcta', 'incorrecta', 'deshabilitada'].includes(props.estado))
</script>

<!--
  Opción Respuesta / RiVERLAND (4 por pregunta). Bloque letra + texto + estado.
  Estados: default · hover/focus (CSS) · seleccionada · correcta (✓) · incorrecta (✕) · deshabilitada
  El @click que ponga el padre llega al <button> raíz.
-->
<template>
  <button
    type="button"
    class="opcion"
    :class="estado"
    :disabled="bloqueada"
    :aria-pressed="estado === 'seleccionada'"
  >
    <span class="letra">{{ letra }}</span>
    <span class="respuesta">{{ respuesta }}</span>
    <span class="estado" aria-hidden="true">
      <img v-if="estado === 'correcta'" src="@/assets/icons/check.svg" alt="" class="icono" />
      <img v-else-if="estado === 'incorrecta'" src="@/assets/icons/cruz.svg" alt="" class="icono" />
      <span v-else class="flecha">→</span>
    </span>
  </button>
</template>

<style scoped>
@reference '../../assets/main.css';

/* Default */
.opcion {
  @apply flex h-18 w-full min-w-0 cursor-pointer items-center border-2 border-blanco/30 bg-negro text-left outline-none disabled:cursor-default;
}
.letra {
  @apply grid w-18 shrink-0 place-items-center self-stretch bg-morado-terciario font-titulo text-h3 text-blanco uppercase;
}
.respuesta {
  @apply min-w-0 flex-1 truncate px-6 font-cuerpo text-lead-strong font-bold text-blanco;
}
.estado {
  @apply grid w-18 shrink-0 place-items-center self-stretch;
}
.icono {
  @apply size-8;
}
.flecha {
  @apply invisible font-subtitulo text-h4 text-verde-primario;
}

/* Hover / focus (solo en Default) */
.default:hover,
.default:focus-visible {
  @apply border-verde-primario shadow-bloque-magenta-6;
}
.default:hover .letra,
.default:focus-visible .letra {
  @apply bg-verde-primario text-negro;
}
.default:hover .flecha,
.default:focus-visible .flecha {
  @apply visible;
}

/* Seleccionada */
.seleccionada {
  @apply border-magenta-secundario shadow-bloque-morado-6;
}
.seleccionada .letra {
  @apply bg-magenta-secundario text-negro;
}

/* Correcta */
.correcta {
  @apply border-verde-primario bg-verde-primario shadow-bloque-verde-oscuro-6;
}
.correcta .letra {
  @apply bg-negro text-verde-primario;
}
.correcta .respuesta {
  @apply text-negro;
}
.correcta .estado {
  @apply bg-negro;
}

/* Incorrecta */
.incorrecta {
  @apply border-magenta-secundario bg-magenta-secundario shadow-bloque-morado-6;
}
.incorrecta .letra {
  @apply bg-negro text-magenta-secundario;
}
.incorrecta .respuesta {
  @apply text-negro;
}
.incorrecta .estado {
  @apply bg-negro;
}

/* Deshabilitada */
.deshabilitada {
  @apply opacity-40;
}
</style>
