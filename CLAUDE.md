# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

SPA de un concurso musical (Vue 3 + Howler.js + Tailwind CSS 4, persistencia en JSON). Estado actual: andamiaje inicial; `App.vue` es el placeholder de `create-vue`, `router/index.js` tiene `routes: []` y `stores/counter.js` es el store de ejemplo. Howler.js aún no está en `package.json`.

`docs/constitution.md` es la fuente de verdad del proyecto (en español); léelo antes de añadir funcionalidad. Puntos clave:
- Estructura mínima: NavBar, Landing Page, Concurso Musical, Leaderboard.
- Funcionalidad mínima: crear usuario con nombre; concurso de 10 canciones con 5 s de ventana para adivinar; leaderboard con las 10 mejores puntuaciones y podio para las 3 primeras.
- Vue: vistas + componentes; padre-hijo con Props/Emits, hermano-hermano con Pinia; enrutado con Vue Router.
- Diseño visual de referencia en Figma.
- Flujo SDD (Spec-Driven Development): carpetas de specs `NNN-nombre-kebab-case` con `spec.md`, `plan.md`, `tasks.md` (varias secciones de la constitución aún están sin rellenar).
- Git: `main` es la rama final, `develop` es el centro del desarrollo, una rama por funcionalidad que se fusiona a `develop` al terminar.
- Convenciones de nombres: componentes `PascalCase.vue`, vistas `XxxView.vue`, stores en `camelCase` singular, composables `useNombre.js`, servicios `camelCaseService.js`, JSON en `kebab-case`, código en `camelCase` / constantes `UPPER_SNAKE_CASE`.

## Comandos

Gestor de paquetes: **pnpm** (Node `^22.18.0 || >=24.12.0`).

- `pnpm dev` — servidor de desarrollo Vite
- `pnpm build` — build de producción (`dist/`)
- `pnpm preview` — sirve el build
- `pnpm lint` — ejecuta oxlint y eslint con `--fix`
- `pnpm format` — Prettier sobre `src/`

No hay framework de tests configurado.

## Arquitectura

- Alias `@` → `src/` (en `vite.config.js` y `jsconfig.json`).
- `src/main.js` crea la app e instala Pinia y el router.
- **Tailwind v4 sin `tailwind.config`**: todo el sistema de diseño vive en `src/assets/main.css` dentro de `@theme` (tokens de Figma `riverland/*`). Los nombres de utilidades están en español: colores `verde-primario`, `magenta-secundario`, `morado-terciario`, `verde-oscuro`, `blanco`, `negro`; fuentes `font-titulo` (BBH Bartle), `font-subtitulo` (BBH Bogle), `font-cuerpo` (Beiruti); tamaños `text-display|h1..h4|titular|lead|lead-strong|cuerpo|boton`.
- Los estilos por defecto de `h1`–`h4` y `body` se definen en `@layer base`; los estilos de Figma sin etiqueta propia son clases en `@layer components` (`.display`, `.titular`, `.lead`, `.lead-strong`, `.strong`, `.texto`, `.boton`). Reutilízalos en lugar de recomponer tipografías.
- Las fuentes son `.woff2` locales en `public/fonts/` y se referencian con rutas absolutas `/fonts/...` en `@font-face`.
- Lint: oxlint + ESLint (con `eslint-plugin-oxlint` para evitar solapes) y Prettier; formato según `.prettierrc.json` y `.editorconfig`.
