const { post } = require("helpers/http-helpers")

const URL = '/users'

export const signup = (body) => {
    return post(URL, body)
}