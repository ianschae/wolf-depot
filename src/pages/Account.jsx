import { Link } from 'react-router-dom'

export default function Account() {
  return (
    <div className="main-content" data-testid="page-account">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Account</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Account</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          Sign in, order history, saved items, and credit services. This is a demo store — no real account.
        </p>
        <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
      </div>
    </div>
  )
}
