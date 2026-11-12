# Dockerización del proyecto

El proyecto se ejecuta como **dos contenedores** orquestados con Docker Compose:

| Servicio | Qué hace | Imagen final |
|----------|----------|--------------|
| `web`    | Sirve la SPA de Vue ya compilada y reenvía `/api` al servidor | `nginx:alpine` |
| `server` | API Express (`server/index.js`) que lee y escribe el ranking | `node:22-alpine` |

```
navegador ──► web (nginx :80) ──► /api/*  ──► server (express :3000) ──► src/data/ranking.json
                    └─► resto: archivos estáticos de dist/
```

Se levanta con `docker compose up --build` y la app queda en <http://localhost:8080>.

---

## `Dockerfile` (front)

Usa **build multi-etapa**.

**Etapa `build`** (`node:22-alpine`)
- Node 22 cumple el `engines` de `package.json` (`^22.18.0 || >=24.12.0`). `alpine` reduce el tamaño.
- `corepack enable` activa `pnpm`, el gestor indicado en `CLAUDE.md`, sin instalarlo con `npm -g`.
- Se copian primero solo `package.json` y `pnpm-lock.yaml` y se ejecuta `pnpm install --frozen-lockfile`. Así Docker **cachea la capa de dependencias**: solo se reinstala si cambian los manifiestos, no con cada cambio de código. `--frozen-lockfile` falla si el lockfile no coincide, garantizando builds reproducibles.
- `COPY . .` y `pnpm build` generan `dist/`. Hacen falta las devDependencies (Vite, Tailwind), por eso en esta etapa no se usa `--prod`.

**Etapa final** (`nginx:alpine`)
- Solo se copia `dist/` desde la etapa anterior. Node, `node_modules` y el código fuente **no** acaban en la imagen final: pasa de cientos de MB a unas decenas.
- Se copia `nginx.conf` sobre la configuración por defecto.
- `EXPOSE 80` documenta el puerto (el mapeo real lo hace compose).

**Por qué nginx y no `vite preview`:** `vite preview` es una herramienta de desarrollo, no un servidor de producción.

## `nginx.conf`

- `root /usr/share/nginx/html`: carpeta donde se copió `dist/`.
- `location /api/ { proxy_pass http://server:3000; }`: reproduce en producción el proxy que `vite.config.js` define para desarrollo (`'/api': 'http://localhost:3000'`). El front sigue haciendo `fetch('/api/ranking')` con ruta relativa, sin tocar el código, y sin problemas de CORS porque navegador y API comparten origen. `server` es el nombre del servicio en compose, que Docker resuelve por DNS interno.
- `location / { try_files $uri /index.html; }`: fallback de SPA. Vue Router gestiona las rutas en el cliente; si el usuario recarga en `/leaderboard`, ese archivo no existe en disco y nginx devolvería 404. Con el fallback se sirve `index.html` y el router resuelve la ruta.

## `server/Dockerfile`

- `node:22-alpine` y `corepack enable`: mismos motivos que en el front.
- `pnpm install --frozen-lockfile --prod`: el servidor solo necesita `express`; `--prod` omite Vite, ESLint, Tailwind, etc., reduciendo imagen y superficie de ataque.
- `COPY server ./server`: el código de la API.
- `COPY src/data ./src/data`: `server/index.js` calcula la ruta del ranking como `../src/data/ranking.json` relativa a sí mismo. Para no modificar el código, se reproduce esa estructura dentro del contenedor (`/app/server` + `/app/src/data`). Además, esto aporta un `ranking.json` inicial si no se monta volumen.
- `CMD ["node", "server/index.js"]` en formato *exec* (array): `node` es el proceso PID 1 y recibe bien las señales (`docker stop` apaga limpio).
- El **contexto de build es la raíz** (no `server/`) porque necesita `package.json`, el lockfile y `src/data`, que quedan fuera de `server/`. Por eso el Dockerfile se referencia con `dockerfile: server/Dockerfile` en compose.

## `docker-compose.yml`

- `server`: construye con contexto raíz y su Dockerfile propio. No publica puertos: solo es accesible desde la red interna de compose, es decir, a través de nginx. Nadie externo llama directamente a la API.
- `volumes: ./src/data:/app/src/data`: **persistencia del ranking**. La API guarda los datos escribiendo en `ranking.json`; sin volumen, el archivo vive en la capa efímera del contenedor y se pierde al recrearlo. Con el bind mount, el archivo del host es el que se lee y escribe.
- `web`: construye con el `Dockerfile` raíz y publica `8080:80`. Puedes cambiar `8080` si está ocupado.
- `depends_on: server`: arranca primero la API. Importante: solo ordena el arranque; no espera a que esté lista. Para este caso basta, porque nginx resuelve `server` al hacer la petición, no al iniciar.

## `.dockerignore`

Excluye `node_modules`, `dist` y `.git` del contexto de build:
- Evita enviar cientos de MB al daemon de Docker (build más rápido).
- Evita que `node_modules` del host (compilado para macOS) pise el instalado dentro del contenedor al hacer `COPY . .`.
- Evita que un `dist/` antiguo o el historial de git acaben en la imagen.

## Limitaciones conocidas

- El servidor escribe `ranking.json` sin bloqueo: con una sola instancia es suficiente, pero no escalar a varias réplicas.
- El contenedor corre como `root` (por defecto en la imagen de Node). Para endurecerlo se puede añadir `USER node` en `server/Dockerfile` y asegurar permisos de escritura sobre `src/data`.
- Existen `package-lock.json` y `pnpm-lock.yaml`. Los Dockerfiles usan el de pnpm; conviene eliminar el de npm para evitar divergencias.
