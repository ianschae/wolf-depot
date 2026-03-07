import { useNavigation } from 'react-router-dom'

export default function NavigationLoading() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (!isLoading) return null

  return (
    <div className="nav-loading" role="status" aria-label="Loading">
      <div className="nav-loading-bar" />
    </div>
  )
}
