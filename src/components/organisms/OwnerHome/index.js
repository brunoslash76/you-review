import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { getOwnerRestaurants, getPendingReview, updateReviews } from 'infra/http'
import { RestaurantItem, RatingStars } from 'components/molecules'
import { Button } from 'components/atoms'
import { AuthenticatedLayoutOwner } from 'components/layout'
import { useUser } from 'hooks/user-hook'
import './styles.css'
import { RestaurantList } from 'components/molecules/restaurant-list'

export const OwnerHome = () => {
  const { user } = useUser()
  const [restaurants, setRestaurants] = useState([])
  const [reloadReviews, setReloadReviews] = useState(false)
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
  }, [restaurants, reloadReviews])

  const handleApproveClick = async (review) => {
    try {
      await updateReviews(review.id, review)
      toast.success(`Your answer was replied with success to ${review.user_name}`)
      setReloadReviews(state => !state)
    } catch (error) {
      toast.error('Oopss we had a problem! Try again later')
    }
  }

  const renderPendingReviewsList = () => {
    const toBeRendered = []
    for (let i = 0; i < reviews.length; i++) {
      toBeRendered.push(
        <div className="restaurant-pending-reviews--container" key={reviews[i][0]?.restaurant_name}>
          <h3>{reviews[i][0]?.restaurant_name}</h3>
          <div className="restaurant-pending-reviews--info">
            {reviews[i].map((review, index) => {
              return !review.answer && (
                <div className="restaurant-pending-reviews--info-content" key={`review_${review.user_name}_${index}`}>
                  <div>
                    <p>{review.user_name}</p>
                    <RatingStars averageRating={review.ratting} />
                  </div>
                  <p>{review.comment}</p>
                  <div>
                    <textarea onChange={({ target }) => review.answer = target.value} />
                  </div>
                  <Button
                    type="button"
                    kind="primary"
                    size="small"
                    onClick={() => handleApproveClick(review)}
                  >
                    add your response
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    return toBeRendered
  }

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
          {renderPendingReviewsList()}
        </div>
      </div>
    </AuthenticatedLayoutOwner>
  )
}