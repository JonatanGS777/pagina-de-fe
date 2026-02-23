# Página de Fe — Ministerio "La Gloria es del Señor"

Sitio web estático del ministerio cristiano, desplegado en **Firebase Hosting** con autenticación Google (Firebase Auth), base de datos (Firestore) y analítica (Firebase Analytics).

---

## Estrategia de hosting y escalabilidad

### Setup actual (en evaluación)
Firebase Hosting + Firebase Auth + Firestore — todo en un solo proveedor.

### Setup recomendado (split)

| Capa | Proveedor | Plan |
|------|-----------|------|
| Hosting (sitio estático) | **Vercel** | Gratuito |
| Auth | Firebase Auth | Gratuito |
| Base de datos (foro) | Firestore | Gratuito → Blaze cuando escale |

**Razón del split:** Firebase Hosting tiene 360 MB/día de transferencia (~700 visitas/día). Vercel ofrece 100 GB/mes (~6,500 visitas/día) sin costo. El sitio estático es el que consume el ancho de banda — moverlo a Vercel libera Firebase para lo que hace bien: Auth y Firestore.

**Pasos para migrar:**
1. Conectar repositorio GitHub a Vercel (auto-deploy en cada push)
2. Agregar el dominio de Vercel en Firebase Console → Authentication → Dominios autorizados
3. Desactivar Firebase Hosting (mantener solo Auth + Firestore)

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
| Hosting | Firebase Hosting (→ migrar a Vercel) |
| Auth | Firebase Auth — Google Sign-In (popup + redirect fallback) |
| Base de datos | Cloud Firestore |
| Analítica | Firebase Analytics |
| Frontend | HTML / CSS / JS ES Modules (sin bundler) |
| Fuentes | Cormorant Garamond + Lato (Google Fonts) |
| Iconos | Font Awesome 6 |

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

### ⏳ Páginas pendientes de aplicar la skill

#### `page/Estudios Bíblicos/`
- [ ] `recursos/Cronograma Detallado.html`
- [ ] `estudios/acertijos.html`
- [ ] `estudios/analisisexgetico.html`
- [ ] `estudios/apocaliptica-biblica.html`
- [ ] `estudios/etica-cristiana.html`
- [ ] `estudios/examen.html`
- [ ] `estudios/ministerio-pastoral.html`
- [ ] `estudios/pneumatologia-avanzada.html`
- [ ] `estudios/soteriologia-avanzada.html`
- [ ] `estudios/teologia-pactos.html`
- [ ] `estudios/teologia-sabiduria.html`

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
