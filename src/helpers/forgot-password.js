import * as Yup from 'yup'

export const forgotPasswordValidations = () => Yup.object().shape({
    email: Yup.string().email('E-mail invalido').required()
})