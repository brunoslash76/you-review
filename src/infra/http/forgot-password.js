const { get } = require('helpers/http-helpers')

const URL = '/users'

export const recoverPassword = (email) => {
    return get(`${URL}?email=${email}`)
}