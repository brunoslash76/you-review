import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { AuthenticatedLayout } from "components/layout"
import { RatingSelect } from "components/molecules"
import { Button, GoBackButton } from "components/atoms"
import { useUser } from "hooks/user-hook"
import { postReview, updateRestaurantReviews } from 'infra/http/restaurant-review'
import './styles.css'

export const RestaurantReview = () => {

  const history = useHistory()
  const { location: { state: { restaurant } } } = history
  const { user } = useUser()
  const [ rating, setRating ] = useState(0)
  const [ disableForm, setDisableForm ] = useState(false)
  const textareaRef = useRef()
  const dateRef = useRef()

  const handleSelect = (amount) => {
    setRating(amount)
  }

  const onSubmit = async () => {
    const date = dateRef.current.value
    if (isDateBiggerThanToday(date)) {
      return toast.error('Oopss it seems you are trying to travel to the future! Please select another date!')
    }
    setDisableForm(true)

    try {
      const body = {
        "user_id": user.id,
        "user_name": user.name,
        "restaurant_id": restaurant.id,
        "restaurant_name": restaurant.name,
        "comment": textareaRef.current.value || `${user.name} didn't leave a comment.`,
        "ratting": rating,
        "answer": null,
        "created_at": dateRef.current.value
      }
      await postReview(body)
      updateRestaurantReviews(restaurant)
      toast.success(
        'Your review was posted with success! We are going to redirect you!',
        {
          autoClose: 1999
        }
      )
      setTimeout(() => {
        history.goBack()
      }, 2000)

    } catch (error) {
      console.error(error)
      toast.error('Oopss we could not post your review. Try again later!')
    }
  }

  const isDateBiggerThanToday = (date) => {
    const today = Date.now()
    const selectedDate = new Date(date)
    return selectedDate.getTime() > today
  }

  return (
    <AuthenticatedLayout
      title={restaurant.name}
      restaurant={restaurant}
      navigation={() => (<GoBackButton />)}
    >
      <form className="form-container">
        <div className="textarea-container">
          <label htmlFor="">Your Review</label>
          <textarea
            id="comment"
            name="comment"
            ref={textareaRef}
            disabled={disableForm}
          />
        </div>
        <div className="inline-container">
          <div>
            <label>Date of your visit</label>
            <input
              type="date"
              ref={dateRef}
              disabled={disableForm}
            />
          </div>
          <div>
            <label>Your rating</label>
            <RatingSelect
              id="rating-select"
              name="rating-select"
              onSelect={handleSelect}
              isDisabled={disableForm}
            />
          </div>
        </div>
        <div className="submit-container">
          <Button
            kind="primary"
            type="button"
            onClick={onSubmit}
          >
            Submit review
          </Button>
        </div>
      </form>
      <ToastContainer />
    </AuthenticatedLayout>
  )
}

RestaurantReview.path = '/restaurant-review/:id'
RestaurantReview.secure = true
RestaurantReview.title = 'Restaurant Review'
