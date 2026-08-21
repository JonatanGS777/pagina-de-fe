import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthGate } from '@/components/AuthGate'
import { TopicsPage } from '@/routes/TopicsPage'
import { TopicPage } from '@/routes/TopicPage'
import { FavoritesPage } from '@/routes/FavoritesPage'

function App() {
  return (
    <BrowserRouter basename="/comunidad">
      <AuthGate>
        <Routes>
          <Route path="/" element={<TopicsPage />} />
          <Route path="/tema/:id" element={<TopicPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Routes>
      </AuthGate>
    </BrowserRouter>
  )
}

export default App
