import { useEffect, useState } from 'react'
import { getRestaurants } from 'infra/http/home'
import { toast } from 'react-toastify'
import { RestaurantItem } from 'components'

export const RegularHome = () => {
  const [restaurants, setRestaurants] = useState([])

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
  },[])

  const handleRestaurantClick = (restaurantId) => {
    console.log(restaurantId)
  }

  const renderRestaurantList = () => {
    return restaurants.map(restaurant => (
      <li className="clickable" key={`${restaurant.name}-${restaurant.id}`} onClick={() => handleRestaurantClick(restaurant.id)}>
        <RestaurantItem restaurant={restaurant}/>
      </li>
    ))
  }

  return (
    <div>
      <ol>
      {
        renderRestaurantList()
      }
      </ol>
    </div>
  )

}