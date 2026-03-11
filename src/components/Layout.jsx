import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="under-construction-banner-wrap" aria-hidden="false">
        <div className="under-construction-banner" role="status" aria-live="polite" data-testid="under-construction-banner">
          🚧 Under construction
        </div>
      </div>
      <main style={{ minHeight: 'calc(100vh - 140px)', paddingBottom: '2rem' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
