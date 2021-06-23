import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { login } from 'infra/http/login'
import { loginValidations } from '../../helpers'
import { UnauthenticatedLayout, TextInput, Button } from '../../components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css'
import { useUser } from 'hooks/user-hook'

export const Login = (props) => {
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useUser()
  const history = useHistory()

  const handleLogin = async (payload) => {
    setLoading(true)
    try {
      const { data } = await login(payload)
      delete data[0].password
      setUser(data[0])
      setLoading(false)
      history.push('/home')
    } catch (error) {
      console.error(error)
      toast('Oops, we got an error! Plese try again')
    }
  }

  useEffect(() => console.log(user), [user])

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidations(),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => handleLogin({
      password: values.password,
      email: values.email
    })
  })

  return (
    <UnauthenticatedLayout>
      <div className="unauth-form-controller">
        <div>
          <header>
            <h2>Login</h2>
          </header>

          <div className="input-control">
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="e-mail"
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <div className="input-control">
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              error={errors.password}
            />
            <div className="text-to-right">
              <p>forgot password? <Link className="highlight" to="/forgot-password">click here</Link></p>
            </div>
          </div>
        </div>
        <div>
          <Button
            kind="primary"
            onClick={handleSubmit}
            loading={loading}
            type="button"
          >
            sign in
          </Button>
        </div>
      </div>
      <ToastContainer />
    </UnauthenticatedLayout>
  )
}

Login.path = '/'
Login.secure = false
Login.title = 'Login'
