export const PendingReviewsList = ({ reviews }) => {

  const handleApproveClick = async (review) => {
    try {
      /**
       * get the response from updateReviews
       * subtract from current reviews array
       * and delete setReloadReviews
       */
      await updateReviews(review.id, review)
      toast.success(`Your answer was replied with success to ${review.user_name}`)
      setReloadReviews(state => !state)
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