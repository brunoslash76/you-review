import { useState } from 'react'
import { updateReviews } from 'infra/http'
import { toast } from 'react-toastify'
import { PendingReviewsItem } from '../pending-reviews-item'

export const PendingReviewsList = ({ reviews: reviewsArray }) => {

  const [reviews, setReviews] = useState(reviewsArray)

  const handleApproveClick = async (review) => {
    try {
      const { data } = await updateReviews(review.id, review)
      const filteredReviews = reviews.filter(item => item.id !== data.id)
      setReviews(filteredReviews)
      toast.success(`Your answer was replied with success to ${review.user_name}`)
    } catch (error) {
      toast.error('Oopss we had a problem! Try again later')
    }
  }

  const toBeRendered = []
  for (let i = 0; i < reviews.length; i++) {
    toBeRendered.push(
      <div className="restaurant-pending-reviews--container" key={reviews[i][0]?.restaurant_name}>
        <h3>{reviews[i][0]?.restaurant_name}</h3>
        <div className="restaurant-pending-reviews--info">
          {
            reviews.map(item =>
              <PendingReviewsItem
                handleApproveClick={handleApproveClick}
                reviews={item}
              />)
          }
        </div>
      </div>
    )
  }
  return toBeRendered
}