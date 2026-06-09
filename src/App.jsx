import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Crear from './pages/Crear'
import Ver from './pages/Ver'
import Detalle from './pages/Detalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/ver" element={<Ver />} />
        <Route path="/ver/:id" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App