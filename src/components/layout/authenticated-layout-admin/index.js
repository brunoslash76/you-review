import { LogoutButton } from 'components/atoms/logout-button'
import { useUser } from 'hooks/user-hook'
import './styles.css'

export const AuthenticatedLayoutAdmin = (props) => {
  const { children } = props
  const { user } = useUser()
  return (
    <div className="auth-admin-wrapper">
      <div className="auth-admin-container">
        <header>
          <h1>You Review</h1>
          <div>
            <h2>Amdin - {user.name}</h2>
            <LogoutButton />
          </div>
        </header>
        <main className="auth-admin-content">
          {children}
        </main>
      </div>
    </div>
  )
}