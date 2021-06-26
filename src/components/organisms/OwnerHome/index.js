import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { getOwnerRestaurants, getPendingReview, updateReviews } from 'infra/http/home'
import { RestaurantItem, RatingStars } from 'components/molecules'
import { Button } from 'components/atoms'
import { AuthenticatedLayoutOwner } from 'components/layout'
import { useUser } from 'hooks/user-hook'
import './styles.css'

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

  const handleRestaurantClick = (restaurantId) => {
    history.push({
      pathname: `/restaurant-details/${restaurantId}`,
      state: { restaurantId }
    })
  }

  const renderRestaurantList = () => {
    return restaurants.map(restaurant => (
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

  const handleAproveClick = async (review) => {
    try {
      await updateReviews(review.id, review)
      toast.success(`Your answer was replied with success to ${review.user_name}`)
      setReloadReviews(state => !state)
    } catch (error) {
      toast.error('Oopss we had a problem! Try again later')
    }
  }

  const rederPendingReviewsList = () => {
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
                    onClick={() => handleAproveClick(review)}
                  >
                    approve
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
    return history.push('/add-restaurant')
  }

  return (
    <AuthenticatedLayoutOwner>
      <div className="owner-user-home--wrapper">
        <h2>You Review</h2>
        <ol>
          {renderRestaurantList()}
          <li className="clickable">
            <button
              className="owner-home--button-container"
              onClick={handleAddNewRestaurant}
            >
              <div>+</div>
              <p>Add Restaurant</p>
            </button>
          </li>
        </ol>
      </div>
      <div className="owner-user-home--wrapper">
        <h2>Pending reviews</h2>
        <div>
          {rederPendingReviewsList()}
        </div>
      </div>
    </AuthenticatedLayoutOwner>
  )

}