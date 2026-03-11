import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="main-content" data-testid="page-about">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>About</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">About Wolf Depot</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          About us, careers, corporate responsibility, and press. This is a demo store.
        </p>
        <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
      </div>
    </div>
  )
}
