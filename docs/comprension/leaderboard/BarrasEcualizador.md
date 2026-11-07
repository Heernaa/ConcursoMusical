# Comprensión de funcionamiento

En este documento repasaré el **componente** `src/componentes/leaderboard/BarrasEcualizador.vue`. 

## Analisis de estructura

### Props

Este componente recibe un total de **2** props:

```vue
{
    aciertos: {
        type: Number,
        required: true,
    },
    compacto: {
        type: Boolean,
        required: true,
    }
}
```

#### Aciertos

Se usa para determinar el **número** de **barras** que deben **pintarse** en la entrada de lista.

#### Compacto

Se usa para determinar si la altura de las barras debe ser la de una **entrada** en el **podio** o **fuera** de el.

### Script

#### Alturas de barra

Dentro del script, se usa el prop anterior, **compacto**, para determinar cual de las dos listas que contienen las alturas de las barras se debe usar:

```vue
const ALTURAS_PODIO = [8, 29, 39, 23, 34, 44, 26, 36, 21, 31]
const ALTURAS_COMPACTO = [14, 22, 30, 18, 26, 34, 20, 28, 16, 24]
```

Para sacar la altura final de las barras se usa `map` con una de las 2 listas, segun si **compacto** es true/false.

```vue
const barras = computed(() =>
  (props.compacto ? ALTURAS_COMPACTO : ALTURAS_PODIO).map((altura, i) => ({
    altura,
    activa: i < props.aciertos,
  })),
)
```

> [!note]
>
> En este `map`, primero que nada, con un operador ternario discernimos si es compacto y elejimos la lista de alturas.
> Tras esto, declaramos la **variable** `altura` (valor de elemento de lista) y `i` (index) se utiliza para **comparar** con el numero de **aciertos** y sacar si esa barra debe estar **activa** o **apagada**; canción acertada o fallada.
>

### Template 

En el template renderizamos las barras, con un **bucle** `v-for`, en el que asignamos el estado *activo/!activo* y la altura de la barra, junto a la clase común de barra para los 2 estados.
