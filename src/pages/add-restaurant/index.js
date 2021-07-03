import { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthenticatedLayout, Button, GoBackButton, TextInput } from 'components'
import { ROLES } from 'helpers/home'
import { useUser } from 'hooks/user-hook'
import { postNewRestaurant } from 'infra/http'
import { toast, ToastContainer } from 'react-toastify'
import './styles.css'


export const AddRestaurant = () => {
  const { user } = useUser()
  const history = useHistory()
  const [restaurantName, setRestaurantName] = useState(null)
  const isDisabled = useMemo(() => !restaurantName || restaurantName === '' || restaurantName.length < 3, [restaurantName])

  if (user.role !== ROLES.owner) {
    return history.push('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await postNewRestaurant({ ownerId: user.id, restaurantName })
      history.goBack()
    } catch (error) {
      toast.error('Oopss we cound\'t post your new restaurant! Try again later.')
    }
  }

  return (
    <AuthenticatedLayout
      navigation={() => <GoBackButton />}
    >
      <h3 className="add-restaurant--heading">Add your restaurant</h3>
      <form className="add-restaurant--form" onSubmit={handleSubmit}>
        <div>
          <TextInput
            onChange={(event) => setRestaurantName(event.target.value)}
            placeholder="Your restaurant name"
          />
        </div>
        <div>
          <Button
            kind="primary"
            type="submit"
            disabled={isDisabled}
          >
            submit restaurant
          </Button>
        </div>
      </form>
      <ToastContainer />
    </AuthenticatedLayout>
  )
}

AddRestaurant.path = '/add-restaurant'
AddRestaurant.secure = true
AddRestaurant.title = 'Add Restaurant'
