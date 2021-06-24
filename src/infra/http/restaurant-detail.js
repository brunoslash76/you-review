const { get } = require("helpers/http-helpers")

const RESTAURANTS_URL = '/restaurants'
const REVIEWS_URL = '/reviews'

export const getRestaurant = (restaurantId) => {
    return get(`${RESTAURANTS_URL}?id=${restaurantId}`)
}

export const getRestaurantReviews = (restaurantId) => {
    return get(`${REVIEWS_URL}?restaurant_id=${restaurantId}`)
}