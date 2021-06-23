const { get } = require('helpers/http-helpers')

const URL = '/restaurants'

export const getRestaurants = () => {
    return get(URL)
}