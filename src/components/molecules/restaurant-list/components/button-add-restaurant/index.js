import { useHistory } from "react-router-dom"
import './styles.css'

export const ButtonAddRestaurant = () => {
  const history = useHistory()

  const handleAddNewRestaurant = () => {
    history.push('/add-restaurant')
  }

  return (
    <button
      className="owner-home--button-container"
      onClick={handleAddNewRestaurant}
    >
      <div>+</div>
      <p>Add Restaurant</p>
    </button>
  )
}