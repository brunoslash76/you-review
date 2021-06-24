import { ROLES } from 'helpers/home'
import { useUser } from 'hooks/user-hook'
import { toast } from 'react-toastify'
import { RegularHome, AuthenticatedLayout } from 'components'
import { useHistory } from 'react-router-dom'

export const Home = () => {
  const { user } = useUser()
  const history = useHistory()
  console.log(user)

  const userRoleController = () => {
    switch (user.role) {
      case ROLES.regular:
        return <RegularHome />
      case ROLES.owner:
        // return <OwnerHome />
        break
      case ROLES.admin:
        // return <AdminHome />
        break
      default:
        history.push('/')
        toast.error('Oopps something wrong Please contact an admin')
    }
  }

  return (
    <AuthenticatedLayout>
      {userRoleController()}
    </AuthenticatedLayout>
  )
}

Home.path = '/home'
Home.secure = false
Home.title = 'Home'
