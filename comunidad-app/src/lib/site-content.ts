/**
 * Índice curado de páginas reales del sitio (page/<Categoría>/<archivo>.html),
 * para que un tema pueda citar contenido específico en vez de solo texto libre.
 * Mismas categorías y páginas que el menú de navegación del sitio principal.
 */

export interface SitePage {
  /** Identificador estable para guardar en Topic.siteLink.pageId (independiente de la URL). */
  id: string
  category: string
  title: string
  url: string
}

function page(category: string, file: string, title: string): SitePage {
  return {
    id: `${category}/${file}`,
    category,
    title,
    url: `/page/${encodeURIComponent(category)}/${file}`,
  }
}

export const SITE_PAGES: SitePage[] = [
  // Figuras bíblicas
  page('Figuras Bíblicas', 'at-a-nt.html', 'Antiguo y Nuevo Testamento'),
  page('Figuras Bíblicas', 'nombres-simbologia.html', 'Los nombres y su simbología'),
  page('Figuras Bíblicas', 'templo-figuras.html', 'El templo y sus figuras'),
  page('Figuras Bíblicas', 'tabernaculo-figuras.html', 'El tabernáculo y sus figuras'),
  page('Figuras Bíblicas', 'sacrificios-figuras.html', 'Los sacrificios y sus figuras'),
  page('Figuras Bíblicas', 'tipologia-cantares.html', 'Tipología del Cantar de los Cantares'),
  page('Figuras Bíblicas', 'figuras-cristo.html', 'Figuras de Cristo'),
  page('Figuras Bíblicas', 'imagen-de-fe.html', 'Galería bíblica'),

  // Estudios exegéticos
  page('Estudios Exegéticos', 'temas-exegeticos.html', 'Temas exegéticos'),
  page('Estudios Exegéticos', 'cantarcantares.html', 'Cantar de los Cantares'),
  page('Estudios Exegéticos', 'idiomas-biblia.html', 'Hebreo, arameo y griego en la Biblia'),
  page('Estudios Exegéticos', 'enlaces-recursos.html', 'Enlaces de recursos'),
  page('Estudios Exegéticos', 'diccionarios-comentarios.html', 'Diccionarios y comentarios'),
  page('Estudios Exegéticos', 'software-biblico.html', 'Software bíblico'),
  page('Estudios Exegéticos', 'meditacion-palabra.html', 'Meditación en la Palabra'),
  page('Estudios Exegéticos', 'lectura-anual.html', 'Lectura anual'),

  // Tiempo del fin
  page('Tiempo del Fin', 'introduccion.html', 'Introducción al tiempo del fin'),
  page('Tiempo del Fin', 'escatologia.html', 'Escatología'),
  page('Tiempo del Fin', 'profecias-cumplidas.html', 'Profecías cumplidas'),
  page('Tiempo del Fin', 'nuevo-orden-mundial.html', 'Nuevo orden mundial'),
  page('Tiempo del Fin', 'noticias-fin.html', 'Noticias del fin'),

  // Época de Jesús
  page('Época de Jesús', 'estudio-contemporaneo.html', 'Estudio contemporáneo'),
  page('Época de Jesús', 'contexto-historico.html', 'Contexto histórico'),
  page('Época de Jesús', 'grupos-religiosos.html', 'Grupos religiosos'),
  page('Época de Jesús', 'recursos-academicos.html', 'Estudios de contexto'),
  page('Época de Jesús', 'apologia-cristiana.html', 'Apología cristiana'),

  // Estudios bíblicos
  page('Estudios Bíblicos', 'doctrina-basica.html', 'Doctrina básica'),
  page('Estudios Bíblicos', 'doctrina-intermedia.html', 'Doctrina intermedia'),
  page('Estudios Bíblicos', 'doctrina-avanzada.html', 'Doctrina avanzada'),
  page('Estudios Bíblicos', 'revelacion-espiritu.html', 'Revelación del Espíritu'),
  page('Estudios Bíblicos', 'devocionales.html', 'Devocionales'),
  page('Estudios Bíblicos', 'aguila-cinco-ministerios.html', 'El águila y los cinco ministerios'),

  // Falsas doctrinas
  page('Falsas Doctrinas', 'falsasdoctrinas.html', 'Falsas doctrinas'),
  page('Falsas Doctrinas', 'gnosticismos.html', 'Gnosticismos en la Biblia'),
  page('Falsas Doctrinas', 'filosofias-griegas.html', 'Filosofías griegas'),
  page('Falsas Doctrinas', 'masoneria.html', 'Masonería'),
  page('Falsas Doctrinas', 'sociedades-secretas.html', 'Sociedades secretas'),
  page('Falsas Doctrinas', 'sectas-anticristianas.html', 'Sectas anticristianas'),
  page('Falsas Doctrinas', 'pseudoprofetas.html', 'Pseudoprofetas'),
]

export const SITE_PAGES_BY_ID = new Map(SITE_PAGES.map((p) => [p.id, p]))

export const SITE_CATEGORIES = [...new Set(SITE_PAGES.map((p) => p.category))]
