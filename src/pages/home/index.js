import { useHistory } from 'react-router-dom'
import { ROLES } from 'helpers/home'
import { toast } from 'react-toastify'
import { AdminHome, RegularHome, OwnerHome } from 'components'
import { useUser } from 'hooks/user-hook'

export const Home = () => {
  const { user } = useUser()
  const history = useHistory()

  if (!user) {
    history.push('/')
    return null
  }
  switch (user.role) {
    case ROLES.regular:
      return <RegularHome />
    case ROLES.owner:
      return <OwnerHome />
    case ROLES.admin:
      return <AdminHome />
    default:
      history.push('/')
      toast.error('Oopps something wrong Please contact an admin')
      return null
  }
}

Home.path = '/home'
Home.secure = true
Home.title = 'Home'
