import { Button } from 'components/atoms'
import { RatingStars } from 'components/molecules'

export const PendingReviewsItem = ({ reviews: reviewsarray, handleApproveClick }) => {

  return !reviewsarray.answer && (
    <div
      className="restaurant-pending-reviews--info-content"
      key={`review_${reviewsarray.user_name}_${reviewsarray.id}`}
    >
      <div>
        <p>{reviewsarray.user_name}</p>
        <RatingStars averageRating={reviewsarray.ratting} />
      </div>
      <p>{reviewsarray.comment}</p>
      <div>
        <textarea onChange={({ target }) => reviewsarray.answer = target.value} />
      </div>
      <Button
        type="button"
        kind="primary"
        size="small"
        onClick={() => handleApproveClick(reviewsarray)}
      >
        add your response
      </Button>
    </div>
  )

}