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

### 2026-08-17 — Rediseño "Atlas del Error" de falsasdoctrinas.html

- **`page/Falsas Doctrinas/falsasdoctrinas.html`:** rediseñada como la página de entrada/índice de toda la categoría, con un concepto de cartografía antigua elegido entre 3 direcciones propuestas (Atlas del Error, Constelación Doctrinal, Cámara del Centinela). Tipografía Cinzel (títulos tipo atlas grabado) + EB Garamond (cuerpo, cursiva en subtítulos). Paleta: pergamino envejecido `#ece0c2`, tinta sepia `#2e2013`, ruta/óxido `#8a5a2b`, rojo óxido `#8f3624` para acentos de advertencia, dorado brújula `#a9822f`.
- Fondo con cuadrícula tipo latitud/longitud + grano + viñeta radial. Rosa de los vientos SVG girando lentamente detrás del hero. La timeline bíblica (4 eras) pasó de tarjetas con ícono pálido a medallones con numeral romano (I-IV) conectados por una línea punteada vertical. El grid de 8 doctrinas pasó a tarjetas con borde punteado tipo territorio de mapa, leve rotación alterna y un pin circular rojo que sobresale del borde superior; las etiquetas de versículo se convirtieron en "coordenadas" con borde punteado.
- Se quitaron el cursor personalizado, el toggle de modo oscuro y el efecto parallax por scroll del template original (no forman parte de la convención ya establecida en las páginas migradas del sitio: header simplificado con logo + nav, sin esos extras).
- **Nota:** igual que con `sociedades-secretas.html`, este estilo es específico al rol de esta página como índice/panorama de la categoría — no reciclar como plantilla para las demás páginas pendientes de `Falsas Doctrinas/`.

### 2026-08-17 — Rediseño "Papiro de Alejandría" de filosofias-griegas.html

- **`page/Falsas Doctrinas/filosofias-griegas.html`:** rediseñada con un concepto de biblioteca antigua/papiro, elegido entre 3 direcciones propuestas (Papiro de Alejandría, Ágora Filosófica, Diálogo y Contraste) por encajar con el contenido (Filón de Alejandría y la Septuaginta ya son parte central de la cronología de la página). Tipografía Cormorant Unicase (versalitas, títulos tipo rótulo de rollo) + Source Serif 4 (cuerpo académico). Paleta: papiro cálido `#e8d9b5`, tinta sepia `#3a2c1a`, rojo alejandrino `#7a3520`, dorado bibliotecario `#a8863f`.
- Cada sección se etiquetó como "Rollo I" a "Rollo V" (Introducción, Las Cuatro Escuelas, Cronología, Comparativa, Conclusiones). Las tarjetas de las 4 escuelas filosóficas llevan bordes asimétricos tipo pergamino imperfecto, filtro sepia sutil en las imágenes y un sello circular con el mismo ícono que su pestaña en el índice de navegación.
- La cronología de 6 eventos se reconstruyó con el patrón de grid alternado ya usado en el timeline de `falsasdoctrinas.html`, reemplazando el código original que manipulaba `transform` inline vía JavaScript en cada scroll (frágil y difícil de mantener).
- **Limpieza:** se quitó el menú hamburguesa móvil completo con su lógica de submenús (`menu-item-has-children`, panel deslizante) — código muerto heredado de una plantilla compartida, ya que el `<nav>` real de esta página solo contenía un enlace ("Inicio"). Se reemplazó por el header simplificado (logo + nav-back) ya convencional en el resto del sitio.
- **Pendiente identificado, no resuelto:** las 5 imágenes de esta página (`platonismo.jpg`, `neoplatonismo.jpg`, `epicureismo.jpg`, `estoicismo.jpg`, `filosofia-griega.jpg`) pesan ~3 MB cada una (~15 MB total) sin optimizar, muy por encima del hero de `index.html` (112 KB tras optimización, ver historial 2026-08-11).
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas pendientes de `Falsas Doctrinas/`.

### 2026-08-17 — Rediseño "Vasija de Nag Hammadi" de gnosticismos.html

- **`page/Falsas Doctrinas/gnosticismos.html`:** rediseñada con un concepto de excavación arqueológica, elegido entre 3 direcciones propuestas (Vasija de Nag Hammadi, Diagrama del Pleroma, Luz y Sombra) por el hecho histórico de que los textos gnósticos de Nag Hammadi estuvieron literalmente enterrados en vasijas de barro en el desierto egipcio hasta 1945. Tipografía Fraunces (títulos) + Newsreader (cuerpo). Paleta: arcilla cocida `#8D5B4C` (ya en uso, se mantuvo por continuidad), ocre desértico `#c99a5c`, subterráneo casi negro `#1a1410`, dorado hallazgo `#d9a05b`.
- **Fix de header faltante:** esta página no tenía el header del sitio — el `<header>` era un contenedor vacío con solo una imagen de fondo (comentarios placeholder incluidos). Se agregó el header estándar (logo + nav-back a `falsasdoctrinas.html`) y se fusionó el bloque de imagen con el título de la página (antes vivían separados: la imagen sin texto arriba, el `<h1>` en un bloque blanco aparte más abajo).
- **Fix de bug de paleta:** `.highlight` usaba un morado `rgba(106, 48, 147, ...)` que no correspondía a ninguna variable CSS de la página (el resto del sitio usa terracota/oliva/dorado) — reemplazado por un degradado dorado/arcilla coherente con el resto de la paleta.
- Cada una de las 7 secciones se etiquetó como "Estrato I" a "Estrato VII", en línea con el concepto de capas de excavación. La tabla comparativa de teología gnóstica vs. ortodoxa se envolvió como "fragmento del códice desenterrado".
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas pendientes de `Falsas Doctrinas/`.

### 2026-08-17 — Rediseño "Tribunal de la Verdad" de masoneria.html

- **`page/Falsas Doctrinas/masoneria.html`:** rediseñada con un concepto de veredicto/sentencia judicial, elegido entre 3 direcciones propuestas (Tribunal de la Verdad, Piedra y Compás, Pirámide y Ojo) por el tono acusatorio del texto (a diferencia del resto de la categoría, no cita Escritura ni mantiene un marco académico/doctrinal). Tipografía Bitter (títulos) + PT Serif (cuerpo). Paleta: negro sentencia `#16130f`, rojo veredicto `#7a1e1e`, piedra heredada `#5a4e3c`, dorado mazo `#a8862f`.
- Cada una de las 7 secciones se etiquetó como "Cargo I" a "Cargo VII". Se agregó un sello circular rotado "VEREDICTO" en el hero. El símbolo masónico ∴ del header original se conservó como marca de agua tenue (ya estaba en el diseño previo).
- **Header:** convertido al patrón estándar del sitio (logo + nav-back a `falsasdoctrinas.html`); antes el logo estaba envuelto en un enlace con ruta relativa redundante, sin botón de regreso diferenciado.
- **Advertencia de contenido (no resuelta, decisión del usuario):** este artículo nombra a personas reales identificables (miembros de familias reales, un productor de Hollywood, políticos) con acusaciones de pertenencia a un "culto luciferino" sin fuentes verificables, citando una única fuente no académica ("Ahuwah Zeus — Masonic House of Lies"). Se le presentó la situación al usuario antes de proceder; decidió mantener el contenido intacto y solo aplicar el rediseño visual. El texto no fue modificado.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas pendientes de `Falsas Doctrinas/`.

### 2026-08-17 — Rediseño "Galería de Retratos Falsos" de pseudoprofetas.html

- **`page/Falsas Doctrinas/pseudoprofetas.html`:** rediseñada con un concepto tipo "rogues' gallery" (registro de identificación con fotos), elegido entre 3 direcciones propuestas (Galería de Retratos Falsos, Anales del Engaño, Falsos Faros) por ser literalmente un catálogo biográfico de personas reales que se hicieron pasar por profetas o mesías. Tipografía Big Shoulders Display (títulos) + Source Serif 4 (cuerpo). Paleta: sepia expediente `#e4d9c4`, tinta museo `#3d2f1f`, rojo alerta `#8c2f2f`, dorado placa `#a8862f`.
- **Header/menú preservados:** a diferencia del resto de la categoría, esta página conserva el menú dropdown completo del sitio (una de las "15 páginas con dropdown real" del historial 2026-08-12) — no se simplificó a logo+nav-back. El nuevo estilo se propaga automáticamente porque el header usa las mismas variables CSS (`--primary-color`, `--accent-color`, etc.) que el resto de la página.
- Las 6 tarjetas de pseudoprofetas históricos (Simón el Mago, Montano, Joseph Smith, Sun Myung Moon, José Luis de Jesús Miranda, David Koresh) llevan ahora filtro sepia en las fotos y una placa dorada bajo el nombre. La tabla de 6 "Otros Falsos Maestros" se convirtió en fichas apiladas tipo expediente (`.teacher-files-grid`), eliminando el CSS responsive frágil que la tabla original necesitaba (conversión manual a bloques vía `data-label` + pseudo-elementos) — las fichas son responsive por diseño sin necesitar ese código.
- **Bug de rutas corregido (preexistente, no introducido en este rediseño):** el logo (`img[alt="Logo EMD"]`) y el enlace "Inicio" del menú usaban `../../../` (tres niveles) en vez de `../../` (dos niveles), rompiendo ambos porque el archivo está en `page/Falsas Doctrinas/`, no tres niveles de profundidad. El usuario detectó que el logo no se veía; se corrigieron ambas rutas.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para `sectas-anticristianas.html`.

### 2026-08-17 — Rediseño "Compás Doctrinal" de sectas-anticristianas.html — categoría Falsas Doctrinas completa

- **`page/Falsas Doctrinas/sectas-anticristianas.html`:** rediseñada con un concepto de instrumento de medición doctrinal, elegido entre 3 direcciones propuestas (Compás Doctrinal, Herbario de Herejías, Directorio del Extravío) porque la sección de Observaciones ya usaba las 5 solas de la Reforma como estándar fijo de evaluación para los 15 grupos catalogados. Tipografía Spectral (títulos) + Work Sans (cuerpo). Paleta: pizarra `#263544`, marfil `#f2ede1`, rojo desviación `#a13d3d`, dorado de referencia `#b8925a`.
- **Header/menú preservado:** otra de las páginas con dropdown completo del sitio; el nuevo estilo se propaga vía las mismas variables CSS del resto de la página.
- Las 15 tarjetas de grupos cambiaron su ícono de `fa-exclamation-circle` a `fa-compass` (aguja desviada). Se agregó un diagrama visual de las 5 solas (Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria) en la sección de Observaciones, que antes solo las mencionaba en una oración de texto corrido.
- **Bug de hero corregido (preexistente):** el `::before` decorativo cargaba un data-URI de SVG con el atributo `fill` cortado a mitad (`...L0,100 Z" f'`), inerte desde que se escribió. Además, `background-size: contain` sin `background-repeat: no-repeat` hacía que la imagen de fondo se repitiera en mosaico. Se reemplazó por una sola imagen con overlay de degradado directo.
- Se corrigieron varios colores hardcodeados de la paleta púrpura/turquesa original (`rgba(142, 68, 173, ...)`, `rgba(26, 188, 156, ...)`) que no seguían las variables CSS de la página, quedando inconsistentes tras el cambio de paleta.
- **Con esta página, las 7 páginas de `Falsas Doctrinas/` quedan completas:** `falsasdoctrinas.html` (Atlas del Error), `filosofias-griegas.html` (Papiro de Alejandría), `gnosticismos.html` (Vasija de Nag Hammadi), `masoneria.html` (Tribunal de la Verdad), `sociedades-secretas.html` (Expediente Clasificado), `pseudoprofetas.html` (Galería de Retratos Falsos) y `sectas-anticristianas.html` (Compás Doctrinal) — cada una con su propia dirección estética, sin plantilla compartida entre ellas.

### 2026-08-17 — Octava página de Falsas Doctrinas: reptilianos-consejo-13.html

- **`page/Falsas Doctrinas/reptilianos-consejo-13.html`:** página añadida a la categoría después de que quedara marcada "7/7 completa". Llegó con un estilo propio ya implementado, **"Piel de Dragón"** (verde bosque + rojo sangre, textura de escamas, Cinzel + Barlow Condensed + Barlow), aprobado tal cual por no partir de una plantilla genérica.
- **Fix de header:** usaba un enlace genérico `<a class="brand" href="#">` sin logo ni ruta a inicio, distinto a la convención `.header-logo` del resto del sitio. Corregido manteniendo la paleta propia de la página.
- **Fix de página huérfana:** ningún archivo del sitio enlazaba a ella. Se agregó "Reptilianos y Consejo de los 13" al dropdown "Falsas Doctrinas" en los 14 archivos del sitio que lo tienen (`index.html`, `nuestras-ensenanzas/index.html`, `Estudios Exegéticos/` ×6, `Tiempo del Fin/` ×3, `Figuras Bíblicas/at-a-nt.html`, y las páginas hermanas de la categoría).
- **Advertencia de contenido (no resuelta, decisión del usuario):** el artículo nombra linajes/familias reales identificables (Rothschild, Rockefeller, Windsor, Kennedy/Cavendish, Bush) como una "raza reptiliana" que controla el mundo, atribuyéndoles eventos históricos reales (esclavitud, guerras mundiales, terremotos), con una única fuente no académica (Stewart Swerdlow vía Biblioteca Pleyades/in5d). Igual que con `masoneria.html`, se le informó al usuario y decidió mantener el texto intacto, solo diseño/estructura.
- **Segundo rediseño — estética "Linaje Real":** el usuario pidió reemplazar "Piel de Dragón" por sentirse demasiado atado al motivo Draco. Se propusieron 3 direcciones ancladas en símbolos del propio artículo (Pirámide y Ojo, Linaje Real, Numerología del 13); eligió **Linaje Real**. Tipografía Cormorant Garamond (títulos) + Crimson Pro (cuerpo). Paleta: borgoña casi negro `#170a10`, vitela `#ecdfc8`, dorado heráldico `#c9a44c`, rojo sello de cera `#6b1530`.
- Sello de cera con fleur-de-lis (⚜) en el hero y divisor heráldico de línea doble. La lista de las 13 familias gobernantes recibió una clase especial `.family-roll`: se presenta como un "rollo genealógico" con numerales romanos I–XIII vía CSS counters, único elemento con tratamiento especial por ser el registro que da nombre al artículo. Imágenes con filtro sepia sutil y marco tipo lámina enmarcada.
- **Nota:** no se inventaron encabezados `<h2>` ni se reestructuró el texto en secciones — el artículo original no tenía subtítulos, solo párrafos corridos con figuras intercaladas; se restylearon los elementos existentes sin tocar contenido ni añadir estructura nueva.

### 2026-08-17 — Novena página de Falsas Doctrinas: lineas-sangre-illuminati.html

- **`page/Falsas Doctrinas/lineas-sangre-illuminati.html`:** página añadida a la categoría con un estilo propio **"Archivo Vaticano"** (manuscrito heráldico sobre vitela), elegido por el contenido (orden mundial jesuita y 13 líneas de sangre de la nobleza negra romana). Tipografía Marcellus (títulos lapidarios) + Lora (cuerpo), ambas sin uso previo en la categoría. Paleta: tinta oscura `#14100b`, vitela `#efe6cd`, rojo cardenal `#8c2431`, dorado `#b08d3e`.
- Concepto: hojas de "documento de archivo" (`.doc`) sobre vitela con lineado de lino y sombra profunda; sello de archivo (ojo) en el hero; rollo heráldico `.roll` con numerales romanos I–XIII para las 13 casas saturninas de Alan Lamont; tres "registros" `.register` (Springmeier 1995, Nobleza Negra 2000, Pléyades 2003) con numeración decimal tras el nombre del investigador; citas históricas sobre los jesuitas como "testimonios" `.quote` con cita en rojo cardenal; anexo bíblico dorado `.annex` (Daniel 2:21, Proverbios 21:1, Efesios 6:12, 1 Pedro 5:8, Apocalipsis 11:15).
- **Contenido:** artículo completo de Mente Alternativa (orden mundial jesuita — Lamont vs. Springmeier vs. Pléyades vs. Swerdlow), obtenido vía Wayback Machine porque el sitio original responde 403 a bots. Se respetaron los subtítulos originales del artículo (sí los tenía, a diferencia de `reptilianos-consejo-13.html`). Se añadieron etiquetas "Sin verificar" (fuentes no académicas) siguiendo el precedente de `sociedades-secretas.html`, y un Anexo Bíblico con sello dorado como cierre doctrinal, acorde al propósito de la categoría.
- **Menús:** se agregó "Líneas de Sangre Illuminati" al dropdown "Falsas Doctrinas" en los 14 archivos del sitio que lo tienen, justo después de "Reptilianos y Consejo de los 13" (misma lista de archivos que la entrada anterior).
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para futuras páginas de `Falsas Doctrinas/`.

### 2026-08-17 — Nueva página: aguila-cinco-ministerios.html (Estudios Bíblicos)

- **`page/Estudios Bíblicos/aguila-cinco-ministerios.html`:** página nueva migrada desde un PDF de 22 páginas ("El Águila y los Cinco Ministerios"), estudio exegético-teológico de la tipología ministerial de Efesios 4:11 (águila-apóstol, león-profeta, oveja-pastor, cordero-evangelista, becerro/buey-maestro). Estilo propio "Cielo Abierto" (acento cerúleo `#1c5a78`, distinto a los 8 estudios existentes en `estudios/`), con color dedicado por cada uno de los 5 símbolos ministeriales.
- Agregada como 6ta opción del dropdown "Estudios Bíblicos" en los 14 archivos con ese menú, más `index.html`, `nuestras-ensenanzas/index.html`, y el footer de `doctrina-intermedia.html` (que tiene su propio header sin dropdown).

### 2026-08-17 — Limpieza de mayúsculas en referencias y contenido (todo el sitio)

- El usuario señaló que el abuso de `text-transform: uppercase` en títulos y contenido de página (referencias bíblicas, nombres de entidades, títulos de tarjetas) se veía genérico. Se corrigieron 26 páginas ya rediseñadas del sitio, quitando mayúsculas de etiquetas de contenido mientras se conservaron en chips de tema/sección (eyebrows, section-label, nav) y en elementos temáticos auténticos (sellos de dossier tipo "Clasificado"/"Veredicto", numeración de sección tipo "Cargo I"/"Rollo I").
- **No se tocaron:** páginas pendientes con plantilla vieja (no forman parte del sistema de diseño "Refinado y Solemne" todavía).

### 2026-08-17 — Refinamiento de las 6 páginas pendientes de Estudios Bíblicos

- Se aplicó el mismo proceso usado en `Falsas Doctrinas/`: análisis individual por página, sin plantilla compartida. A diferencia de esa categoría, estas 6 páginas ya tenían una dirección estética propia y apropiada al contenido (no requerían reinvención) — el trabajo fue de **refinamiento**, no de rediseño desde cero:
  - `estudios/acertijos.html` — "Excavación Refinada"; agregado header del sitio (antes huérfana), emoji → Lucide, corregido bug de contador "/30" (solo había 10 preguntas) y un `::before` roto que inyectaba SVG crudo como `content` CSS.
  - `estudios/analisisexgetico.html` — Font Awesome (49 usos) → Lucide, mayúsculas corregidas.
  - `estudios/etica-cristiana.html` — emoji (15) → Lucide, header agregado, `::before` roto corregido (mismo bug que acertijos.html), 'Crimson Text' cargado (nunca se cargaba vía Google Fonts).
  - `estudios/examen.html` — Font Awesome (19 usos) → Lucide; ya tenía header y fuentes correctas.
  - `estudios/ministerio-pastoral.html` — emoji (36) → Lucide, header agregado, 'Roboto Slab' cargado (nunca se cargaba), 9 títulos de ministerio en mayúscula sostenida normalizados.
  - `recursos/Cronograma Detallado.html` — Font Awesome (20 usos) → Lucide, logo EMD agregado al header (antes solo texto, inconsistente con su página madre analisisexgetico.html).
- **Bug recurrente encontrado en 2 páginas:** un `::before` con `content: '<svg>...</svg>'` — el CSS `content` no renderiza HTML/SVG, solo lo muestra como texto literal; el ícono decorativo nunca fue visible. Reemplazado por un elemento HTML real con SVG inline en ambos casos.
- **Bug de fuente recurrente en 3 páginas:** `font-family: 'NombreFuente'` referenciado en CSS sin el `<link>` correspondiente a Google Fonts, cayendo silenciosamente a la fuente de reserva del sistema.

### 2026-08-18: rediseño del trío "Academia Bíblica" (Cimientos → Andamiaje → Observatorio)

- **`page/Estudios Bíblicos/doctrina-basica.html`**: estilo **"Cimientos"** (piedra caliza + óxido/rebar, tipografía Zilla Slab + IBM Plex Sans). Primera fase del trío arquitectónico (Básica = cimientos de un edificio).
- **`page/Estudios Bíblicos/doctrina-intermedia.html`**: estilo **"Andamiaje"**, continúa la metáfora de construcción un nivel arriba (plano técnico/cianotipo, Archivo Black + IBM Plex Mono, azul de plano + naranja de seguridad). Las 10 tarjetas de estudio pasaron a "fichas de plano" P-01 a P-10.
- **`page/Estudios Bíblicos/doctrina-avanzada.html`**: estilo **"Observatorio"**, cierra el trío con la cámara más alta del edificio (cielo nocturno con telescopio, Fraunces + Spectral, paleta índigo/latón). Se corrigieron errores de gramática preexistentes en el aviso de madurez espiritual y en dos tarjetas de maestros (incluyendo una inconsistencia de nombre, "Diony" → "Dioni"), sin alterar nombres, cifras ni enlaces externos de los 6 maestros recomendados ni de los 3 recursos complementarios.
- Las tres reemplazan sus versiones anteriores (ver historial 2026-08-12); Font Awesome reemplazado por Lucide en las tres.

### 2026-08-18: limpieza de guion largo y mayúsculas de contenido en todo el sitio

- El usuario estableció una regla permanente de estilo de escritura: no usar guion largo en ningún texto del sitio (títulos, párrafos, código comentado). Se corrigieron ~20 páginas ya rediseñadas, reemplazando cada aparición según el contexto: separadores de `<title>` → `|`, pares cortos tipo "Águila / Apóstol" → `·`, incisos dentro de una oración → coma, paréntesis o dos puntos.
- En la misma pasada se completó la limpieza de `text-transform: uppercase` en etiquetas de contenido que había quedado pendiente del historial 2026-08-17 (13 páginas de `estudios/` + `Cronograma Detallado.html`), incluyendo dos casos nuevos (`deliverable-title`, `timeline-week`) con el mismo patrón de etiqueta de dato ya corregido antes.
- **Bug de causa raíz encontrado:** `.sub-menu a` (los ítems del menú desplegable) heredaba `text-transform: uppercase` de la regla `nav a` sin resetearlo, forzando **todo** el listado del dropdown "Estudios Bíblicos" a mayúscula sostenida; no era un problema de una página específica sino del menú global. Afectaba solo a `index.html` y `page/Época de Jesús/estudio-contemporaneo.html`; se verificaron los otros 14 archivos con menú desplegable antiguo y ninguno más lo tenía.

### 2026-08-18: rediseño de revelacion-espiritu.html y devocionales.html

- **`page/Estudios Bíblicos/revelacion-espiritu.html`**: estilo **"El Huerto de PaRDeS"** (la jerarquía del conocimiento, suelo/tronco/fruto, y los cuatro niveles de PaRDeS reimaginados como el corte transversal de un árbol frutal, ya que "PaRDeS" significa literalmente "huerto" en hebreo). Fraunces + Newsreader, paleta tierra/raíz/corteza/fruto dorado.
- **`page/Estudios Bíblicos/devocionales.html`**: estilo **"Bitácora Espiritual"** (cronogramas de oración, horarios bíblicos y calendario de ayuno reimaginados como un cuaderno personal de disciplinas: tipografía a mano (Caveat) sobre papel rayado, tarjetas con ligera rotación tipo hoja pegada, calendario "clavado" con una chincheta).
- Ambas reemplazan el estilo base "Refinado y Solemne" genérico que tenían antes (ver tabla de estado); Font Awesome reemplazado por Lucide en las dos.

### 2026-08-18: fotografías reales en aguila-cinco-ministerios.html

- Las 4 tarjetas de "Desarrollo teológico profundo" con foto disponible (águila, león, oveja, buey) ganaron un banner fotográfico de fondo con degradado oscuro y título superpuesto, usando imágenes generadas por el usuario. Cordero-Evangelista conserva su ícono: no había foto en alta resolución disponible para ese símbolo.
- Imágenes optimizadas a JPEG ~300–540 KB c/u y guardadas en `page/Estudios Bíblicos/images/` (`aguila-vuelo.jpg`, `leon-rugido.jpg`, `oveja-pastor.jpg`, `buey-yugo.jpg`).

### 2026-08-18: rediseño "Dos Testamentos, Un Río" de at-a-nt.html (Figuras Bíblicas)

- **`page/Figuras Bíblicas/at-a-nt.html`**: la página más grande de contenido del sitio, directorio completo de los 66 libros de la Biblia (39 AT + 27 NT, organizados en 11 categorías), tipología hacia el resto de la categoría y línea de tiempo de la revelación progresiva. Rediseñada con AT (piedra/tierra) y NT (cielo) como dos corrientes que confluyen: dualidad de color que ya existía en el CSS original (`--at-color`/`--nt-color`) y que ahora es el concepto central de toda la página, no solo de una pestaña. Cormorant SC + Literata, reemplaza Poppins + Montserrat + Font Awesome.
- **Bug de páginas huérfanas corregido:** la grilla de tipología solo enlazaba a 4 de las 6 páginas hermanas de la categoría. Se agregaron `temple-3d.html` (no estaba enlazada en ningún lado del archivo) y `tipologia-cantares.html` (solo vivía en el menú dropdown, no en esta página).
- Con esta página, `page/Figuras Bíblicas/at-a-nt.html` pasa de "pendiente" a completada; las 6 páginas restantes de la categoría siguen pendientes.

### 2026-08-18: figuras-cristo.html, sacrificios-figuras.html, templo-figuras.html y el visor 3D del Templo (Figuras Bíblicas)

- **`page/Figuras Bíblicas/figuras-cristo.html`**: estilo propio "Manuscrito Iluminado" (tipografía y tratamiento de capitulares evocando un manuscrito medieval iluminado). Íconos de la sección Animales y capitulares de letra corregidos a Lucide en un pase posterior.
- **`page/Figuras Bíblicas/sacrificios-figuras.html`**: estilo propio "El Altar de Piedra".
- **`page/Figuras Bíblicas/templo-figuras.html`**: estilo propio "Plano del Arquitecto" (blueprint técnico, paleta azul plano/dorado). El mismo lenguaje visual se extendió al chrome de `temple-3d.html` (header, HUD, panel de partes) para que el visor 3D y su página madre se sientan como una sola pieza.
- **`page/Figuras Bíblicas/temple-3d.html`**: el visor 3D del Templo de Salomón se reconstruyó por completo con Three.js r178 (antes una versión más antigua/limitada, ver `temple-3d-viejo.html` conservado como referencia). Se corrigió el enfoque de cámara y se activaron los enlaces `?part=` para llegar directo a una pieza específica. Los emoji de la intro y el botón "Caminar" se reemplazaron por íconos Lucide SVG.

### 2026-08-18: se agrega tabernaculo-3d.html (Éxodo 25-40) a Figuras Bíblicas

- **`page/Figuras Bíblicas/tabernaculo-3d.html`**: nuevo modelo 3D interactivo del Tabernáculo del desierto (mismo patrón que `temple-3d.html`), con las 17 partes del mobiliario en 3 categorías (El Atrio, La Estructura, El Santuario), sección de Componentes con filtros y atajos de teclado. Enlazado desde el dropdown de Figuras Bíblicas y desde un bloque "Su precedente" agregado en `templo-figuras.html`.
- **Nota:** esta página se agregó en paralelo a una sesión de arreglos sobre el mismo archivo (ver siguiente entrada) — el commit inicial tenía varios bugs de integración que se corrigieron enseguida, no llegaron a quedar en producción por más de unos minutos.

### 2026-08-18: arreglos extensos de los visores 3D del Templo y el Tabernáculo

Tras agregarse `tabernaculo-3d.html`, una revisión a fondo (a pedido del usuario, "no se ve el tabernáculo" / "no son responsivas" / "la parte del interior no se ve bien") encontró y corrigió una cadena de bugs, varios preexistentes también en `temple-3d.html` por compartir el mismo patrón:

- **CSS huérfano:** `tabernaculo-3d-app.css` se escribió desde cero en vez de adaptarse de `temple-3d-app.css` — variables de fuente apuntaban a Cinzel/Inter, nunca cargadas (quedaban en la fuente de reserva del sistema); las clases de la pantalla de bienvenida y el modal de ayuda no coincidían con las del HTML (`.intro-card` vs `.t3d-intro-card`), así que no tenían ningún estilo aplicado; faltaban las reglas de la grilla "Componentes" (`.pc-name`/`.pc-ref` sin definir en ningún archivo cargado).
- **Caché inmutable:** el sitio sirve todo `.css`/`.js` con `Cache-Control: immutable, max-age=31536000` (`vercel.json`). Cada archivo modificado en esta sesión necesitó cache-busting (`?v=N`) en su referencia — de lo contrario los navegadores que ya habían visitado la página seguían sirviendo la versión rota indefinidamente pese a que el repo ya tuviera el arreglo.
- **Responsividad:** `.temple-3d-nav` (header compartido por ambas páginas) no tenía ninguna regla para pantallas chicas — logo, enlace de regreso y los 3 links de navegación intentaban caber en una sola fila sin `flex-wrap`, desbordando en móvil. Se simplificó ocultando los enlaces de salto en móvil (siguen alcanzables con scroll) en vez de dejar que el header creciera a varias filas, lo que a su vez habría tapado el HUD del visor (regresión detectada y corregida en el mismo pase). Los toggles del HUD ("Etiquetas"/"Ver interior"/"Volar al elegir"), ocultos en móvil por falta de espacio, se restauraron más compactos.
- **Navegación interior:** las paredes/velo/cubierta de la tienda son opacas por defecto y bloqueaban la vista de las piezas interiores (Lugar Santo, Lugar Santísimo) al orbitar desde ciertos ángulos. Ahora "Ver interior" se activa automáticamente al seleccionar cualquier pieza interior o al entrar en modo caminata. El modo caminata (WASD, solo PC) no tenía detección de colisión — se podía atravesar las tablas de la pared y quedar con la cámara incrustada en la geometría; se agregó colisión simple contra las 3 paredes de la tienda.
- **Espacio interior:** el FOV de la cámara subió de 55° a 70° (técnica estándar para espacios interiores reducidos) y el modelo completo del tabernáculo se escaló x1.4 (`SCALE` en `tabernaculo.js`, aplicado al grupo raíz y replicado a cámaras de vuelo, colisión y límites de movimiento en `main.js`) para dar más holgura de navegación.
- **Hueco en el perímetro:** la pared posterior del atrio (z=-12.5) solo tenía cortina y columnas en el tercio central, dejando ~13 unidades sin cercar a cada lado — único de los 4 muros que no llegaba hasta las esquinas. Corregido a todo el ancho, con las columnas de esquina que faltaban.
- **Escala del mobiliario del Templo:** el candelero (10 menorás), el altar del incienso, la mesa del pan y el arca del pacto se habían dibujado a la mitad de la escala real del Hekal (confirmado comparando con sus propias descripciones en el código: "2 × 1 codos" la mesa, dibujada como 1 × 0.5). Se recentraron y escalaron x2 en su sitio, sin mover su posición. De paso, un escalón del podio del Templo que flotaba 0.2 unidades sobre el suelo (bug de un solo valor de centro mal calculado) quedó apoyado correctamente.

### 2026-08-18: nombres-simbologia.html y tipologia-cantares.html completan Figuras Bíblicas

- **`page/Figuras Bíblicas/nombres-simbologia.html`**: refinamiento, no rediseño — el concepto existente ("pergamino/rollo antiguo", Cinzel + EB Garamond + Tangerine) ya encajaba con el contenido (101 nombres bíblicos con buscador). Se agregó el header del sitio, que faltaba por completo (página huérfana), y se reemplazó el único uso de Font Awesome por Lucide.
- **`page/Figuras Bíblicas/tipologia-cantares.html`**: rediseñada con estilo propio "Jardín Sellado" (imagen hero propia, CSS dedicado en `css/tipologia-cantares-jardin.css`), con un pase posterior de corrección ortográfica y de jerarquía tipográfica.
- **Con estas dos páginas, la categoría `page/Figuras Bíblicas/` queda 100% completa** (7 páginas de contenido + `temple-3d.html` + `tabernaculo-3d.html`).

### 2026-08-18: comienza el rediseño de Tiempo del Fin — introduccion.html "Atalaya del Amanecer"

- Antes de empezar, se decidió con el usuario analizar cada una de las 14 páginas de `page/Tiempo del Fin/` por separado (mismo criterio que Falsas Doctrinas), no una identidad visual compartida, pese a ser una sola serie temática — decisión explícita del usuario.
- **`page/Tiempo del Fin/introduccion.html`** (página de entrada de la categoría, primera de las 14): estilo propio "Atalaya del Amanecer" elegido entre 3 direcciones propuestas (Reloj de Arena, Atalaya del Amanecer, Apocalipsis Iluminado). Tipografía Spectral + Source Serif 4 + IBM Plex Mono, reemplaza Montserrat + Raleway y el clásico gradiente morado sobre claro que la guía de diseño del sitio marca como cliché a evitar.
- **Bugs heredados de la plantilla genérica original, corregidos en el rediseño:** header con barra de contacto falsa + mega-menú dropdown con rutas de logo rotas (`../../../` en vez de `../../`); 23 usos de Font Awesome reemplazados por Lucide; formulario de newsletter sin backend (submit roto), reemplazado por enlaces reales a las redes del ministerio ya presentes en la página; footer con dirección/teléfono/redes falsas (`href="#"`) reemplazado por el footer compartido del sitio; un bloque de JS huérfano de "smooth scrolling" que referenciaba una variable nunca definida.
- **Imagen del hero:** `findelostiempos.png` (2.5 MB sin optimizar) se había quitado en un primer pase a favor de un cielo estrellado 100% CSS; a pedido del usuario se restauró, comprimida a JPEG (`findelostiempos-hero.jpg`, 246 KB). La imagen (libro abierto, reloj marcando casi las doce, trompetas, meteoros, sol naciente) encajó directo con el concepto ya elegido, así que el cielo CSS y una constelación decorativa se retiraron a favor de la imagen real.
- Contenido (versículos, preguntas frecuentes, señales de la línea de tiempo, recursos recomendados) se mantuvo íntegro en las tres páginas; solo cambió la presentación.

### 2026-08-19: segunda página de Tiempo del Fin — escatologia.html "Genealogía Doctrinal"

- **`page/Tiempo del Fin/escatologia.html`:** rediseñada con un concepto de árbol genealógico de ideas, elegido entre 3 direcciones propuestas (Genealogía Doctrinal, Cátedra Reformada, Cronómetro de la Reforma) porque el artículo es, en esencia, un ensayo comparativo de cinco corrientes escatológicas que descienden de una misma raíz agustiniana a través de ramificaciones históricas concretas (Reforma s. XVI → postmilenialismo/premilenialismo histórico s. XVII → dispensacionalismo clásico s. XIX → dispensacionalismo progresivo s. XX). Tipografía IM Fell English SC (títulos, versalitas tipo documento antiguo) + Vollkorn/Vollkorn SC (cuerpo y etiquetas), ninguna usada antes en el sitio. Paleta austera intencional (sin dorado ornamental): pergamino `#ece2c8`, tinta `#241d14`, línea de linaje `#a2895a`, burdeos apagado `#5c2a2a` para marcar puntos de divergencia doctrinal.
- La sección "Historia del desarrollo escatológico protestante" se reconstruyó como una línea de linaje vertical (`.lineage`) con nodos generacionales (rombos) conectados por una línea continua, marcando la raíz agustiniana y cada ramificación por siglo. Las 5 corrientes de la sección "Corrientes principales" pasaron a "Rama I–V" con sello romano individual (cuadrado rotado 45°, sin dorado). El resto de secciones se numeraron como "Folio I–VIII" (índice de registro), coherente con el resto del artículo sin alterar su contenido.
- **Imagen de hero descartada:** `images/lasttime.png` (ilustración de stock genérica de ángeles/trompetas/meteoros, 2.9 MB, nunca optimizada) no encajaba con el concepto austero de registro genealógico elegido; se reemplazó por un hero 100% tipográfico con un motivo SVG de líneas ramificadas muy sutil (opacidad 0.16) de fondo. El archivo de imagen queda sin usar en `images/`, no se borró del repo.
- **Header/footer:** convertidos al patrón más reciente de la categoría (mismo que `introduccion.html`): header fijo con blur, sin mega-menú ni Font Awesome (solo Lucide inline); footer de una sola línea, sin el bloque de 4 columnas (redes/enlaces/contacto) que tenía la plantilla vieja.
- Contenido teológico (los 12 apartados: introducción, fundamentos bíblicos, historia, 5 corrientes, tabla comparativa, perspectiva apocalíptica, implicaciones, conclusión) se mantuvo íntegro palabra por palabra; solo cambió la presentación y el agrupamiento visual.
- **Nota:** este estilo es específico al contenido de esta página (única del sitio organizada como comparativa de linaje doctrinal) — no reciclar como plantilla para las demás páginas pendientes de `Tiempo del Fin/`.

### 2026-08-19: primera de las 3 páginas de `fundamentos/` — base-profetica.html "Río Profético"

- El usuario señaló que las 3 tarjetas "Fundamentos" enlazadas desde `introduccion.html` (`fundamentos/base-profetica.html`, `retorno-cristo.html`, `plan-divino.html`) no habían recibido ningún trabajo todavía, pese a ser el contenido más destacado de la página de entrada de la categoría. Se priorizaron sobre el resto de páginas pendientes de `Tiempo del Fin/`.
- **Bug compartido en las 3 páginas (corregido en esta, pendiente en las otras 2):** el enlace "Inicio" del breadcrumb usaba `../../../../index.html` (4 niveles) en vez de `../../../index.html` (3 niveles) — apuntaba fuera del repositorio, 404 real en producción. Se resolvió de raíz al reemplazar el breadcrumb completo por el patrón header fijo + `nav-back` ya estándar en el resto del sitio.
- **`page/Tiempo del Fin/fundamentos/base-profetica.html`:** rediseñada con un concepto de río/corriente que se ensancha, elegido entre 3 direcciones propuestas (Clave de Lectura, Cimiento de Piedra, Río Profético) porque el contenido describe literalmente una "revelación profética progresiva" que nace en Génesis 3:15 y se amplía revelación tras revelación hasta Apocalipsis. Tipografía Frank Ruhl Libre (títulos) + Literata (cuerpo), ninguna usada antes en el sitio. Paleta de agua: azul profundo `#16303f`, río `#2c6f8e`, arena `#f2ead9`, dorado "luz sobre el agua" `#c99a52` como acento escaso.
- Los 7 apartados se envolvieron en una línea de río vertical continua (`.river`) que recorre todo el artículo (a diferencia de `escatologia.html`, donde la línea de linaje solo cubría una sección) — cada sección es un "Cauce I–VII" marcado con una gota en la corriente. Las cajas de versículo (`scripture-box`/`verse-card`) pasaron a "pozas" (`.pool`/`.pool-deep`) con degradado radial tipo reflejo de agua; las cajas de listas (`highlight-box`) pasaron a "orillas" (`.bank`).
- **Imagen descartada:** `images/revelacionprogresiva.png` (2.8 MB, banner generado por IA para la sección de revelación progresiva) tenía errores de texto grabados en la propia imagen ("PROGRESSIVA" mal escrito, "Fden" en vez de "Edén", acentos rotos) — se quitó en vez de solo optimizarla, ya que el error tipográfico es permanente al estar quemado en el píxel. El artículo no pierde información: el párrafo que la acompañaba no dependía de "ver la imagen", solo introducía la lista que la sigue.
- Contenido teológico (los 7 apartados completos: introducción, naturaleza de la profecía, revelación progresiva, libros proféticos clave, principios de interpretación, propósito, conclusión) se mantuvo íntegro palabra por palabra.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para `retorno-cristo.html` ni `plan-divino.html`, aún pendientes.

### 2026-08-19: segunda de las 3 páginas de `fundamentos/` — retorno-cristo.html "Advenimiento Real"

- **`page/Tiempo del Fin/fundamentos/retorno-cristo.html`:** rediseñada con un concepto heráldico/de coronación, elegido entre 3 direcciones propuestas (Advenimiento Real, Horizonte del Relámpago, Vigilia del Novio) por encajar con la imagen central del artículo (Cristo coronado sobre un caballo blanco, Apocalipsis 19:11-16) y el lenguaje repetido de "Rey de reyes", corona y trompetas. Tipografía Forum (títulos, mayúsculas romanas monumentales) + Cardo (cuerpo), ninguna usada antes en el sitio. Paleta heráldica sin morado (evitando el cliché de gradiente púrpura): tinta casi negra `#1e1310`, carmesí `#7a1f2b`, dorado `#b8863f`, pergamino `#f3e9d2`.
- **Bugs reales corregidos (más allá del enlace "Inicio" compartido con las otras 2 páginas):**
  - La tabla comparativa de 6 eventos usaba `<div class="comparison-table">` para abrir pero `</table>` para cerrar — etiquetas descabaladas, HTML inválido. Se reescribió como una tabla real.
  - El índice del sidebar (8 enlaces) apuntaba íntegro a la misma ancla `#main-content` — no navegaba a ninguna sección específica. Se le dieron ids reales a cada sección y el índice ahora navega correctamente.
  - Se quitó la pantalla de splash de 3 segundos con cita bíblica antes de cargar la página, y el hero con video de nubes + poster hotlinkeados a `assets.mixkit.co`/`images.unsplash.com` (dependencia externa, carga lenta, genérico) — reemplazado por un hero heráldico 100% CSS/tipográfico con un blasón SVG.
  - `images/retorno.png` (Cristo Rey en caballo blanco, 3 MB) sí es una imagen bien lograda y fiel al pasaje que ilustra — a diferencia de la de `base-profetica.html`, esta se conservó, solo optimizada a JPEG (`retorno-cristo-rey.jpg`, 535 KB).
- El layout de 2 columnas (contenido + sidebar fijo) se aplanó a una sola columna, siguiendo la convención ya establecida en `escatologia.html` y `base-profetica.html`. El contenido del sidebar (índice, versículo destacado, glosario de términos clave, nota importante) no se descartó: se repartió dentro del flujo de lectura en los puntos donde tiene más sentido (glosario junto a la promesa del retorno, nota importante antes del cierre) en vez de forzar una tarjeta lateral.
- Los 7 apartados se marcaron como "Blasón I–VII" sobre una línea vertical dorada (`.proclamation`, mismo patrón de línea continua que `.river` en `base-profetica.html`); la cronología interna (Promesa Antigua → Enseñanzas de Jesús → Testimonio Apostólico) conserva su propio componente de línea de tiempo (`.royal-timeline`), distinto de la línea general del artículo. Las 3 tarjetas de posturas teológicas (pre/pos/mesotribulacionismo) pasaron a "estandartes" (`.banner`) con encabezado oscuro tipo bandera; los 4+3 recuadros de características/implicaciones pasaron a "escudos" (`.shield`).
- Contenido teológico (los 7 bloques completos: promesa, características, perspectivas teológicas, eventos asociados, señales, implicaciones prácticas, FAQ) se mantuvo íntegro palabra por palabra; el acordeón de preguntas frecuentes conserva su funcionalidad original.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para `plan-divino.html`, aún pendiente.

### 2026-08-19: tercera y última página de `fundamentos/` — plan-divino.html "Hilo de Oro" — categoría `fundamentos/` completa

- **`page/Tiempo del Fin/fundamentos/plan-divino.html`:** rediseñada con una metáfora de tapiz/hilo tejido a través de la historia, elegida entre 3 direcciones propuestas (Hilo de Oro, Reloj de las Edades, Anillos del Árbol) porque el propio diseño original ya tenía un elemento `.golden-thread` conectando visualmente las 6 fases — se tomó esa idea ya presente y se llevó a su máxima expresión conceptual. Tipografía Piazzolla (títulos) + Domine (cuerpo), ninguna usada antes en el sitio. Paleta cálida propia (no reciclada de `retorno-cristo.html` ni `base-profetica.html`): verde bosque `#2a6041` (heredado de la paleta original), pergamino `#f4efe0`, hilo dorado `#c99a4e`/`#d4af5a`.
- **Auditoría de las 7 imágenes de la página — hallazgo importante:** de las 6 imágenes usadas en las "Fases Divinas", 4 se descartaron por problemas de fondo, no solo de estilo:
  - `consejo.png` y `pentecostes.png` — ilustraciones en estilo caricatura/Pixar infantil, tono muy desajustado para el contenido teológico serio del artículo.
  - `moises.png` — mismo estilo caricatura, y las tablas de la Ley que sostiene muestran **texto hebreo inventado** (glifos sin sentido, no hebreo real) grabado en la imagen.
  - `cruz.png` — la crucifixión representada en estilo caricatura infantil, tonalmente inapropiado para el momento más solemne de la fe cristiana.
  - `pentecostes.png` además tiene un **error teológico de contenido**: muestra a Jesús presente y de pie en medio de la escena de Pentecostés, cuando el propio texto de la página narra que esto ocurrió después de la ascensión de Cristo (Hechos 1) — Jesús no estaba presente en Pentecostés.
  - Se conservaron `Huerto de Eden.png` y `jerusalem.png` (Nueva Jerusalén) — buena calidad, fieles a los pasajes que ilustran — optimizadas a JPEG (`huerto-eden-plan.jpg` 768 KB, `nueva-jerusalen-plan.jpg` 597 KB, desde ~2.5-3.9 MB cada una sin comprimir).
  - El hero (`plandivino.png`, sin errores pero genérico/tipo "postal") se descartó también, por consistencia con el tratamiento 100% tipográfico ya usado en `base-profetica.html` y `retorno-cristo.html`.
- **Bug técnico corregido:** el hero tenía un `<video autoplay muted loop>` cuyo único `<source>` apuntaba a `plandivino.png` con `type="video/mp4"` — un PNG anunciado como video, nunca cargaba (fallaba silenciosamente vía el catch de la promesa de autoplay); el fondo real que se veía en producción lo ponía un `background-image` de CSS por separado en `.header`. Se eliminó el `<video>` muerto junto con el resto del hero viejo.
- Las 6 fases (antes en zigzag de 2 columnas con imagen a un lado) se aplanaron a una columna con línea de hilo dorado continua (`.thread`, mismo patrón de línea que `.river` en `base-profetica.html` y `.proclamation` en `retorno-cristo.html`), consistente con el resto de la categoría. El gráfico de las 7 dispensaciones es la expresión más literal del concepto: una línea horizontal con 7 nudos dorados, ya no decorativa sino la pieza central de esa sección.
- Contenido teológico íntegro (6 fases, propósito supremo con 4 atributos, 7 dispensaciones, 6 atributos divinos extendidos, 6 referencias bíblicas, conclusión) sin alterar una palabra.
- **Con esta página, las 3 páginas de `fundamentos/` quedan completas:** `base-profetica.html` (Río Profético), `retorno-cristo.html` (Advenimiento Real) y `plan-divino.html` (Hilo de Oro) — cada una con su propia dirección estética, sin plantilla compartida, y las 3 con el bug del enlace "Inicio" corregido.

### 2026-08-19: quinta página de Tiempo del Fin — noticias-fin.html "Sala de Redacción"

- **`page/Tiempo del Fin/noticias-fin.html`:** rediseñada con un concepto de sala de prensa/wire service, elegido entre 3 direcciones propuestas (Sala de Redacción, Señales en el Radar, Boletín del Vigía) por ser la estructura real de la página: un tickér de titulares, un directorio de 9 fuentes de noticias cristianas externas, y una sección de "redacción propia" con 6 artículos. Tipografía Libre Caslon Display + Libre Caslon Text (titulares/cuerpo, estilo diario impreso) + Barlow Condensed (bylines, tickér, metadatos), ninguna usada antes en el sitio. Paleta papel periódico/tinta: `#f2efe6` (papel), `#1a1a1a` (tinta), rojo de alarma `#b3251f` para etiquetas urgentes, dorado `#a9832f` para la línea de masthead.
- **A diferencia de las páginas de `fundamentos/`, esta conserva el menú desplegable completo del sitio** (una de las páginas con dropdown real, igual que `pseudoprofetas.html` o `sectas-anticristianas.html`) — no se simplificó a logo + nav-back.
- **Bugs reales corregidos:**
  - El botón de menú móvil tenía **dos scripts duplicados** haciendo `nav.classList.toggle('active')` cada uno — al hacer clic ambos disparaban, cancelándose entre sí, así que el menú probablemente no abría en móvil. Se unificaron en un solo script.
  - La sección "Palabra Profética" tenía un fondo `url('/api/placeholder/1200/800')` — una URL de placeholder nunca reemplazada, 404 muerto. Se quitó.
  - El formulario de newsletter no tenía backend (submit roto); se reemplazó por enlaces reales a Facebook/YouTube del ministerio, mismo patrón ya usado en `introduccion.html`.
- **Auditoría de las 7 imágenes:** 5 (hero, pastores, persecución, tecnología/marca, avivamiento) tenían buena calidad y sin errores — se optimizaron a JPEG. Las otras 2 (`tercertemplo.png`, `economiaglobal.png`) tenían **texto falso incrustado** — hebreo inventado junto al templo, y una cita mal etiquetada ("Apocalypsis 18:10-11", mal escrito en latín/inglés) con más hebreo inventado debajo, presentada como si fuera Escritura real. En vez de descartarlas enteras, se **recortaron** para quitar solo el bloque de texto falso, conservando la escena central (arquitectura del templo; hombre y multitud en ciudad distópica) que sí es fiel al tema.
- **Nota de contenido:** el titular "Ezequiel 34: los pastores impíos, como los masones, gobiernan Israel" hace una afirmación fuerte sin fuente verificable — se le señaló al usuario, quien decidió mantenerlo intacto (mismo patrón que `masoneria.html` y `reptilianos-consejo-13.html`).
- Contenido íntegro (tickér, 9 fuentes externas, 6 artículos propios, versículo de Daniel 12) sin alterar palabra.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas pendientes de `Tiempo del Fin/`.

### 2026-08-19: sexta página de Tiempo del Fin — nuevo-orden-mundial.html "Mesa de Negociación"

- **`page/Tiempo del Fin/nuevo-orden-mundial.html`:** a diferencia del resto de la categoría, este artículo es un ensayo académico serio sobre la historia diplomática del concepto "Nuevo Orden Mundial" (Westfalia → Congreso de Viena → Liga de Naciones → ONU → discurso de Bush 1991 → post-11S → COVID), con 4 corrientes interpretativas legítimas de relaciones internacionales y una sección dedicada a **desmentir explícitamente** las teorías conspirativas como "narrativas sin sustento empírico", citando RAND, Chatham House, Brookings y Britannica. Rediseñada con un concepto de dossier diplomático sobre un escritorio, elegido entre 3 direcciones propuestas (Mesa de Negociación, Balanza de Poder, Tablero Geopolítico) porque encaja directo con la imagen de portada ya existente (mapa mundial, bandera y emblema de la ONU, engranajes, sobre un escritorio). Tipografía Vesper Libre (títulos) + Public Sans (cuerpo, el mismo tipo de letra del sistema de diseño del gobierno de EE. UU. — encaja con el tono de "informe oficial"), ninguna usada antes en el sitio. Paleta azul marino diplomático `#16233a` + latón `#a8843f` sobre papel de documento oficial `#f0ede4`.
- **Bugs corregidos:** el logo del header enlazaba a `../Falsas Doctrinas/sociedades-secretas.html` en vez de a Inicio (copiado por error de otra página); no existía forma de volver a "Tiempo del Fin" (se agregó `nav-back`); la sección de "Foros multilaterales de élites" tenía una foto de stock de Unsplash hotlinkeada — se quitó (no se encontró una imagen local apropiada para reemplazarla; la sección queda solo con texto).
- Las 9 secciones se numeraron como "Doc. 01–09" (índice del expediente). Los 4 "actores globales" pasaron a fichas de perfil con ícono; los 3 "escenarios futuros" a tarjetas con borde lateral; la sección que desmiente teorías conspirativas y la de "perspectivas críticas/conspirativas" dentro de corrientes interpretativas comparten un estilo `.critical-note` con borde punteado, distinto de las cajas `.card`/`.highlight` normales, para señalar visualmente que es contenido que el propio texto refuta.
- Contenido íntegro (los 9 documentos completos, incluida la sección crítica de teorías conspirativas) sin alterar palabra.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas pendientes de `Tiempo del Fin/`.

### 2026-08-19: séptima página de Tiempo del Fin — profecias-cumplidas.html "Expediente de Verificación"

- **`page/Tiempo del Fin/profecias-cumplidas.html`:** a diferencia del resto de la categoría, las 50 tarjetas de esta página se generan por JavaScript desde un array de datos (`const prophecies = [...]`), no como HTML estático. Se conservó esa arquitectura íntegra — el array de datos quedó **idéntico byte a byte** al original (verificado programáticamente) — y solo se rediseñó el CSS y la plantilla de salida (`generateProphecyCards`). Estilo elegido entre 3 direcciones propuestas (Expediente de Verificación, Reloj Profético, Sello de Autenticidad) porque cada una de las 50 tarjetas ya tiene la estructura de un caso: fuente/profecía → cumplimiento → tiempo transcurrido. Tipografía Zilla Slab (títulos) + Noto Serif (cuerpo), ninguna usada antes en el sitio. Paleta de carpeta/expediente: tinta `#241f1a`, kraft `#cbb28a`, papel `#f2ecdc`, rojo de sello `#8a2c22` (distinta de la paleta azul marino/latón de `nuevo-orden-mundial.html`, para no repetir la sensación de "dossier" entre ambas).
- **Bugs corregidos:** el logo y el enlace "Inicio" usaban `../../../../` (4 niveles) cuando el archivo está a solo 2 niveles de la raíz — 404 real; los 4 íconos sociales del footer eran `href="#"` — se dejaron solo Facebook/YouTube con URLs reales (mismo patrón que el resto del sitio); el menú móvil tenía el mismo bug de doble listener duplicado ya visto en `noticias-fin.html` (dos scripts separados, cada uno alternando `nav.classList` — se cancelaban entre sí), se unificaron en un solo script.
- Cada tarjeta pasó a etiquetarse "Exp. NN" (en vez de solo el número) y sus dos campos de texto ganaron una etiqueta de campo ("Testimonio" / "Veredicto") para reforzar el concepto de expediente, sin tocar el contenido de las 50 profecías.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas pendientes de `Tiempo del Fin/`.

### 2026-08-19: primera de las 6 páginas de `analisisescatologico/` — conversiones.html "Lluvia Tardía"

- **`page/Tiempo del Fin/analisisescatologico/conversiones.html`:** página huérfana (sin header del sitio en absoluto — ni logo ni menú, solo alcanzable desde la tarjeta correspondiente en `noticias-fin.html`). Se le agregó el header estándar (logo + `nav-back` a `introduccion.html`).
- Rediseñada con un concepto de "tierra seca que reverdece", refinando (no reemplazando) el efecto de lluvia animada que la página ya tenía — encajaba literalmente con el tema (Joel 2:28, "la lluvia tardía"). El fondo original era un degradado púrpura sobre oscuro cubriendo toda la página (`#0f0f23` → `#2d1b69` → `#4a3c95`), el cliché de "gradiente morado" que la guía de diseño del sitio marca como señal de IA genérica a evitar — se reemplazó por un degradado de tierra seca (marrón) a verde vivo a lo largo del scroll de la página. Tipografía Petrona (títulos) + Karla (cuerpo), ninguna usada antes en el sitio.
- **Limpieza:** se quitaron 9 atributos `index="12-1"` (y similares) en etiquetas `<cite>` — restos de un índice de citas de una herramienta de investigación sin propósito en la página final.
- **Nota de contenido, no resuelta:** varias estadísticas son difíciles de verificar de forma independiente (p.ej. "la red social islámica #SaveMaryam reporta perder dos millones de miembros anualmente", proyección de que Indonesia dejaría de ser mayoritariamente islámica para 2035). Se le señaló al usuario antes de proceder; decidió mantener las cifras intactas, igual que con el contenido sin verificar de otras páginas del sitio.
- Contenido íntegro (introducción, estadísticas, cronología de 4 avivamientos regionales, mapa de 8 países, profecía de Joel, 4 causas, significado escatológico, paradoja persecución/crecimiento, puntos de oración) sin alterar palabra.
- **Nota:** este estilo es específico al contenido de esta página — no reciclar como plantilla para las demás páginas de `analisisescatologico/`.

### 2026-08-19: corrección de mayúsculas en las 8 páginas de Tiempo del Fin de esta sesión

- El usuario señaló que las 8 páginas rediseñadas en esta sesión (`escatologia.html`, las 3 de `fundamentos/`, `noticias-fin.html`, `nuevo-orden-mundial.html`, `profecias-cumplidas.html`, `conversiones.html`) usaban mayúscula en cada palabra significativa de títulos y encabezados (Title Case al estilo inglés: "Historia, Fundamentos y Perspectivas"), en vez de la regla del español (solo mayúscula inicial y nombres propios: "historia, fundamentos y perspectivas").
- Se corrigieron `<title>`, `<h1>`, `<h2>`, `<h3>` y `<h4>` en las 8 páginas, conservando en mayúscula los nombres propios y términos con capitalización reverencial/convencional ya establecida en el sitio (Dios, Cristo, Espíritu Santo, Iglesia, Reino, Templo, Segunda Venida, Antiguo/Nuevo Testamento, nombres de medios como "Puertas Abiertas" o "Christian Post"). Las etiquetas de categoría/filtro cortas (p.ej. "Antiguo Testamento", "Tiempos Finales" en `profecias-cumplidas.html`) se dejaron igual, siguiendo el criterio ya establecido de que esas etiquetas de menú/categoría no aplican la misma regla que títulos y contenido de página.
- En `profecias-cumplidas.html` esto incluyó los 50 títulos del array de datos JavaScript (p.ej. "La Caída de Babilonia" → "La caída de Babilonia") — se verificó la sintaxis del array tras el cambio (50 entradas, sin errores).
- **Nota:** este mismo criterio debe aplicarse de aquí en adelante a cualquier página nueva de `Tiempo del Fin/` y a los títulos que se agreguen a los menús de navegación.

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

### Reglas de redacción (aplican a todo el sitio, no solo a esta dirección estética)

- **Sin guion largo** en ningún texto: títulos, párrafos, código comentado. Alternativas según contexto: `|` en separadores de `<title>`, `·` en pares cortos, coma/paréntesis/dos puntos en incisos dentro de una oración (ver historial 2026-08-18).
- **Sin abuso de mayúsculas** (`text-transform: uppercase`) en títulos de página ni en contenido (referencias bíblicas, nombres de entidades, descripciones, etiquetas de dato bajo un número). Se reserva para chips de categoría/sección (eyebrow, section-label, badges de nivel/nav) y botones, nunca para texto narrativo o listas de contenido (ver historial 2026-08-17 y 2026-08-18).
- Íconos: siempre Lucide SVG inline (`stroke="currentColor"`), nunca Font Awesome ni emoji nuevos, en cualquier página nueva o editada.

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
| `page/Estudios Bíblicos/revelacion-espiritu.html` | Completado: estilo propio "El Huerto de PaRDeS" (corte transversal de árbol; ver historial 2026-08-18) |
| `page/Estudios Bíblicos/devocionales.html` | Completado: estilo propio "Bitácora Espiritual" (cuaderno personal; ver historial 2026-08-18) |
| `page/Estudios Bíblicos/doctrina-basica.html` | Completado: estilo propio "Cimientos" (piedra caliza/óxido-rebar; ver historial 2026-08-18) |
| `page/Estudios Bíblicos/doctrina-intermedia.html` | Completado: estilo propio "Andamiaje" (plano técnico/cianotipo; ver historial 2026-08-18) |
| `page/Estudios Bíblicos/doctrina-avanzada.html` | Completado: estilo propio "Observatorio" (cielo nocturno/telescopio; ver historial 2026-08-18) |
| `page/Estudios Bíblicos/aguila-cinco-ministerios.html` | Completado: estilo propio "Cielo Abierto" (acento cerúleo, con fotografías reales en 4 de los 5 símbolos; ver historial 2026-08-17 y 2026-08-18) |
| `page/Estudios Bíblicos/estudios/hermeneutica-biblica.html` | Completado — deep teal `#1e4040` |
| `page/Estudios Bíblicos/estudios/pneumatologia-avanzada.html` | Completado — ember `#5c2a0a` |
| `page/Estudios Bíblicos/estudios/cristologia-profunda.html` | Completado — crimson `#7a1528` |
| `page/Estudios Bíblicos/estudios/teologia-pactos.html` | Completado — moss olive `#293d1a` |
| `page/Estudios Bíblicos/estudios/eclesiologia-practica.html` | Completado — port wine `#4a1640` |
| `page/Estudios Bíblicos/estudios/soteriologia-avanzada.html` | Completado — slate indigo `#1e2858` |
| `page/Estudios Bíblicos/estudios/apocaliptica-biblica.html` | Completado — dark sienna `#4a2810` |
| `page/Estudios Bíblicos/estudios/teologia-sabiduria.html` | Completado — dark olive-green `#2e3820` |
| `page/Falsas Doctrinas/sociedades-secretas.html` | Completado — estilo propio "Expediente Clasificado" (dossier/archivo, no el sistema tinta/oro; ver historial 2026-08-14) |
| `page/Falsas Doctrinas/falsasdoctrinas.html` | Completado — estilo propio "Atlas del Error" (cartografía antigua, no el sistema tinta/oro; ver historial 2026-08-17) |
| `page/Falsas Doctrinas/filosofias-griegas.html` | Completado — estilo propio "Papiro de Alejandría" (biblioteca antigua, no el sistema tinta/oro; ver historial 2026-08-17) |
| `page/Falsas Doctrinas/gnosticismos.html` | Completado — estilo propio "Vasija de Nag Hammadi" (excavación arqueológica, no el sistema tinta/oro; ver historial 2026-08-17) |
| `page/Falsas Doctrinas/masoneria.html` | Completado — estilo propio "Tribunal de la Verdad" (veredicto/sentencia, no el sistema tinta/oro; ver historial 2026-08-17). Contenido del artículo sin verificar, ver nota en historial |
| `page/Falsas Doctrinas/pseudoprofetas.html` | Completado — estilo propio "Galería de Retratos Falsos" (no el sistema tinta/oro; ver historial 2026-08-17). Conserva el menú dropdown completo (no simplificado a nav-back) |
| `page/Falsas Doctrinas/sectas-anticristianas.html` | Completado — estilo propio "Compás Doctrinal" (no el sistema tinta/oro; ver historial 2026-08-17). Conserva el menú dropdown completo |
| `page/Falsas Doctrinas/reptilianos-consejo-13.html` | Completado — estilo propio "Linaje Real" (borgoña/dorado heráldico; ver historial 2026-08-17) |
| `page/Falsas Doctrinas/lineas-sangre-illuminati.html` | Completado — estilo propio "Archivo Vaticano" (manuscrito heráldico sobre vitela; ver historial 2026-08-17) |
| `page/Estudios Bíblicos/estudios/acertijos.html` | Refinado — estilo propio "Excavación Refinada" (arqueología/pergaminos, ya existente); antes huérfana sin header del sitio, con emoji y con 'Cinzel' sin cargar; ver historial 2026-08-17 |
| `page/Estudios Bíblicos/estudios/analisisexgetico.html` | Refinado — se conservó el estilo académico existente (verde bosque, Merriweather); Font Awesome (49 usos) reemplazado por Lucide, mayúsculas corregidas; ver historial 2026-08-17 |
| `page/Estudios Bíblicos/estudios/etica-cristiana.html` | Refinado — se conservó el concepto de expedientes/tribunal existente; 15 emoji reemplazados por Lucide, header agregado, `::before` roto corregido, 'Crimson Text' antes sin cargar; ver historial 2026-08-17 |
| `page/Estudios Bíblicos/estudios/examen.html` | Refinado — ya tenía header y fuentes correctas; Font Awesome (19 usos) reemplazado por Lucide; ver historial 2026-08-17 |
| `page/Estudios Bíblicos/estudios/ministerio-pastoral.html` | Refinado — se conservó el concepto de "plano arquitectónico de la iglesia"; 36 emoji reemplazados por Lucide, header agregado, 'Roboto Slab' antes sin cargar; ver historial 2026-08-17 |
| `page/Estudios Bíblicos/recursos/Cronograma Detallado.html` | Refinado — página hermana de analisisexgetico.html; Font Awesome (20 usos) reemplazado por Lucide, logo EMD agregado al header para consistencia con su página madre; ver historial 2026-08-17 |
| `page/Figuras Bíblicas/at-a-nt.html` | Completado: estilo propio "Dos Testamentos, Un Río" (directorio de los 66 libros de la Biblia; ver historial 2026-08-18) |
| `page/Figuras Bíblicas/figuras-cristo.html` | Completado: estilo propio "Manuscrito Iluminado"; ver historial 2026-08-18 |
| `page/Figuras Bíblicas/sacrificios-figuras.html` | Completado: estilo propio "El Altar de Piedra"; ver historial 2026-08-18 |
| `page/Figuras Bíblicas/templo-figuras.html` | Completado: estilo propio "Plano del Arquitecto"; ver historial 2026-08-18 |
| `page/Figuras Bíblicas/temple-3d.html` | Completado: visor 3D del Templo de Salomón reconstruido con Three.js r178, paleta "Plano del Arquitecto"; ver historial 2026-08-18 |
| `page/Figuras Bíblicas/tabernaculo-3d.html` | Completado: visor 3D del Tabernáculo (Éxodo 25-40), mismo patrón que temple-3d.html; ver historial 2026-08-18 |
| `page/Figuras Bíblicas/nombres-simbologia.html` | Refinado: se conservó el concepto "pergamino/rollo antiguo" existente, se agregó el header del sitio que faltaba; ver historial 2026-08-18 |
| `page/Figuras Bíblicas/tipologia-cantares.html` | Completado: estilo propio "Jardín Sellado"; ver historial 2026-08-18 |
| `page/Tiempo del Fin/introduccion.html` | Completado: estilo propio "Atalaya del Amanecer" (primera de 14 páginas de la categoría); ver historial 2026-08-18 |
| `page/Tiempo del Fin/escatologia.html` | Completado: estilo propio "Genealogía Doctrinal" (árbol/línea de linaje doctrinal); ver historial 2026-08-19 |
| `page/Tiempo del Fin/fundamentos/base-profetica.html` | Completado: estilo propio "Río Profético" (corriente que se ensancha); ver historial 2026-08-19 |
| `page/Tiempo del Fin/fundamentos/retorno-cristo.html` | Completado: estilo propio "Advenimiento Real" (heráldico/coronación); ver historial 2026-08-19 |
| `page/Tiempo del Fin/fundamentos/plan-divino.html` | Completado: estilo propio "Hilo de Oro" (tapiz/línea de hilo dorado); ver historial 2026-08-19 |
| `page/Tiempo del Fin/noticias-fin.html` | Completado: estilo propio "Sala de Redacción" (wire service/periódico). Conserva el menú dropdown completo; ver historial 2026-08-19 |
| `page/Tiempo del Fin/nuevo-orden-mundial.html` | Completado: estilo propio "Mesa de Negociación" (dossier diplomático); ver historial 2026-08-19 |
| `page/Tiempo del Fin/profecias-cumplidas.html` | Completado: estilo propio "Expediente de Verificación". 50 tarjetas generadas por JS, array de datos sin alterar; ver historial 2026-08-19 |
| `page/Tiempo del Fin/analisisescatologico/conversiones.html` | Completado: estilo propio "Lluvia Tardía" (tierra seca que reverdece). Antes huérfana, sin header del sitio; ver historial 2026-08-19 |

### ⏳ Páginas pendientes de aplicar la skill

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

#### `page/Tiempo del Fin/`

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
