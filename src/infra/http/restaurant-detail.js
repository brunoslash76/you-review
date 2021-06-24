const { get } = require("helpers/http-helpers")

const URL = '/restaurants'

export const getRestaurant = (restaurantId) => {
    return get(`${URL}?id=${restaurantId}`)
}

export const getRestaurantReviews = (restaurantId) => {
    return get(`${URL}?restaurant_id=${restaurantId}`)
}