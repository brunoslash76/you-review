import './styles.css'

export const AuthenticatedLayoutOwner = (props) => {
  const { children } = props

  return (
    <div className="auth-owner-wrapper">
      <div className="auth-owner-container">
        <main className="auth-owner-content">
          {children}
        </main>
      </div>
    </div>
  )
}