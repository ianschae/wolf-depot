import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import NavigationLoading from './NavigationLoading'

export default function Layout() {
  return (
    <>
      <NavigationLoading />
      <Header />
      <main style={{ minHeight: 'calc(100vh - 140px)', paddingBottom: '2rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
