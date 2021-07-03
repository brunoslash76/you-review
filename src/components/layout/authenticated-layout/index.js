import { Header } from 'components/molecules'
import './styles.css'

export const AuthenticatedLayout = (props) => {
  const { children, title, navigation } = props

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <section className="auth-content">
          <Header
            navigation={navigation}
            title={title}
          />
          <main>
            {children}
          </main>
        </section>
      </div>
    </div>
  )
}