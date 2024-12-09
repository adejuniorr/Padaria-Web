import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import ProductStock from './components/product-stock/ProductStock'
import EditProduct from './components/edit-product/EditProduct'
import RegisterProduct from './components/register-product/RegisterProduct'
import App from './App'
import { RegisterProductProvider } from './contexts/register-product-ctx/RegisterProductProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<ProductStock />} />
          <Route path="/produto/:id" element={<EditProduct />} />
        </Route>
        <Route path="/novo" element={
          <RegisterProductProvider>
            <RegisterProduct />
          </RegisterProductProvider>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
