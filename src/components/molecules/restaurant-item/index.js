import { RestaurantPlaceholder } from 'components'
import { RatingStars } from '../rating-stars'
import './styles.css'

export const RestaurantItem = ({ restaurant }) => {

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
        <h3>{restaurant.name}</h3>
        <div className="restaurant-item--star-container">
          <RatingStars averageRating={restaurant.average_rating}/>
        </div>
      </div>
    </div>
  )
}