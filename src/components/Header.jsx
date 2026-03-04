import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function Header() {
  const { totalItems } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-inner">
          <Link to="/">Store Finder</Link>
          <Link to="/products">Weekly Ad</Link>
          <Link to="/products">Track Order</Link>
          <Link to="/">Help</Link>
          <Link to="/cart" className="header-cart" style={{ marginLeft: 'auto', border: 'none', padding: '10px 12px', background: 'transparent', color: 'white' }}>
            Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">
            🐺 Wolf Depot
          </Link>

          <div className="search-wrap">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search for products, brands, and more"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <Link to="/cart" className="header-cart">
            🛒 Cart
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </header>

      <nav className="nav-bar">
        <div className="nav-inner">
          <Link
            to="/products"
            className={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}
          >
            Shop All
          </Link>
          <Link to="/products/category/tools" className="nav-link">Power Tools</Link>
          <Link to="/products/category/lumber" className="nav-link">Lumber</Link>
          <Link to="/products/category/hardware" className="nav-link">Hardware</Link>
          <Link to="/products/category/paint" className="nav-link">Paint</Link>
          <Link to="/products/category/outdoor" className="nav-link">Outdoor</Link>
        </div>
      </nav>
    </>
  )
}
