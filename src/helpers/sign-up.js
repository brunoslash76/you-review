import * as Yup from 'yup'

export const signupValidations = () => Yup.object().shape({
    email: Yup.string().email('E-mail invalido').required(),
    password: Yup.string().min(6, 'Too short password').required(),
    name: Yup.string().min(3, 'Name is too short').required()
})