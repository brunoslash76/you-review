import { useState, useMemo } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { UnauthenticatedLayout, TextInput, Button } from 'components'
import { forgotPasswordValidations } from 'helpers/forgot-password'
import { useUser } from 'hooks/user-hook'
import { recoverPassword } from 'infra/http/forgot-password'
import './styles.css'
import { ToastContainer, toast } from 'react-toastify'

export const ForgotPassword = (props) => {

  const [loading, setLoading] = useState()
  const history = useHistory()
  const { setUser } = useUser()
  

  const handleRecoverPassword = async (email) => {
    setLoading(true)
    try {
      const { data } = await recoverPassword(email)
      if (data) {
        setUser(data[0])
        history.push('/home')
        setLoading(false)
        return 
      }
      toast(`Oopss, ${email} not found!`)
      setLoading(false)
    } catch (error) {
      toast('Oopss something went wrong, please try again!')
      setLoading(false)
    }
  }

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgotPasswordValidations(),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => handleRecoverPassword(values.email)
  })

  const isButtonDisabled = useMemo(() => (
    errors.email || values.email === ''
  ), [errors, values])

  return (
    <UnauthenticatedLayout>
      <div className="unauth-form-controller">
        <div>
          <header>
            <h2>Recover</h2>
            <h3>password</h3>
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
          <div className="text-to-right">
            <p>remembered passwor? <Link className="highlight" to="/">click here</Link></p>
          </div>
        </div>
        <div>
        </div>
        <Button
          kind="primary"
          onClick={handleSubmit}
          loading={loading}
          type="button"
          disabled={isButtonDisabled}
        >
          recover
        </Button>
      </div>
      <ToastContainer />
    </UnauthenticatedLayout>
  )
}

ForgotPassword.path = '/forgot-password'
ForgotPassword.secure = false
ForgotPassword.title = 'Forgot Password'
