import { useEffect, useState } from 'react/cjs/react.development'
import { AuthenticatedLayoutAdmin } from 'components/layout'
import { useUser } from 'hooks/user-hook'
import {
  getRestaurants,
  getReviews,
  getUsers,
  deleteReview,
  updateReviews,
  deleteUser,
  deleteRestaurant
} from 'infra/http/home'
import './styles.css'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from 'components/atoms'
import { RatingStars } from 'components/molecules'

export const AdminHome = () => {
  const { user } = useUser()
  const [users, setUsers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [reviews, setResviews] = useState([])
  const [refreshUsers, setRefreshUsers] = useState(false)
  const [refreshRestaurants, setRefreshRestaurants] = useState(false)
  const [refreshReviews, setRefreshResviews] = useState(false)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await getUsers()
        const res = data.filter(usr => usr.id !== user.id)
        setUsers(res)
      } catch (error) {
        toast.error('Oopss we had an error trying to fetch users')
      }
    }
    fetchUsers()
  }, [user, refreshUsers])

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await getRestaurants()
        const res = data.sort((item1, item2) => item1.average_rating > item2.average_rating ? 1 : -1)
        setRestaurants(res)
      } catch (error) {
        toast.error('Oopss we had an error trying to fetch restaurants')
      }
    }
    fetchRestaurants()
  }, [refreshRestaurants])

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await getReviews()
        setResviews(data)
      } catch (error) {
        toast.error('Oopss we had an error trying to fetch reviews')
      }
    }
    fetchReviews()
  }, [refreshReviews])

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId)
      setRefreshUsers(state => !state)
      toast.success('You have deleted successfully a user')
    } catch (error) {
      toast.error('Oopss, we have a problem trying to delete a user! Try again later.')
    }

  }

  const handleUpdateComment = async (review) => {
    try {
      await updateReviews(review.id, review)
      setRefreshResviews(state => !state)
      toast.success('You have deleted successfully a comment')
    } catch (error) {
      toast.error('Oopss, we have a problem trying to delete a comment! Try again later.')

    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId)
      setRefreshResviews(state => !state)
      toast.success('You have deleted successfully a review')
    } catch (error) {
      toast.error('Oopss, we have a problem trying to delete a review! Try again later.')
    }
  }

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await deleteRestaurant(restaurantId)
      setRefreshRestaurants(state => !state)
      toast.success('You have deleted successfully a review')
    } catch (error) {
      toast.error('Oopss, we have a problem trying to delete a review! Try again later.')
    }
  }

  const renderUsers = () => users.map(user => (
    <div key={`user_${user.name}_${user.id}`} className="render-container">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p className="render-user-container--user-role">Role: {user.role}</p>
      <Button
        size="small"
        kind="danger"
        onClick={() => handleDeleteUser(user.id)}
      >
        delete
      </Button>
    </div>
  ))

  const renderRestaurants = () => restaurants.map(restaurant => (
    <div key={`restaurant_${restaurant.name}_${restaurant.id}`} className="render-container">
      <p>Name: {restaurant.name}</p>
      <div>
        <p>Average Rating:</p>
        <RatingStars averageRating={restaurant.average_rating} />
      </div>
      <p className="render-restaurant-container--reviews">{restaurant.total_reviews} reviews</p>
      <Button
        size="small"
        kind="danger"
        onClick={() => handleDeleteRestaurant(restaurant.id)}
      >
        delete
      </Button>
    </div>
  ))

  const renderReviews = () => reviews.map(review => (
    <div key={`review_${review.id}`} className="render-container">
      <p>User: {review.user_name}</p>
      <p>Restaurant: <strong>{review.restaurant_name}</strong></p>
      <p>Avaliation</p>
      <RatingStars averageRating={review.ratting} />
      <div className="render-reviews-container--comments-container">
        <p className="render-reviews-container--info">Comment: {review.comment}</p>

      </div>
      {(!!review.answer || review.answer === '')
        && (
          <div>
            <p className="render-reviews-container--info">Answer: {review.answer}</p>
          </div>
        )}
      {!!review.comment && <Button
        size="small"
        onClick={() => handleUpdateComment({ ...review, comment: null })}
      >
        delete comment
      </Button>}
      <Button
        kind="danger"
        size="small"
        onClick={() => handleDeleteReview(review.id)}
      >
        delete review
      </Button>
    </div>
  ))

  return (
    <AuthenticatedLayoutAdmin>
      <div className="admin-home--wrapper">
        <section className="admin-home--section">
          <h4>Users</h4>
          <div>
            {renderUsers().length > 0 ? renderUsers() : <p>No users</p>}
          </div>
        </section>
        <section className="admin-home--section">
          <h4>Restaurants</h4>
          <div>
            {renderRestaurants().length > 0 ? renderRestaurants() : <p>No restaurants</p>}
          </div>
        </section>
        <section className="admin-home--section">
          <h4>Reviews</h4>
          <div>
            {renderReviews().length > 0 ? renderReviews() : <p>No comments</p>}
          </div>
        </section>
      </div>
      <ToastContainer />
    </AuthenticatedLayoutAdmin>
  )
}