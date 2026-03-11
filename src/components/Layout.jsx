import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="under-construction-banner" role="status" aria-live="polite" data-testid="under-construction-banner">
        🚧 Site under construction — thanks for your patience!
      </div>
      <main style={{ minHeight: 'calc(100vh - 140px)', paddingBottom: '2rem' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
