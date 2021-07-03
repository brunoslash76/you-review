import { useState } from 'react'
import { updateReviews } from 'infra/http'
import { toast } from 'react-toastify'
import { Button } from 'components/atoms'
import { RatingStars } from 'components/molecules'

export const PendingReviewsList = ({ reviews: reviewsArray }) => {

  const [reviews, setReviews] = useState()

  const handleApproveClick = async (review) => {
    try {
      /**
       * get the response from updateReviews
       * subtract from current reviews array
       * and delete setReloadReviews
       */
      const result = await updateReviews(review.id, review)
      toast.success(`Your answer was replied with success to ${review.user_name}`)
    } catch (error) {
      toast.error('Oopss we had a problem! Try again later')
    }
  }

  const toBeRendered = []
  for (let i = 0; i < reviewsArray.length; i++) {
    toBeRendered.push(
      <div className="restaurant-pending-reviews--container" key={reviewsArray[i][0]?.restaurant_name}>
        <h3>{reviewsArray[i][0]?.restaurant_name}</h3>
        <div className="restaurant-pending-reviews--info">
          {reviewsArray[i].map((review, index) => {
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