# Página de Fe — Ministerio "La Gloria es del Señor"

Sitio web estático del ministerio cristiano, desplegado en **Vercel** con autenticación Google (Firebase Auth), base de datos (Firestore) y analítica (Firebase Analytics).

**Producción:** [lagloriaesdelsenor.com](https://lagloriaesdelsenor.com) · [lagloriaesdelsenor.org](https://lagloriaesdelsenor.org)

---

## Historial de cambios operacionales

### 2026-08-11 — Migración a Vercel, SSL, seguridad de Firestore y SEO

- **Hosting:** dominios `lagloriaesdelsenor.com`/`.org` (+ `www`) conectados al proyecto Vercel `pagina-de-fe`, con DNS en GoDaddy apuntando por A/CNAME (sin delegar nameservers).
- **SSL:** certificados Let's Encrypt emitidos manualmente vía `vercel certs issue` para los 4 hosts, tras detectar que Vercel nunca disparó la emisión automática pese a tener el DNS correctamente verificado.
- **Seguridad (Firestore):** cerrada una fuga de datos — `forumTopics` y `comments` permitían lectura pública sin autenticación, exponiendo email/foto/UID de los autores vía la API REST. Reglas actualizadas a `isAuthenticated()`; verificado con pruebas de lectura anónima (`403` tras el fix). Reglas ahora versionadas en [`firestore.rules`](./firestore.rules).
- **SEO:** agregados meta description, Open Graph, Twitter Card y `<link rel="canonical">` en `index.html`.
- **Performance:** creada `images/og-hero-ministerio.jpg` (112 KB, 1200×630) como imagen social optimizada, evitando servir el hero original de 2.8 MB en previews de WhatsApp/redes.
- **Pendiente identificado, no resuelto aún:** headers de seguridad HTTP (CSP, X-Frame-Options, etc.), `robots.txt`/`sitemap.xml` reales, favicon, SRI en CDNs externos, consolidar `.com`/`.org`/`www`/apex en un solo dominio canónico con redirects.

### 2026-08-12 — Corrección de permisos en comentarios del foro

- **Bug encontrado:** tras el endurecimiento de reglas del 2026-08-11, la regla de `forumTopics/{topicId}/comments/{commentId}` no tenía la misma excepción de campos que la regla del tema padre, así que dar "me gusta" o responder a un comentario de **otro** usuario fallaba con `permission-denied` para cualquiera que no fuera el autor del comentario o un moderador/admin.
- **Fix (`firestore.rules`):** se agregó `request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes', 'likedBy', 'replies'])` como condición adicional de `allow update` en `comments`, igual que ya existía a nivel de tema. Desplegado con `firebase deploy --only firestore:rules`.
- **Fix secundario (`Comunidad/js/forum.js`):** el foro nunca cargaba el rol del usuario actual, así que la verificación/corrección automática de estadísticas (`verifyDataConsistency` + `performFullMaintenance`, que escriben en `forumStats`, restringido a `isAdmin()`) se ejecutaba para todos los usuarios en cada visita al foro. Para miembros normales esa escritura siempre fallaba sin poder corregir la inconsistencia, repitiendo el ciclo y mostrando el toast "Realizando mantenimiento de datos..." en cada carga. Se agregó `loadUserRole()` (igual que en `topic.js`) y la verificación automática ahora solo corre si el usuario es admin o moderador. Los contadores visibles del header (`total-topics`/`total-comments`) no se vieron afectados: se calculan en el cliente desde los temas cargados, no desde `forumStats`.
- **Nota:** `comunidad.js` (raíz del proyecto, con el widget `CommunityModule` de estadísticas para `index.html`) no está cargado por ningún `<script>` en `index.html` — es código huérfano de una versión anterior del sitio.
- **Entorno local:** se encontró y eliminó un token de GitHub expuesto en texto plano (`export GITHUB_TOKEN=...`) en `~/.zshrc` de la máquina de desarrollo — no es parte del repo, pero bloqueaba `git push`/`gh` al tener prioridad sobre la sesión válida guardada en el keychain.

### 2026-08-12 — Logo circular, menú rediseñado, íconos Lucide, favicon, nuevo hero y rediseño "monumental" de Estudios Bíblicos

- **Logo:** reemplazado el logo cuadrado (fondo blanco, ilegible a tamaño de header) por una insignia circular tipo medallón (pergamino + anillo dorado, recortada del logo moderno del águila) en `images/EMD.png`. Aplicada en las 36 páginas que referencian el logo vía el selector `img[alt="Logo EMD"]` (cubre `.logo`, `.header-logo`, `.logo-wrap`, `.logo-img`, `.exam-logo`, `.project-logo` sin tocar el layout propio de cada página).
- **Menú de navegación (`index.html` + 15 páginas con dropdown real):** el dropdown de escritorio pasó de una caja blanca genérica a una tarjeta oscura con blur, borde superior dorado y acento dorado en hover, coherente con la paleta del sitio. El panel móvil ganó un backdrop oscuro (antes no existía — el contenido detrás quedaba interactuable con el menú abierto), transición más suave y un indicador circular en vez de un "+" plano. De paso se corrigió un bug preexistente en `page/Tiempo del Fin/profecias-cumplidas.html`: el botón `.nav-toggle` no existía en el HTML (solo un `</button>` huérfano), así que el menú móvil nunca abría ahí; también se corrigió un link roto (`../iguras Bíblicas/...` → `../Figuras Bíblicas/...`).
- **Íconos Lucide (25 páginas, ~292 reemplazos):** el emoji pictórico decorativo (📖🏛️🕍👑🔥🕊️📜✨❌✅⚠️🧬⚔️ y ~90 tipos más) se sustituyó por SVG de Lucide insertados inline en el HTML — sin CDN ni dependencia JS nueva, con `stroke="currentColor"` para heredar el color del texto. Se dejaron sin tocar banderas de países, flechas/checks tipográficos (→ ← ✓ ✗) y la cruz ✝. `page/Estudios Exegéticos/templo.html` sirvió de piloto (80 emojis) antes de replicar el mapeo al resto.
- **Favicon:** generado desde el logo circular — `favicon.ico` (16/32/48 embebidos), PNGs sueltos hasta 512px y `apple-touch-icon.png`. Los tamaños chicos (16-32px) usan una variante simplificada sin el anillo dorado delgado (se volvía ilegible); los grandes usan el badge completo. Aplicado en las 77 páginas del sitio.
- **Hero de `index.html`:** reemplazada `images/hero-ministerio.jpg` (grupo de personas, 2.7 MB) por `images/hero-escrituras-antiguas.jpg` (bodegón de manuscritos antiguos iluminados, 280 KB) — generada a pedido para alinearse con la paleta del sitio y evitar el riesgo de anatomía rara de IA en escenas con personas. Se regeneró también `images/og-hero-escrituras.jpg` (1200×630) para las metaetiquetas sociales. Limpieza adicional en `index.html`: 6 reglas que aún usaban Montserrat pasaron a Cormorant Garamond (encabezados) / Lato (números y botones), y 14+2 usos de un morado fuera de paleta (`rgba(94,75,139)`) y un dorado suelto (`#d4af37`) se reemplazaron por los valores RGB exactos de `--accent-color`/`--primary-color`/`--gold-accent`. El `<h1>` del hero pasó de Cormorant Garamond a Lato itálica (se agregó la variante itálica de Lato al link de Google Fonts, que antes solo cargaba pesos regulares).
- **Rediseño "monumental" de Estudios Bíblicos (13 páginas):** `doctrina-basica.html` (única página del sitio con barra de progreso, tarjetas de doctrina y quiz tipo curso) se rediseñó con una dirección más contundente acorde a que describe "verdades inamovibles del evangelio": números de doctrina en numeral romano grande (I–X, antes un dígito diminuto), su acento azul (`#1d3a5f`, chocaba con el logo dorado en la misma barra de progreso) reemplazado por tinta, títulos con más peso y sin animaciones de entrada suaves. Ese mismo criterio (peso tipográfico más fuerte, sin animación de entrada, reglas más gruesas) se extendió a las otras 12 páginas de Estudios Bíblicos — **conservando el color de acento único de cada una** (terracota, verde bosque, amatista, slate indigo, etc.), ya que ninguna de esas 12 tiene la barra de progreso que causaba el choque específico en `doctrina-basica.html`.
- **Nota técnica (caché):** `images/EMD.png` y `favicon.ico` se sirven con `cache-control: public, max-age=31536000, immutable` en Vercel. Cualquier archivo estático que se reemplace manteniendo el mismo nombre necesita cache-busting (`?v=N` en el HTML) o, preferible, un nombre de archivo nuevo — de lo contrario navegadores (y el edge de Vercel, que puede cachear un 404 de una visita anterior al deploy) siguen sirviendo la versión vieja hasta por un año.
- **Nota técnica (animaciones):** al quitar `animation: fadeUp ...` de un elemento, verificar si también tiene una propiedad `opacity: 0;` estática por separado — varias páginas usan `fill-mode: forwards` (que depende de esa propiedad para el estado inicial) en vez de `both` (que no la necesita). Quitar solo la animación sin quitar el `opacity: 0;` deja el elemento invisible para siempre.
- **Pendiente identificado, no resuelto:** la sección `page/Tiempo del Fin/` (14 páginas) no tiene identidad tipográfica compartida — cada página usa una fuente distinta (Poppins, Montserrat, Merriweather, Playfair Display, Inter, Orbitron, Arial, Segoe UI+Courier New) y su propia paleta de color, sin relación con Cormorant Garamond/Lato ni con tinta/oro/pergamino. Solo `fundamentos/plan-divino.html` está alineada. Ya estaba correctamente listada como pendiente más abajo; queda como hallazgo detallado para cuando se aborde esa sección.

### 2026-08-14 — Rediseño "Expediente Clasificado" de sociedades-secretas.html

- **`page/Falsas Doctrinas/sociedades-secretas.html`:** rediseñada con un concepto distinto al sistema "Refinado y Solemne" del resto del sitio — un dossier de investigación/archivo redactado, elegido por encajar temáticamente con contenido sobre sociedades secretas y teorías de conspiración. Tipografía Special Elite (máquina de escribir, títulos/sellos) + Courier Prime (monospace, cuerpo). Paleta: mesa oscura `#14110d`/`#0a0806`, papel kraft `#efe6cf`/`#cbb992`, rojo de sello `#8b1a1a`, con el acento dorado `#b89a5f` reservado solo para la sección final de resolución ("Anexo V — Perspectiva Bíblica", con sello dorado distintivo).
- Cada sección original se convirtió en una "hoja de expediente" (`.file-sheet`) con pestaña de carpeta, cinta adhesiva y ligera rotación; las tarjetas de sociedades secretas se anclaron con "chinches" sobre un tablero de corcho (`.corkboard`).
- Se aprovechó el rediseño para añadir `rel="noopener noreferrer"` a enlaces externos y una etiqueta "Sin verificar" en las tarjetas de referencias externas (fuentes de teorías de conspiración sin verificación académica).
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las otras páginas pendientes de `Falsas Doctrinas/` (masonería, gnosticismos, etc.); cada una debe evaluarse por separado.

---

## Estrategia de hosting y escalabilidad

### Setup actual (en producción, desde 2026-08-11)

Split entre dos proveedores — migrado desde el setup anterior de todo-en-Firebase:

| Capa | Proveedor | Plan |
|------|-----------|------|
| Hosting (sitio estático) | **Vercel** — proyecto `pagina-de-fe` | Gratuito |
| Auth | Firebase Auth | Gratuito |
| Base de datos (foro) | Firestore | Gratuito (Spark) |

**Razón del split:** Firebase Hosting tiene 360 MB/día de transferencia (~700 visitas/día). Vercel ofrece 100 GB/mes (~6,500 visitas/día) sin costo. El sitio estático es el que consume el ancho de banda — moverlo a Vercel libera Firebase para lo que hace bien: Auth y Firestore.

**Deploy:** automático — cada `git push` a `main` en [GitHub](https://github.com/JonatanGS777/pagina-de-fe) dispara un build/deploy en Vercel (proyecto `prj_P9hsEScYQTh4WxLrclrnfC82spVh`, team `yonatan-guerrero-sorianos-projects`). No requiere pasos manuales.

**Nota:** Firebase Hosting sigue configurado en `firebase.json` mas no es el hosting activo del dominio público; solo se usa para servir `firebase.json` → reglas de Firestore (`firebase deploy --only firestore:rules`). El campo `"firestore"` en `firebase.json` fue agregado para poder versionar y desplegar `firestore.rules` desde este repo.

### Dominios y DNS

| Dominio | DNS | Registrador | Nameservers |
|---------|-----|--------------|--------------|
| `lagloriaesdelsenor.com` (canónico) | A `76.76.21.21` (apex) + CNAME `www` → apex | GoDaddy | GoDaddy (NO delegados a Vercel) |
| `lagloriaesdelsenor.org` | A `76.76.21.21` (apex) + CNAME `www` → `cname.vercel-dns.com` | GoDaddy | GoDaddy (NO delegados a Vercel) |
| `pagina-de-fe.vercel.app` | Dominio por defecto de Vercel | — | — |

**SSL:** certificados Let's Encrypt emitidos vía challenge HTTP-01 el 2026-08-11 para los 4 hosts (`lagloriaesdelsenor.com`, `www.lagloriaesdelsenor.com`, `lagloriaesdelsenor.org`, `www.lagloriaesdelsenor.org`), válidos 90 días con renovación automática por Vercel.

> **No es necesario delegar los nameservers a Vercel** (`ns1/ns2.vercel-dns.com`). Vercel verifica el dominio y emite el certificado vía el registro A/CNAME apuntando a su IP — confirmado con `misconfigured: false` y `verified: true` en la API de Vercel. Mantener los nameservers en GoDaddy evita tener que recrear manualmente los TXT existentes (`_dmarc`, `google-site-verification`).
>
> Si el certificado no se emite automáticamente tras agregar un dominio nuevo, dispararlo manualmente (no requiere tocar DNS):
> ```
> vercel certs issue <dominio>
> ```

**Registros a preservar** al tocar DNS en GoDaddy: `TXT _dmarc` (política DMARC del correo), `TXT google-site-verification` (solo en `.org`). El registro `TXT hosting-site=minist-la-gloria-es-del-senor` es un residuo de GoDaddy Websites+Marketing sin uso actual — no interfiere pero puede limpiarse.

### Límites gratuitos de Firestore (el cuello de botella real)

| Operación | Límite gratuito (Spark) |
|-----------|------------------------|
| Lecturas | 50,000 / día |
| Escrituras | 20,000 / día |
| Eliminaciones | 20,000 / día |

Con 1,000+ usuarios activos en el foro se supera el límite de lecturas. Activar el plan **Blaze** (pago por uso) resuelve esto — costo estimado **$5–20/mes** con uso moderado.

### Guía de decisión

| Visitas/día | Hosting | Firestore |
|-------------|---------|-----------|
| < 1,000 | Vercel gratis | Spark gratis |
| 1,000 – 10,000 | Vercel gratis | **Blaze (pago por uso)** |
| 10,000+ | Vercel gratis | Blaze + optimizar queries |

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Hosting | **Vercel** (proyecto `pagina-de-fe`) |
| Auth | Firebase Auth — Google Sign-In (popup + redirect fallback) |
| Base de datos | Cloud Firestore |
| Analítica | Firebase Analytics |
| Frontend | HTML / CSS / JS ES Modules (sin bundler) |
| Fuentes | Cormorant Garamond + Lato (Google Fonts) |
| Iconos | Font Awesome 6 (CDN) + Lucide (SVG inline, sin CDN, ~292 usos en 25 páginas) |
| SSL | Let's Encrypt (auto-emitido y renovado por Vercel) |

---

## Seguridad — Reglas de Firestore

Las reglas viven en [`firestore.rules`](./firestore.rules) (versionadas en este repo desde 2026-08-11) y se despliegan con:

```
firebase deploy --only firestore:rules
```

### Modelo de acceso

| Colección | Lectura | Escritura |
|-----------|---------|-----------|
| `forumTopics` + `comments` | **Solo autenticados** (`isAuthenticated()`) | Autor propio o moderador/admin |
| `forumStats` | Solo autenticados | Solo admin |
| `userProfiles` | Dueño del perfil, o campos públicos limitados (`displayName`, `photoURL`, `isPublic`) | Dueño (no puede auto-asignarse `role`); cambiar `role` requiere admin |
| `favorites`, `notifications`, `userSettings` | Dueño del recurso | Dueño del recurso |
| `reports`, `moderation` | Solo admin | Solo admin (creación de reporte: cualquier autenticado) |

**Corrección aplicada 2026-08-11:** `forumTopics` y su subcolección `comments` permitían lectura pública (`allow get, list/read: if true`), exponiendo email, foto y UID de los autores directamente vía la API REST de Firestore, sin pasar por la app ni por el login. Se cambió a `isAuthenticated()`, alineado con la lógica que `Comunidad/js/forum.js` (`initializeForum()`) ya esperaba — la app nunca intentaba cargar temas sin sesión activa, pero Firestore lo permitía igual si alguien llamaba a la API directamente.

**Roles admin de respaldo (bootstrap):** tres correos tienen acceso admin incondicional en `firestore.rules` (función `isAdmin()`), independientemente de lo que diga `userProfiles/{uid}.role` — esto evita quedar bloqueados del panel si el documento de perfil se borra o corrompe. Ver la función `isAdmin()` en el archivo de reglas para la lista actual; cualquier otro usuario se gestiona vía el campo `role`.

### Gestión de usuarios registrados

La lista de usuarios (nombre, email, UID, fecha de registro) **no se versiona en este repo** (es público) — se consulta bajo demanda:

```
firebase auth:export usuarios.json --format=json   # usuarios de Firebase Auth
```

Los roles (`member` / `moderator` / `admin`) están en Firestore, colección `userProfiles/{uid}`, campo `role`. Para cambiar el rol de alguien, editar ese documento desde Firebase Console o Firestore API — nunca desde el cliente (las reglas lo bloquean salvo para admins).

---

## SEO y metadatos sociales

Agregado en `index.html` (2026-08-11):

- `<meta name="description">` — resumen del ministerio para resultados de búsqueda
- Open Graph completo (`og:title`, `og:description`, `og:image`, `og:image:width/height`, `og:url`, `og:locale`, `og:site_name`) — preview correcto al compartir en WhatsApp/Facebook
- Twitter Card (`summary_large_image`)
- `<link rel="canonical" href="https://lagloriaesdelsenor.com/">` — evita contenido duplicado entre `.com` / `.org` / `www` / apex, que sirven el mismo contenido sin redirigir entre sí

**Imagen social:** `images/og-hero-escrituras.jpg` (1200×630px, ~63 KB, JPEG calidad 60) — versión recortada y comprimida de `images/hero-escrituras-antiguas.jpg` (280 KB) específica para `og:image`/`twitter:image` (reemplazó a `hero-ministerio.jpg`/`og-hero-ministerio.jpg` el 2026-08-12). El hero de la página sigue usando la imagen sin recortar. Regenerar si cambia la imagen de fondo del hero (ajustar nombres de archivo según corresponda):

```
sips -z 800 1200 images/hero-escrituras-antiguas.jpg --out /tmp/step1.jpg
sips -c 630 1200 /tmp/step1.jpg --out /tmp/step2.jpg
sips -s format jpeg -s formatOptions 60 /tmp/step2.jpg --out images/og-hero-escrituras.jpg
```

**Favicon:** implementado el 2026-08-12 — ver entrada de esa fecha en el historial. `favicon.ico` + PNGs (16 a 512px) + `apple-touch-icon.png` en la raíz del proyecto, referenciados con rutas absolutas (`/favicon.ico`) en las 77 páginas.

**Pendiente (no implementado aún):** headers de seguridad HTTP (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), `robots.txt` real, `sitemap.xml`, SRI en recursos de CDN (Font Awesome/Google Fonts).

---

## Sistema de roles del foro

El foro soporta tres roles. El campo `role` debe existir en el documento `userProfiles/{uid}` en Firestore:

| Rol | Valor en Firestore | Permisos |
|-----|-------------------|----------|
| Miembro | `member` (default) | Crear temas/comentarios, editar y borrar los propios |
| Moderador | `moderator` | Todo lo anterior + borrar cualquier comentario o tema |
| Administrador | `admin` | Todo lo anterior (acceso completo) |

Para asignar un rol desde la consola de Firebase:
```
Firestore → userProfiles → {uid del usuario} → role: "admin"
```

> **Nota:** La edición de contenido ajeno está restringida al propio autor en todos los roles. Solo el borrado está disponible para moderadores y admins.

---

## Dirección estética — *Refinado y Solemne*

El rediseño sigue los principios de la [Frontend Design Skill](#frontend-design-skill) con la siguiente dirección elegida:

- **Tipografía**: Cormorant Garamond italic (display) + Lato 300 (cuerpo)
- **Paleta**: tinta profunda `#1a1410` · oro antiguo `#b89a5f` · pergamino `#f7f4ed`
- **Header**: oscuro `rgba(14,12,10,0.97)` + `backdrop-filter: blur(12px)` + borde dorado
- **Botones**: rectangulares (`border-radius: 2px`), uppercase Lato, inversión hover
- **Animaciones**: `fadeUp` escalonado (`animation-delay`), sin partículas flotantes
- **Fondo**: textura grain via SVG inline + vignette radial
- **Hero con imagen**: usar `background` multi-capa directo en el elemento — la imagen queda al 100% de opacidad y solo se oscurece con el overlay:
  ```css
  .page-hero {
      background:
          linear-gradient(160deg, rgba(10,8,20,0.52) 0%, rgba(26,20,40,0.45) 55%, rgba(14,12,10,0.42) 100%),
          url('./images/nombre.png') center top / cover no-repeat;
  }
  ```
  **⚠️ Nunca usar `::before` con `opacity` para la imagen** — el overlay encima lo hace invisible.

---

## Estructura del proyecto

```
Página de Fe/
├── index.html                          # Página principal
├── access.html                         # Acceso / Login con Google
├── 404.html
├── admin.html
├── auth/
│   └── profile.html                    # Perfil de usuario
├── css/
│   └── auth.css                        # Hoja de estilos compartida (auth)
├── Comunidad/
│   ├── forum.html                      # Foro principal
│   ├── topic.html                      # Vista de tema/discusión
│   ├── favorites.html                  # Favoritos del usuario
│   └── js/
│       ├── forum.js
│       ├── topic.js
│       └── favorites.js
├── js/
│   ├── firebase-config.js
│   ├── auth.js
│   ├── main.js
│   ├── profile.js
│   ├── analytics.js
│   └── debug-helper.js
├── nuestras-ensenanzas/
│   └── index.html
├── page/
│   ├── Época de Jesús/
│   ├── Estudios Bíblicos/
│   ├── Estudios Exegéticos/
│   ├── Falsas Doctrinas/
│   ├── Figuras Bíblicas/
│   └── Tiempo del Fin/
├── topic/                              # Módulos JS de gestión de temas
├── images/
├── firebase.json
└── .firebaserc
```

---

## Estado del rediseño (Frontend Design Skill)

### ✅ Páginas completadas

| Archivo | Estado |
|---------|--------|
| `index.html` | Completado |
| `access.html` | Completado |
| `auth/profile.html` | Completado |
| `css/auth.css` | Completado |
| `Comunidad/forum.html` | Completado |
| `Comunidad/topic.html` | Completado |
| `Comunidad/favorites.html` | Completado |
| `404.html` | Completado |
| `admin.html` | Completado |
| `nuestras-ensenanzas/index.html` | Completado |
| `page/Época de Jesús/recursos-academicos.html` | Completado — slate blue `#3a5c7a` |
| `page/Época de Jesús/grupos-religiosos.html` | Completado — copper `#9b6a3a` |
| `page/Época de Jesús/contexto-historico.html` | Completado — sage `#4a7856` |
| `page/Época de Jesús/apologia-cristiana.html` | Completado — gold `#b89a5f` |
| `page/Época de Jesús/estudio-contemporaneo.html` | Completado — wine `#7a2d3c` |
| `page/Estudios Bíblicos/revelacion-espiritu.html` | Completado — amethyst `#4a3070` |
| `page/Estudios Bíblicos/devocionales.html` | Completado — forest green `#2b4a36` |
| `page/Estudios Bíblicos/doctrina-basica.html` | Completado — estilo "monumental" propio (numerales romanos, tinta/oro, sin animación de entrada; ver historial 2026-08-12) |
| `page/Estudios Bíblicos/doctrina-intermedia.html` | Completado — terracotta `#6b3a2a` |
| `page/Estudios Bíblicos/doctrina-avanzada.html` | Completado — midnight purple `#2a1e4a` |
| `page/Estudios Bíblicos/estudios/hermeneutica-biblica.html` | Completado — deep teal `#1e4040` |
| `page/Estudios Bíblicos/estudios/pneumatologia-avanzada.html` | Completado — ember `#5c2a0a` |
| `page/Estudios Bíblicos/estudios/cristologia-profunda.html` | Completado — crimson `#7a1528` |
| `page/Estudios Bíblicos/estudios/teologia-pactos.html` | Completado — moss olive `#293d1a` |
| `page/Estudios Bíblicos/estudios/eclesiologia-practica.html` | Completado — port wine `#4a1640` |
| `page/Estudios Bíblicos/estudios/soteriologia-avanzada.html` | Completado — slate indigo `#1e2858` |
| `page/Estudios Bíblicos/estudios/apocaliptica-biblica.html` | Completado — dark sienna `#4a2810` |
| `page/Estudios Bíblicos/estudios/teologia-sabiduria.html` | Completado — dark olive-green `#2e3820` |
| `page/Falsas Doctrinas/sociedades-secretas.html` | Completado — estilo propio "Expediente Clasificado" (dossier/archivo, no el sistema tinta/oro; ver historial 2026-08-14) |

### ⏳ Páginas pendientes de aplicar la skill

#### `page/Estudios Bíblicos/`
- [ ] `recursos/Cronograma Detallado.html`
- [ ] `estudios/acertijos.html`
- [ ] `estudios/analisisexgetico.html`
- [ ] `estudios/etica-cristiana.html`
- [ ] `estudios/examen.html`
- [ ] `estudios/ministerio-pastoral.html`

#### `page/Estudios Exegéticos/`

- [ ] `cantarcantares.html`
- [ ] `diccionarios-comentarios.html`
- [ ] `enlaces-recursos.html`
- [ ] `hebreos7.html`
- [ ] `idiomas-biblia.html`
- [ ] `lectura-anual.html`
- [ ] `mateo24.html`
- [ ] `meditacion-palabra.html`
- [ ] `romanos11.html`
- [ ] `software-biblico.html`
- [ ] `temas-exegeticos.html`
- [ ] `templo.html`
- [ ] `planes/plan-acelerado.html`
- [ ] `planes/plan-cronologico.html`
- [ ] `planes/plan-devocional.html`
- [ ] `planes/plan-tematico.html`

#### `page/Falsas Doctrinas/`

- [ ] `falsasdoctrinas.html`
- [ ] `filosofias-griegas.html`
- [ ] `gnosticismos.html`
- [ ] `masoneria.html`
- [ ] `pseudoprofetas.html`
- [ ] `sectas-anticristianas.html`

#### `page/Figuras Bíblicas/`

- [ ] `at-a-nt.html`
- [ ] `figuras-cristo.html`
- [ ] `nombres-simbologia.html`
- [ ] `sacrificios-figuras.html`
- [ ] `temple-3d.html`
- [ ] `templo-figuras.html`
- [ ] `tipologia-cantares.html`

#### `page/Tiempo del Fin/`

- [ ] `escatologia.html`
- [ ] `introduccion.html`
- [ ] `noticias-fin.html`
- [ ] `nuevo-orden-mundial.html`
- [ ] `profecias-cumplidas.html`
- [ ] `fundamentos/base-profetica.html`
- [ ] `fundamentos/plan-divino.html`
- [ ] `fundamentos/retorno-cristo.html`
- [ ] `analisisescatologico/conversiones.html`
- [ ] `analisisescatologico/economiaglobal.html`
- [ ] `analisisescatologico/eze34.html`
- [ ] `analisisescatologico/persecusion.html`
- [ ] `analisisescatologico/tecnologia.html`
- [ ] `analisisescatologico/tercertemplo.html`

---

## Frontend Design Skill

La siguiente skill fue utilizada para guiar el rediseño estético de todas las páginas completadas.

---

| name | description | license |
|------|-------------|---------|
| frontend-design | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics. | Complete terms in LICENSE.txt |

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

### Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

### Frontend Aesthetics Guidelines

Focus on:

- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
