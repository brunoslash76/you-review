import { AuthenticatedLayout } from 'components/layout'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getRestaurants } from 'infra/http'
import { RestaurantList } from 'components/molecules'
import star from 'public/star.png'
import './styles.css'

export const RegularHome = () => {

  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [selectedRate, setSelectedRate] = useState(null)

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

  const handleFilterClick = (rate) => {
    const filtered = restaurants.filter(restaurant => restaurant.average_rating === rate)
    setFilteredRestaurants(filtered)
    setSelectedRate(rate)
  }

  const handleClearFilter = () => {
    setFilteredRestaurants([])
    setSelectedRate(null)
  }

  return (
    <AuthenticatedLayout>
      <div className="regular-user-home--wrapper">
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
          <RestaurantList restaurantArray={filteredRestaurants.length > 0 ? filteredRestaurants : restaurants} />
        </ol>
      </div>
    </AuthenticatedLayout>
  )

}