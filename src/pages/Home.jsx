import { Link } from 'react-router-dom'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const featured = products.slice(0, 8)

  return (
    <div className="main-content">
      <div className="container">
        <section className="hero">
          <h1>Wolf Depot</h1>
          <p>Tools, Lumber &amp; Hardware — Everything you need for your next project.</p>
          <Link to="/products" className="btn">Shop All Products</Link>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 className="section-title">Shop by Department</h2>
          <div className="dept-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/category/${cat.slug}`}
                className="dept-card"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/products" className="btn-primary">View All Products</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
