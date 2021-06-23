import { useState, useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Checkbox } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { signup } from 'infra/http/signup'
import { signupValidations } from 'helpers'
import { UnauthenticatedLayout, TextInput, Button } from '../../components'
import { useUser } from 'hooks/user-hook'

import 'react-toastify/dist/ReactToastify.css';
import './styles.css'

export const SignUp = () => {

  const [loading, setLoading] = useState(false)
  const { setUser } = useUser()
  const history = useHistory()

  const handleSignUp = async (payload) => {
    setLoading(true)
    try {
      const { data } = await signup(payload)
      console.log(data)
      setUser(data)
      setLoading(false)
      history.push('/home')
    } catch (error) {
      toast.error('Oops, we got an error! Plese try again')
      setLoading(false)
    }
  }

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: ''
    },
    validationSchema: signupValidations(),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => handleSignUp({
      name: values.name,
      password: values.password,
      email: values.email,
      role: values.role[0] || 'regular'
    })
  })

  const isButtonDisabled = useMemo(() => (
    (errors.email || values.email === '')
    || (errors.password || values.password === '')
    || (errors.name || values.name === '')
  ), [errors, values])

  return (
    <UnauthenticatedLayout>
      <div className="unauth-form-controller">
        <div>
          <header>
            <h2>Sign Up</h2>
          </header>
          <div className="input-control">
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange}
              error={errors.name}
            />
          </div>
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
            <div className="actions-container">
              <div>
                <Checkbox 
                  size="md"
                  name="role"
                  id="role"
                  value="owner"
                  onChange={handleChange}
                  colorScheme="red"
                >
                  <p>I'm a owner</p>
                </Checkbox>
              </div>
              <div className="text-to-right">
                <p>have an account? <Link className="highlight" to="/">click here</Link></p>
              </div>
            </div>
          </div>
        </div>
        <div>

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

SignUp.path = '/sign-up'
SignUp.secure = false
SignUp.title = 'Sign Up'

