import { RestaurantPlaceholder } from 'components'
import star from 'public/star.png'
import './styles.css'

export const RestaurantItem = ({ restaurant }) => {

  const renderStars = () => {
    const stars = []

    for (let i = 0; i < restaurant.average_rating; i++) {
      stars.push(<img src={star} alt="A star" />)
    }

    return stars
  }

  return (
    <div className="restaurant-item--wrapper">
      <div className="restaurant-item--image-container">
        {
          !!restaurant.image
            ? <img src={restaurant.image} alt={`${restaurant.name}`} />
            : <RestaurantPlaceholder />
        }

      </div>
      <div className="restaurant-item--info-container">
        <h3>Don Carlini</h3>
        <div className="restaurant-item--star-container">
          {renderStars()}
        </div>
      </div>
    </div>
  )
}