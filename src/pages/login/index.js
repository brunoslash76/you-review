import { useEffect, useState, useMemo } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { login } from 'infra/http'
import { loginValidations } from 'helpers'
import { UnauthenticatedLayout, TextInput, Button } from 'components'
import { useUser } from 'hooks/user-hook'
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useUser()
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
      toast.error('Oops, we got an error! Plese try again')
    }
  }

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

  const isButtonDisabled = useMemo(() => (
    errors.email || errors.password || values.email === '' || values.password === ''
  ), [errors, values])

  return (
    <UnauthenticatedLayout>
      <div className="unauth-form-controller">
        <div>
          <header className="login-header">
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
          <div className="text-to-right">
            <p>don't have an account? <Link className="highlight" to="/sign-up">click here</Link></p>
          </div>
          <Button
            kind="primary"
            onClick={handleSubmit}
            loading={loading}
            type="button"
            disabled={isButtonDisabled}
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
