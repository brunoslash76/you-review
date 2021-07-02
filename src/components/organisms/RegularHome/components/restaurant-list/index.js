import { useHistory } from 'react-router-dom'
import { RestaurantItem } from 'components/molecules'
import './styles.css'

export const RestaurantList = ({ restaurantArray }) => {
  const history = useHistory()
  const handleRestaurantClick = (restaurantId) => {
    history.push(`/restaurant-details/${restaurantId}`)
  }

  const result = restaurantArray.map(restaurant => (
    <li
      className="clickable"
      key={`${restaurant.name}-${restaurant.id}`}
      onClick={() => handleRestaurantClick(restaurant.id)}
    >
      <RestaurantItem
        key={`${restaurant.name}-${restaurant.id}_item`}
        restaurant={restaurant}
      />
    </li>
  ))
  return result.length > 0 ? <ol>{result}</ol> : <p>No restaurant registered</p>
}