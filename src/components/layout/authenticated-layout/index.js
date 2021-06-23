import './styles.css'

export const AuthenticatedLayout = (props) => {
  const { children, userName } = props

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <section className="auth-content">
          <header className="auth-header">
            <h1 className="auth-h1">You Review</h1>
            <p>Hello {userName}!</p>
          </header>
          <main>
            {children}
          </main>
        </section>
      </div>
    </div>
  )
}