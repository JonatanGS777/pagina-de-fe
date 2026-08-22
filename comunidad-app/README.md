# Comunidad de fe

Foro de la comunidad del Ministerio "La Gloria es del Señor", montado bajo `/comunidad`
del sitio principal. React 19 + TypeScript + Vite + Tailwind 4 + shadcn/radix, con
Firebase (Auth + Firestore) como backend. Usa el mismo proyecto de Firebase que el resto
del sitio — no migra ni duplica datos, lee/escribe directamente las colecciones
`forumTopics`, `notifications`, `reports`, `userProfiles`, etc.

## Datos (Firestore)

- **`forumTopics/{topicId}`** — un tema del foro: título, contenido (Markdown),
  categoría, autor, likes/favoritos, contador de vistas, reacciones, y opcionalmente
  `siteLink` (cita a una página real del sitio), `pinned` y `acceptedCommentId`.
  - **`forumTopics/{topicId}/comments/{commentId}`** — comentarios de nivel superior.
    Las respuestas van embebidas en `Comment.replies` (no son subcolección).
- **`notifications/{uid}/items/{id}`** — notificaciones in-app (comentario, respuesta,
  mención).
- **`reports/{id}`** — reportes de contenido para moderación.
- **`userProfiles/{uid}`** — perfil y rol (`member` / `moderator` / `admin`).

El modelo completo está tipado en `src/types/firestore-schema.ts`.

## Funcionalidad implementada

**Base**
- Login con Google, temas por categoría, comentarios y respuestas (2 niveles),
  likes, favoritos.

**Fase 1 — Completar lo que las reglas de Firestore ya permitían**
- Editar temas y comentarios propios (marca "editado").
- Contador de vistas real.
- Like en respuestas embebidas.
- Reportar tema/comentario/respuesta ante moderación.
- Notificaciones in-app (comentario, respuesta) con campana y contador de no leídas.
- Panel de moderación (`/moderacion`, solo admin/moderador) para revisar reportes.

**Fase 2 — Aprendizaje**
- Respuesta aceptada en temas de "Preguntas y Respuestas".
- Vincular un tema a una página real del sitio (`src/lib/site-content.ts`, índice
  curado de ~34 páginas por categoría) en vez de solo texto libre.
- Temas fijados por admin/moderador (hilos de estudio guiado), siempre visibles arriba.
- Perfil público de autor (`/autor/:uid`) con sus temas y estadísticas reales.

**Fase 3 — Colaboración**
- Menciones `@Nombre`, limitadas a los participantes del hilo actual (no hay
  directorio de usuarios navegable por privacidad) — con notificación al mencionado.
- Reacciones 🙏 y 💡 a nivel de tema, además del like.

**Fase 4 — Escala y descubrimiento**
- Paginación real (`limit`/`startAfter`, 20 por página) en vez de cargar toda la
  colección. Temas fijados y contadores de categoría se resuelven aparte (consultas
  de agregación `count`/`sum`) para seguir exactos sin descargar todo.
- Filtrar por categoría se resuelve en el servidor (índice `category + createdAt`).
- Búsqueda por título, contenido o autor (del lado del cliente, sobre los temas ya
  cargados — buscar dentro de comentarios queda fuera de alcance por ahora, ver
  "Pendiente").
- Filtros de orden: Más recientes (`createdAt desc`), Más comentados
  (`replies desc`), Sin responder (`where replies == 0`). Cada combinación de
  categoría + orden es una consulta distinta — 4 índices compuestos en total
  (`firestore.indexes.json`).

**Formato de contenido**
- Markdown básico (`react-markdown`, sin HTML crudo) en temas, comentarios y
  respuestas: `**negrita**`, `# título`, listas, citas. Aviso de sintaxis visible
  junto a cada formulario de escritura.

## Pendiente

**Búsqueda dentro de comentarios** — no implementada. Requeriría tokenizar el
contenido de cada comentario al crearlo/editarlo (`contentTokens: string[]`) y una
consulta `collectionGroup` con `array-contains-any`, más un índice de collection
group nuevo. Se dejó fuera de la Fase 4 por el esfuerzo que implica frente al valor
(la búsqueda por título/contenido/autor ya cubre la mayoría de casos reales).

**Fase 5 — Confianza y salud de la comunidad**
- Insignias de participación.
- Digest semanal por correo — requiere una Cloud Function (código en servidor),
  infraestructura nueva distinta a todo lo implementado hasta ahora.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar con las credenciales del proyecto Firebase
npm run dev                  # sirve en /comunidad
npm run build                # tsc -b && vite build
npm run lint                 # oxlint
```

El dev server se conecta al proyecto de Firebase **real** (no hay emulador
configurado) — cuidado al probar acciones que escriben datos.

## Deploy

Vercel reconstruye `comunidad-app` automáticamente en cada push a `main` (ver
`deploy/build.sh` en la raíz del repo, que arma `dist/comunidad`). Eso **no** incluye
las reglas ni los índices de Firestore — hay que desplegarlos aparte desde la raíz
del repo:

```bash
firebase deploy --only firestore:rules     # después de tocar firestore.rules
firebase deploy --only firestore:indexes   # después de tocar firestore.indexes.json
```

Un `firestore.rules` desactualizado no rompe el build, pero sí rechaza en
producción cualquier campo/colección nueva que el código intente leer o escribir.

**Cuidado con `firestore:indexes` y un índice ya existente**: esta versión del CLI
a veces falla con `409 index already exists` al desplegar `firestore.indexes.json`
si el archivo incluye un índice que ya está `READY` en el proyecto — en vez de
reconocerlo como ya cumplido, intenta recrearlo y aborta el resto del deploy
(incluidos los índices genuinamente nuevos que venían después en el archivo). Si
pasa esto: quita temporalmente del archivo los índices que ya existen (confirmar
con `firebase deploy --only firestore:indexes --debug 2>&1 | grep
"collectionGroups/-/indexes {"`, que trae el estado real desde la API), despliega
solo los nuevos, y después restaura el archivo completo — el archivo debe seguir
describiendo el conjunto completo de índices que la app necesita, aunque este CLI
no siempre pueda reaplicarlo de una sola vez.
