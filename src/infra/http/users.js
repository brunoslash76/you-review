const { get, post, dellete } = require("helpers/http-helpers")

const URL = '/users'

export const login = ({email, password}) => {
    return get(`${URL}?email=${email}&password=${password}`)
}

export const signup = (body) => {
    return post(URL, body)
}

export const recoverPassword = (email) => {
    return get(`${URL}?email=${email}`)
}

export const deleteUser = (userId) => {
    return dellete(`${URL}/${userId}`)
}

export const getUsers = () => {
    return get(URL)
}