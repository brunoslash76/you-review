const { get } = require("helpers/http-helpers")

const URL = '/users'

export const login = ({email, password}) => {
    return get(`${URL}?email=${email}&password=${password}`)
}