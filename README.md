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
| Iconos | Font Awesome 6 |
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

**Imagen social:** `images/og-hero-ministerio.jpg` (1200×630px, ~112 KB, JPEG calidad 60) — versión recortada y comprimida de `images/hero-ministerio.jpg` (2.8 MB) específica para `og:image`/`twitter:image`. El hero de la página sigue usando la imagen original sin comprimir. Regenerar si cambia la imagen de fondo del hero:

```
sips -z 800 1200 images/hero-ministerio.jpg --out /tmp/step1.jpg
sips -c 630 1200 /tmp/step1.jpg --out /tmp/step2.jpg
sips -s format jpeg -s formatOptions 60 /tmp/step2.jpg --out images/og-hero-ministerio.jpg
```

**Pendiente (no implementado aún):** headers de seguridad HTTP (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), `robots.txt` real, `sitemap.xml`, favicon, SRI en recursos de CDN (Font Awesome/Google Fonts).

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
| `page/Estudios Bíblicos/doctrina-basica.html` | Completado — deep blue `#1d3a5f` |
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
- [ ] `sociedades-secretas.html`

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
