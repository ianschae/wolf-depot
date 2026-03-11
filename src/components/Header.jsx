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
      <div className="top-bar" data-testid="top-bar">
        <div className="top-bar-inner">
          <Link to="/stores" data-testid="link-store-finder">Store Finder</Link>
          <Link to="/weekly-ad" data-testid="link-weekly-ad">Weekly Ad</Link>
          <Link to="/orders" data-testid="link-track-order">Track Order</Link>
          <Link to="/help" data-testid="link-help">Help</Link>
          <Link to="/cart" className="header-cart" data-testid="link-cart-top" style={{ marginLeft: 'auto', border: 'none', padding: '10px 12px', background: 'transparent', color: 'white' }}>
            Cart {totalItems > 0 && <span className="cart-count" data-testid="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>

      <header className="site-header" data-testid="site-header">
        <div className="header-inner">
          <Link to="/" className="logo" data-testid="logo">
            🐺 Wolf Depot
          </Link>

          <div className="search-wrap" data-testid="search-wrap">
            <form className="search-form" onSubmit={handleSearch} data-testid="search-form">
              <input
                type="search"
                placeholder="Search for products, brands, and more"
                aria-label="Search"
                data-testid="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" data-testid="search-submit">Search</button>
            </form>
          </div>

          <Link to="/cart" className="header-cart" data-testid="link-cart">
            🛒 Cart
            {totalItems > 0 && <span className="cart-count" data-testid="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </header>

      <nav className="nav-bar" data-testid="nav-bar">
        <div className="nav-inner">
          <Link
            to="/products"
            className={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}
            data-testid="nav-shop-all"
          >
            Shop All
          </Link>
          <Link to="/products/category/tools" className="nav-link" data-testid="nav-category-tools">Power Tools</Link>
          <Link to="/products/category/lumber" className="nav-link" data-testid="nav-category-lumber">Lumber</Link>
          <Link to="/products/category/hardware" className="nav-link" data-testid="nav-category-hardware">Hardware</Link>
          <Link to="/products/category/paint" className="nav-link" data-testid="nav-category-paint">Paint</Link>
          <Link to="/products/category/outdoor" className="nav-link" data-testid="nav-category-outdoor">Outdoor</Link>
        </div>
      </nav>
    </>
  )
}
