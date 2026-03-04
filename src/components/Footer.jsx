import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--wolf-gray-900)',
        color: 'var(--wolf-gray-400)',
        padding: '2rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            color: 'var(--wolf-white)',
            textDecoration: 'none',
            fontSize: '1.1rem',
          }}
        >
          Wolf Depot
        </Link>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
          Tools, Lumber &amp; Hardware — Demo store. No real transactions.
        </p>
      </div>
    </footer>
  )
}
