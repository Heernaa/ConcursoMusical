<script setup>
import { computed, useId } from 'vue'
import UserIcon from '@/components/svg/UserIcon.vue'

// v-model del nombre
const nombre = defineModel({ type: String, default: '' })

const props = defineProps({
  label: {
    type: String,
    default: 'Tu nombre',
  },
  placeholder: {
    type: String,
    default: 'Introduce tu nombre',
  },
  // Mensaje de error. Si tiene texto, el campo pasa al estado Error.
  error: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 20,
  },
})

const id = useId()
const idAyuda = `${id}-ayuda`
const relleno = computed(() => nombre.value.length > 0)
const hayError = computed(() => props.error !== '')
</script>

<!-- Input Nombre / RiVERLAND. Estados: default · focus · relleno · error -->
<template>
  <div class="input-nombre" :class="{ relleno, error: hayError }">
    <label :for="id" class="etiqueta">{{ label }}</label>
    <div class="campo">
      <UserIcon class="icono" />
      <input
        :id="id"
        v-model="nombre"
        type="text"
        class="entrada"
        :placeholder="placeholder"
        :maxlength="maxlength"
        autocomplete="nickname"
        :aria-invalid="hayError"
        :aria-describedby="hayError ? idAyuda : undefined"
      />
    </div>
    <p v-if="hayError" :id="idAyuda" class="ayuda" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';

.input-nombre {
  @apply flex w-full flex-col items-start gap-2.5;
}
.etiqueta {
  @apply font-titulo text-boton text-verde-primario uppercase transition-colors duration-200;
}

/* Default */
.campo {
  @apply flex w-full items-center gap-3.5 border border-blanco/35 bg-negro px-5 py-4 transition-[border-color,box-shadow] duration-200;
  border-width: round(calc(2 * var(--u, 1px)), 1px);
}
.icono {
  @apply size-6 shrink-0 text-blanco transition-colors duration-200;
}
.entrada {
  @apply min-w-0 flex-1 bg-transparent font-cuerpo text-cuerpo font-light text-blanco caret-verde-primario outline-none;
}
.entrada::placeholder {
  @apply text-blanco/50;
}

/* Relleno */
.relleno .campo {
  @apply border-blanco;
}

/* Focus */
.campo:focus-within {
  @apply border-verde-primario;
  box-shadow: calc(6 * var(--u, 1px)) calc(6 * var(--u, 1px)) 0 var(--color-magenta-secundario);
}
.campo:focus-within .icono {
  @apply text-verde-primario;
}

/* Error (va al final para tener prioridad sobre focus y relleno) */
.error .etiqueta {
  @apply text-magenta-secundario;
}
.error .campo {
  @apply border-magenta-secundario;
  box-shadow: calc(6 * var(--u, 1px)) calc(6 * var(--u, 1px)) 0 var(--color-morado-terciario);
}
.error .icono {
  @apply text-magenta-secundario;
}
.ayuda {
  @apply font-cuerpo text-base/[1.4] font-bold text-magenta-secundario;
}
</style>
