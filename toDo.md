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
    - [ ] Confirmar
      - [x] Deshabilita las opciones no escojidas
      - [ ] Comprueba si la opcion seleccionada es la correcta

**Cambios necesarios**

- [x] Lista de canciones --> 10 canciones
  - [x] Nombre
  - [x] Artista
  - [ ] src --> King Kong
  - [x] lista de opciones
    - [ ] 6 opciones de respuesta --> 4 elejidas de forma aleatoria, 3 incorrectas y 1 correcta
  - [x] 1 pista personalizada

