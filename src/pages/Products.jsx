import { useParams, useSearchParams, Link } from 'react-router-dom'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const { categorySlug } = useParams()
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase().trim() || ''
  const category = categories.find((c) => c.slug === categorySlug)
  let filtered = categorySlug && category
    ? products.filter((p) => p.category === category.id)
    : products
  if (q) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
  }

  return (
    <div className="main-content">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {category ? (
            <>
              <Link to="/products">Products</Link>
              <span>/</span>
              <span>{category.name}</span>
            </>
          ) : (
            <span>Products</span>
          )}
        </nav>

        <h1 className="section-title" style={{ marginBottom: 24 }}>
          {category ? category.name : q ? `Results for "${q}"` : 'All Products'}
        </h1>

        {!category && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products/category/${c.slug}`}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: 13 }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p style={{ color: 'var(--gray-500)', fontSize: 16 }}>No products found.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
