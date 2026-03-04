import { Link } from 'react-router-dom'
import { categories, products } from '../data/products'

export default function Home() {
  const featured = products.slice(0, 6)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, var(--wolf-orange) 0%, var(--wolf-orange-dark) 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.25rem', margin: '0 0 0.5rem' }}>
          Wolf Depot
        </h1>
        <p style={{ margin: 0, fontSize: '1.15rem', opacity: 0.95 }}>
          Tools, Lumber &amp; Hardware — Everything you need for your next project.
        </p>
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--wolf-yellow)',
            color: 'var(--wolf-black)',
            borderRadius: 'var(--radius)',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Shop all products
        </Link>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Shop by category</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products/category/${cat.slug}`}
              style={{
                background: 'var(--wolf-white)',
                padding: '1.25rem',
                borderRadius: 'var(--radius)',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 600,
                boxShadow: 'var(--shadow)',
                textAlign: 'center',
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Featured products</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {featured.map((product) => (
            <article
              key={product.id}
              style={{
                background: 'var(--wolf-white)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                {product.image}
              </div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem', fontWeight: 600 }}>
                <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {product.name}
                </Link>
              </h3>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--wolf-orange)' }}>
                ${product.price.toFixed(2)}
              </p>
              <Link
                to={`/product/${product.id}`}
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                View details →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
