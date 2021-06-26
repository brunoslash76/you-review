import { LogoutButton } from 'components/atoms/logout-button'
import { RatingStars } from 'components/molecules'
import './styles.css'

export const AuthenticatedLayout = (props) => {
  const { children, title, restaurant, navigation } = props

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <section className="auth-content">
          <header className="auth-header">
            <div className="auth-header-container">
              <div>
                {navigation && navigation()}
                <h1 className="auth-h1">{title ? title : 'You Review'}</h1>
              </div>
              <LogoutButton />
            </div>
            <div className={!!restaurant ? "auth-subtitle" : "auth-name-right"}>
              {
                restaurant
                && (
                  <div className="auth-restaurant-avaliation">
                    <RatingStars averageRating={restaurant.average_rating} />
                    <p>of <strong>{restaurant.total_reviews}</strong> avaliations</p>
                  </div>
                )
              }
            </div>
          </header>
          <main>
            {children}
          </main>
        </section>
      </div>
    </div>
  )
}