import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import ListProducts from './components/ListProducts'
import EditProduct from './components/EditProduct'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/editar/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
