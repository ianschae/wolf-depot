import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { categories, products } = useData()
  const featured = products.slice(0, 8)

  return (
    <div className="main-content" data-testid="page-home">
      <div className="container">
        <section className="hero" data-testid="hero">
          <h1 data-testid="hero-title">Wolf Depot</h1>
          <p data-testid="hero-tagline">Tools, Lumber &amp; Hardware — Everything you need for your next project. Free delivery on orders over $45.</p>
          <Link to="/products" className="btn" data-testid="hero-shop-all">Shop All Products</Link>
        </section>

        <section style={{ marginBottom: 40 }} data-testid="section-departments">
          <h2 className="section-title">Shop by Department</h2>
          <div className="dept-grid" data-testid="dept-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/category/${cat.slug}`}
                className="dept-card"
                data-testid={`dept-card-${cat.slug}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        <section data-testid="section-featured">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid" data-testid="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/products" className="btn-primary" data-testid="link-view-all-products">View All Products</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
