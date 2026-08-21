import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthGate } from '@/components/AuthGate'
import { SiteHeader } from '@/components/SiteHeader'
import { TopicsPage } from '@/routes/TopicsPage'
import { TopicPage } from '@/routes/TopicPage'
import { FavoritesPage } from '@/routes/FavoritesPage'

// HashRouter (no BrowserRouter): las rutas viven después de # y nunca llegan
// al servidor como paths distintos. El rewrite de Vercel para /comunidad/**
// (regla con comodín) resultó no ser confiable en el edge real de producción
// aunque sí funcionaba en vercel dev local, así que evitamos depender de él;
// solo se necesita que /comunidad (ruta exacta) resuelva, y eso sí funciona.
function App() {
  return (
    <HashRouter>
      <AuthGate>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<TopicsPage />} />
          <Route path="/tema/:id" element={<TopicPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Routes>
      </AuthGate>
    </HashRouter>
  )
}

export default App
