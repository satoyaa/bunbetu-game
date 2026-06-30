import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Game from './pages/Game'
import Learn from './pages/Learn'
import Start from './pages/Start'
import { DifficultyProvider } from './contexts/Difficulty'

function App() {
  return (
    <DifficultyProvider>
      <BrowserRouter>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/game" element={<Game />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </DifficultyProvider>
  )
}

export default App
