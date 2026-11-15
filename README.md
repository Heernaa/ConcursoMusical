# ConcursoMusical

> [!important]
>
> El propósito final de este repositorio es crear una SPA con VUE 3, usando la librería de sonido `Howler.js` para crear un concurso musical.

## Stack

- VUE 3.5
- HOWLER.JS
- TAILWIND CSS
- EXPRESS (API del ranking)
- JSON --> Persistencia de datos (`src/data/ranking.json`)

## Arrancar con Docker (recomendado)

Requisito: tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker Compose).

Desde la raíz del proyecto:

```sh
docker compose up --build
```

Cuando termine de construir, abre <http://localhost:8080>.

Se levantan dos contenedores:

| Servicio | Qué es                                                       | Puerto                |
| -------- | ------------------------------------------------------------ | --------------------- |
| `web`    | Build de Vue servido con nginx; redirige `/api/` al servidor | `8080`                |
| `server` | API Express del ranking (`server/index.js`)                  | `3000` (solo interno) |

El ranking se guarda en `src/data/ranking.json`, montado como volumen, así que las puntuaciones se conservan al parar los contenedores.

Otros comandos útiles:

```sh
docker compose up -d --build   # arrancar en segundo plano
docker compose logs -f         # ver los logs
docker compose down            # parar y eliminar los contenedores
```

## Arrancar sin Docker

Requisitos: Node `^22.18.0 || >=24.12.0` y [pnpm](https://pnpm.io/).

```sh
pnpm install
pnpm express   # API del ranking en http://localhost:3000
pnpm dev       # en otra terminal: servidor de desarrollo Vite
```

Vite redirige las peticiones `/api` a `http://localhost:3000`, por eso hacen falta los dos procesos.
