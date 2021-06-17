import {UnauthenticatedLayout} from '../../components'
import './styles.css'

export const Login = (props) => {
    return (
        <UnauthenticatedLayout>
            login
        </UnauthenticatedLayout>
    )
}

Login.path = '/login'
Login.secure = false
Login.title = 'Login'
