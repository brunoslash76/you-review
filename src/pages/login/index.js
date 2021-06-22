import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginValidations } from '../../helpers'
import { UnauthenticatedLayout, TextInput, Button } from '../../components'
import './styles.css'

export const Login = (props) => {


  const handleLogin = (payload) => {
    console.log(payload)
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
      name: values.name,
      phone: values.phone,
      email: values.email
    })
  })

  return (
    <UnauthenticatedLayout>
      <div className="login-controller">
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
              data-testId="email"
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
              data-testId="password"
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
            data-testId="button-submit"
          >
            sign in
          </Button>
        </div>
      </div>
    </UnauthenticatedLayout>
  )
}

Login.path = '/login'
Login.secure = false
Login.title = 'Login'
