import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getRestaurant } from 'infra/http/restaurant-detail'
import { toast } from 'react-toastify'
import { AuthenticatedLayout, RatingStars } from 'components'
import './styles.css'


export const RestaurantDetail = (props) => {
  const history = useHistory()
  const [restaurant, setRestaurant] = useState(null)
  const { restaurantId } = history.location.state
  console.log(restaurantId)

  useEffect(() => {
    async function getRestaurantDetail() {
      try {
        const result = await getRestaurant(restaurantId)
        console.log(result)
        setRestaurant(result.data[0])
      } catch (error) {
        toast.error('Oopss we had a problem fetching the restaurant, try again later!')
      }
    }
    getRestaurantDetail()
  }, [restaurantId])

  return (
    <AuthenticatedLayout 
      title={restaurant && restaurant.name}
      restaurant={restaurant}
    >
      <section className="restaurant-detail--rating">
        <h4>Highest Rate</h4>
        <div>
          <p>Joe</p>
          <RatingStars averageRating={5}/>
        </div>
        <p>The restaurant serves a great food with good great service and the owner is very thoughtful</p>
      </section>

      <section className="restaurant-detail--rating">
        <h4>Lowest Rate</h4>
        <div>
          <p>Joe</p>
          <RatingStars averageRating={1}/>
        </div>
        <p>The restaurant serves a great food with good great service and the owner is very thoughtful</p>
      </section>

      <section className="restaurant-detail--rating">
        <h4>Last Rate</h4>
        <div>
          <p>Joe</p>
          <RatingStars averageRating={3}/>
        </div>
        <p>The restaurant serves a great food with good great service and the owner is very thoughtful</p>
      </section>
    </AuthenticatedLayout>
  )
}

RestaurantDetail.path = '/restaurant-details/:id'
RestaurantDetail.secure = false
RestaurantDetail.title = 'Restaurant Details'
