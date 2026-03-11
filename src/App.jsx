import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Help from './pages/Help'
import Stores from './pages/Stores'
import Orders from './pages/Orders'
import About from './pages/About'
import Account from './pages/Account'
import ProCenter from './pages/ProCenter'
import GiftCards from './pages/GiftCards'
import WeeklyAd from './pages/WeeklyAd'

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/category/:categorySlug" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/help" element={<Help />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/pro-center" element={<ProCenter />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/weekly-ad" element={<WeeklyAd />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}
