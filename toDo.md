# toDo

## Ranking

### Template

- [x] Crear el HTML de la página

### Style

- [x] Ajustar los estilos para construir la página

### Script 

- [x] Cargar JSON para leer información del ranking
  - [x] **IF** Cargando --> Cargando...
  - [x] **ELSE-IF** JSON empty --> Cargar página **VACIA**
  - [x] **ELSE** --> Cargar página con las puntuaciones existentes, hasta un máximo de 10 (v-for)

## Jugar

### JuegoView

**Funcionalidades**

- [x] <ProgresoJuego />
  - [x] Renderizar de forma dinámica
    - [x] Pregunta --> X/10
    - [x] Porcentaje --> (X/10) * 100
    - [x] :segmentos --> Lista de estado de pregunta
- [ ] <section class="escenario">
  - [x] <p class="numero"> --> Cargar dinámicamente
  - [ ] <ReproductorFragmento />
    - [ ] estado --> Dinamico
    - [ ] tiempo --> Dinamico 
    - [ ] ayuda --> Pistas personalizadas
  - [ ] <div class="opciones">
    - [x] <OpcionRespuesta/> --> Dinámica
    - [x] Saltar --> El botón aumenta el indice++
    - [x] Confirmar
      - [x] Deshabilita las opciones no escojidas
      - [x] Comprueba si la opcion seleccionada es la correcta
        - [x] Deshabilita el botón de comprobar si ya se ha hecho
    - [ ] Ver resultados --> Botón con redireccionamiento a vista de resultados, solo disponible tras confirmar la selección de la ultima canción
  - [x] Store --> Crear store con **Pinia** donde meter los datos de la partida
  - [x] Boton resultados --> Lleva a resultados, al terminar el juego
- [ ] <Resultados />
  - [ ] Recolección de datos con el store de 'player'
    - [x] Aciertos
    - [x] Lista de aciertos y fallos --> Lista con canciiones y si esta ha sido acierto o fallo { "cancion": cancion, "acierto": true/false }
    - [ ] Mejor racha --> Contar en la lista de aciertos y fallos, los aciertos consecutivos



**Cambios necesarios**

- [x] Lista de canciones --> 10 canciones
  - [x] Nombre
  - [x] Artista
  - [ ] src --> King Kong
  - [x] lista de opciones
    - [ ] 6 opciones de respuesta --> 4 elejidas de forma aleatoria, 3 incorrectas y 1 correcta
  - [x] 1 pista personalizada

