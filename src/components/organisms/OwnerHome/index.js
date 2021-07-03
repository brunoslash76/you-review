import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { getOwnerRestaurants, getPendingReview } from 'infra/http'
import { AuthenticatedLayoutOwner } from 'components/layout'
import { useUser } from 'hooks/user-hook'
import './styles.css'
import { RestaurantList } from 'components/molecules/restaurant-list'
import { PendingReviewsList } from './components/pending-reviews-list'

export const OwnerHome = () => {
  const { user } = useUser()
  const [restaurants, setRestaurants] = useState([])
  const [reviews, setReviews] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await getOwnerRestaurants(user.id)
        const sortedRestaurants = data.sort((item1, item2) =>
          item1.average_rating < item2.average_rating ? 1 : -1
        )
        setRestaurants(sortedRestaurants)
      } catch (error) {
        toast.error('Oopss, we couldn\'t fetch the restaurants, try again later.')
      }
    }
    fetchRestaurants()
  }, [user.id])

  useEffect(() => {
    async function fetchPendingReviews() {
      if (!restaurants) return
      const result = []
      try {
        for (let restaurant of restaurants) {
          const { data } = await getPendingReview(restaurant.id)
          if (data.length > 0) result.push(data)
        }
        setReviews(result)
      } catch (error) {
        toast.error('Oopss we couldn\'t fetch pending reviews! Try again later.')
      }
    }
    fetchPendingReviews()
  }, [restaurants])

  const handleAddNewRestaurant = () => {
    history.push('/add-restaurant')
  }

  return (
    <AuthenticatedLayoutOwner>
      <div className="owner-user-home--wrapper">
        <h2>You Review</h2>
        <RestaurantList 
          restaurantArray={restaurants}
          handleAddNewRestaurant={handleAddNewRestaurant}
          hasAddRestaurantActions
        />
      </div>
      <div className="owner-user-home--wrapper">
        <h2>Pending reviews</h2>
        <div>
          <PendingReviewsList 
            reviews={reviews}
          />
        </div>
      </div>
    </AuthenticatedLayoutOwner>
  )
}

