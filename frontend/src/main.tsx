import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import ProductStock from './components/product-stock/ProductStock'
import EditProduct from './components/edit-product/EditProduct'
import CreateProduct from './components/create-product/CreateProduct'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<ProductStock />} />
          <Route path="/produto/:id" element={<EditProduct />} />
          <Route path="/novo" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
