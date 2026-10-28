# Constitución del Proyecto — ConcursoMusical

## 1. Propósito

<!-- Qué se construye, para quién y por qué. Una o dos frases que expliquen el objetivo final del proyecto. -->

Creación de una SPA con uso de VUE 3 como framework de front-end y Howler.js como libreria para el manejo de sonido, para crear un concurso musical.

## 2. Principios

<!-- Reglas de conducta no negociables del proyecto (por ejemplo: la especificación precede al código, alcance mínimo, trazabilidad). Lista corta y numerada. -->

### Diseño
- Diseño visual de referencia en Figma

### Página
- Estructura mínima --> NavBar - Landing Page - Concurso Musical - Leaderboard
- Funcionalidades mínimas --> Creación de usuario con Nombre
- Concurso con 10 canciones y 5 segundos de ventana para su adivinación
- Leaderoard con hasta las 10 mejores puntuaciones, los 3 primeros en un podio


## 3. Stack tecnológico

- Stack obligatorio --> VUE - HOLWER.JS - TAILWIND CSS
- Uso de VUE --> Vistas - Componentes: hijo-padre (Props/Emits) y hermano-hermano (Pinia) - Enrutamiento (Router)

## 4. Estructura del repositorio

```text
ConcursoMusical/
├── docs/                    # Documentación del proyecto
│   └── constitution.md      # Principios, stack y reglas que rigen el desarrollo
├── src/                     # Código fuente de la SPA
│   ├── App.vue              # Componente raíz que monta la aplicación
│   ├── main.js              # Punto de entrada: crea la app Vue e instala router y Pinia
│   ├── router/
│   │   └── index.js         # Definición de rutas de la SPA
│   └── stores/
│       └── counter.js       # Store de Pinia de ejemplo (estado compartido)
├── public/                  # Archivos servidos tal cual, sin procesar por Vite
│   └── favicon.ico          # Icono de la pestaña del navegador
├── index.html               # Plantilla HTML que carga src/main.js
├── package.json             # Dependencias y scripts (dev, build, lint)
├── pnpm-lock.yaml           # Versiones exactas de las dependencias (pnpm)
├── vite.config.js           # Configuración de Vite
├── eslint.config.js         # Reglas de ESLint
├── .oxlintrc.json           # Reglas de oxlint
├── .prettierrc.json         # Formato de código de Prettier
├── .editorconfig            # Convenciones de editor (indentación, finales de línea)
├── jsconfig.json            # Configuración de alias y rutas para el editor
└── README.md                # Descripción general del proyecto y guía de instalación
```

### Convenciones de nombres

Guía general para nombrar archivos y carpetas. Seguir estas reglas salvo que una convención de herramienta indique otra cosa.

- **Carpetas**: `kebab-case` en minúsculas (`src/router`, `docs/specs`).
- **Componentes Vue**: `PascalCase.vue`, con un nombre que describa su función (`NavBar.vue`, `PodioLeaderboard.vue`).
- **Vistas**: `PascalCase.vue` terminado en el nombre de la pantalla (`LandingView.vue`, `ConcursoView.vue`).
- **Stores de Pinia**: `camelCase` en singular, con el nombre del dominio (`counter.js`, `usuario.js`).
- **Composables**: `useNombre.js`, prefijo `use` seguido de `PascalCase` (`useAudio.js`).
- **Servicios**: `camelCase` que describa la responsabilidad (`audioService.js`, `datosService.js`).
- **Archivos de datos JSON**: `kebab-case` en minúsculas (`puntuaciones.json`).
- **Especificaciones**: carpeta `NNN-nombre-en-kebab-case`, con número secuencial de tres dígitos.
- **Documentos SDD**: `spec.md`, `plan.md` y `tasks.md`, siempre con esos nombres exactos.
- **Variables y funciones en código**: `camelCase`. Constantes globales: `UPPER_SNAKE_CASE`.

## 5. Flujo de desarrollo SDD

<!-- Fases del método Spec-Driven Development, en orden, con entrada, salida y responsable de cada una. Indica que no se avanza de fase sin completar la anterior. -->

### Contenido mínimo de cada documento

<!-- Qué debe incluir como mínimo cada documento del flujo: spec.md, plan.md y tasks.md. -->

## 6. Reglas de implementación

<!-- Normas técnicas concretas que todo código debe cumplir (sintaxis de componentes, dónde vive la lógica de audio, cómo se accede a los datos, estilos, alcance de los cambios, manejo de secretos). -->

## 7. Calidad y verificación

<!-- Comandos y criterios que deben cumplirse antes de dar por terminado un cambio (lint, build, pruebas, navegadores objetivo, tratamiento de errores). -->

## 8. Control de cambios

- Branch Main es la final
- Branch Develop es el centro del desarrollo
- Branch por funcionalidad ( + sub-branches en caso necesario), tras implementación exitosa merge a desarrollo

## 9. Gobernanza

<!-- Quién puede modificar este documento, cómo se aprueban los cambios y el registro de versiones con fecha y motivo. -->
