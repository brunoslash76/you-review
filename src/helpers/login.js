import * as Yup from 'yup'

export const loginValidations = () => Yup.object().shape({
    email: Yup.string().email('E-mail invalido').required(),
    password: Yup.string().min(6, 'Too short password').required()
})