import { Link } from 'react-router-dom'

// Mismo logo/nombre que el header de index.html, para que la app no se
// sienta "atrapada" sin salida: el logo lleva de vuelta al sitio principal.
export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 p-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/images/EMD.png?v=2" alt="Logo EMD" className="size-10 object-contain" />
          <div className="leading-tight">
            <div className="font-heading text-base font-semibold text-foreground">Ministerio</div>
            <div className="text-xs text-muted-foreground">&quot;La Gloria es del Señor&quot;</div>
          </div>
        </a>
        <Link to="/" className="text-sm font-medium text-primary hover:underline">
          Comunidad de fe
        </Link>
      </div>
    </header>
  )
}
