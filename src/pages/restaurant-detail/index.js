import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthenticatedLayout } from 'components/layout'
import { RatingStars } from 'components/molecules'
import { Button } from 'components/atoms'
import { getRestaurant, getRestaurantReviews } from 'infra/http'
import { GoBackButton } from 'components/atoms/go-back-button'
import { useUser } from 'hooks/user-hook'
import { ROLES } from 'helpers/home'
import './styles.css'

export const RestaurantDetail = () => {
  const history = useHistory()
  const [ restaurant, setRestaurant ] = useState(null)
  const [ reviews, setReviews ] = useState([])
  const { restaurantId } = useParams()
  const { user } = useUser()

  useEffect(() => {
    async function getRestaurantDetail() {
      try {
        const { data } = await getRestaurant(restaurantId)
        setRestaurant(data[0])
      } catch (error) {
        console.error(error)
        toast.error('Oopss we had a problem fetching the restaurant, try again later!')
      }
    }
    getRestaurantDetail()
  }, [restaurantId])

  useEffect(() => {
    async function getReviews() {
      try {
        const { data } = await getRestaurantReviews(restaurantId)
        if (data.length > 0) {
          setReviews(data)
        }
      } catch (error) {
        toast.error('Oopss we had a problem fetching reviews, try again later!')
      }
    }
    getReviews()
  }, [restaurantId])

  const renderHighestReview = () => {
    const review = reviews?.sort((item1, item2) => item1.ratting < item2.ratting ? 1 : -1)[0]
    return renderReview(review)
  }

  const renderLowestReview = () => {
    const review = reviews?.sort((item1, item2) => item1.ratting > item2.ratting ? 1 : -1)[0]
    return renderReview(review)
  }

  const renderLatestReview = () => {
    const review = reviews?.sort((item1, item2) => {
      const item1TimeStamp = new Date(item1.created_at)
      const item2TimeStamp = new Date(item2.created_at)
      return item1TimeStamp < item2TimeStamp ? 1 : -1
    })[0]
    return renderReview(review)
  }

  const renderReview = (review, isLatest = false) => {
    if (!review || review.length <= 0) {
      return <p>This restaurant has no reviews!</p>
    }
    return (
      <>
        <div>
          <p>{review.user_name}</p>
          <RatingStars averageRating={review.ratting} />
        </div>
        <p>{review.comment}</p>
        {review.answer && <p>{review.answer}</p>}
        {isLatest && !!review.answer ? <p>{review.answer}</p> : <p>The owner didn't reply yet!</p>}
        <p className="visited">visited at: {review.created_at}</p>
      </>
    )
  }

  const handleCreateReview = () => {
    history.push({ pathname: `/restaurant-review/${restaurant.id}` })
  }

  return (
    <AuthenticatedLayout
      title={restaurant && restaurant.name}
      restaurant={restaurant}
      navigation={() => (
        <GoBackButton />
      )}
    >
      {user.role !== ROLES.owner
        && (
          <div className="review-button-container">
            <Button kind="primary" onClick={handleCreateReview}>
              Make your review
            </Button>
          </div>
        )}
      <div className="restaurant-detail--content">
        <section className="restaurant-detail--rating">
          <h4>Highest Rate</h4>
          {renderHighestReview()}
        </section>

        <section className="restaurant-detail--rating">
          <h4>Lowest Rate</h4>
          {renderLowestReview()}
        </section>

        <section className="restaurant-detail--rating">
          <h4>Last Rate</h4>
          {renderLatestReview()}
        </section>
      </div>

    </AuthenticatedLayout>
  )
}

RestaurantDetail.path = '/restaurant-details/:restaurantId'
RestaurantDetail.secure = true
RestaurantDetail.title = 'Restaurant Details'
