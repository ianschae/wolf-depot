import { useParams, Link } from 'react-router-dom'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const { categorySlug } = useParams()
  const category = categories.find((c) => c.slug === categorySlug)
  const filtered = categorySlug && category
    ? products.filter((p) => p.category === category.id)
    : products

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'var(--wolf-gray-700)', fontSize: '0.9rem' }}>
          ← Home
        </Link>
        {category && (
          <>
            <span style={{ margin: '0 0.5rem', color: 'var(--wolf-gray-400)' }}>/</span>
            <Link to="/products" style={{ color: 'var(--wolf-gray-700)', fontSize: '0.9rem' }}>
              Products
            </Link>
          </>
        )}
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
        {category ? category.name : 'All products'}
      </h1>

      {!category && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/products/category/${c.slug}`}
              style={{
                padding: '0.4rem 0.75rem',
                background: 'var(--wolf-white)',
                borderRadius: 'var(--radius)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: 'var(--shadow)',
              }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
