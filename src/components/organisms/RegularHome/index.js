import { useEffect, useState } from 'react'
import { getRestaurants } from 'infra/http/home'
import { toast } from 'react-toastify'
import { RestaurantItem } from 'components'
import star from 'public/star.png'
import './styles.css'
import { useHistory } from 'react-router'

export const RegularHome = () => {

  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [selectedRate, setSelectedRate] = useState(null)
  const history = useHistory()

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await getRestaurants()
        const sortedRestaurants = data.sort((item1, item2) =>
          item1.average_rating < item2.average_rating ? 1 : -1
        )
        setRestaurants(sortedRestaurants)
      } catch (error) {
        toast.error('Oopss, we couldn\'t fetch the restaurants, try again later.')
      }
    }
    fetchRestaurants()
  }, [])

  const handleRestaurantClick = (restaurantId) => {
    console.log(restaurantId)
    history.push({
      pathname: `/restaurant-details/${restaurantId}`,
      state: { restaurantId}
    })

  }

  const renderRestaurantList = () => {
    return renderList(restaurants)
  }

  const handleFilterClick = (rate) => {
    const filtered = restaurants.filter(restaurant => restaurant.average_rating === rate)
    setFilteredRestaurants(filtered)
    setSelectedRate(rate)
  }

  const renderFilteredRestaurants = () => {
    return renderList(filteredRestaurants)
  }

  const handleClearFilter = () => {
    setFilteredRestaurants([])
    setSelectedRate(null)
  }

  const renderList = (array) => {
    return array.map(restaurant => (
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
  }

  return (
    <div>
      <div>
        <div className="filter-header">
          <p>Filter by stars:</p>
          <button className="clear-filter-button" onClick={handleClearFilter}>clear filter</button>
        </div>
        <div className="regular-home--filter-container">
          <button className={selectedRate === 1 ? 'active' : null} onClick={() => handleFilterClick(1)}>
            <img src={star} alt="star" />
          </button>
          <button className={selectedRate === 2 ? 'active' : null} onClick={() => handleFilterClick(2)}>
            <img src={star} alt="star" />
          </button>
          <button className={selectedRate === 3 ? 'active' : null} onClick={() => handleFilterClick(3)}>
            <img src={star} alt="star" />
          </button>
          <button className={selectedRate === 4 ? 'active' : null} onClick={() => handleFilterClick(4)}>
            <img src={star} alt="star" />
          </button>
          <button className={selectedRate === 5 ? 'active' : null} onClick={() => handleFilterClick(5)}>
            <img src={star} alt="star" />
          </button>
        </div>
      </div>
      <ol>
        {
          filteredRestaurants.length > 0
            ? renderFilteredRestaurants()
            : renderRestaurantList()
        }
      </ol>
    </div>
  )

}