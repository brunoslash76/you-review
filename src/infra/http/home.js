const { get, put } = require('helpers/http-helpers')

const URL = '/restaurants'
const REVIEWS_URL = '/reviews'

export const getRestaurants = () => {
    return get(URL)
}

export const getOwnerRestaurants = (userId) => {
    return get(`${URL}?owner_id=${userId}`)
}

export const getPendingReview = (restaurantId) => {
    return get(`${REVIEWS_URL}?restaurant_id=${restaurantId}`)
}

export const updateReviews = (reviewId, payload) => {
    return put(`${REVIEWS_URL}/${reviewId}`, payload)
}