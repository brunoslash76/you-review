const { get, put, dellete } = require('helpers/http-helpers')

const RESTAURANT_URL = '/restaurants'
const REVIEWS_URL = '/reviews'
const USERS_URL = '/users'

export const getRestaurants = () => {
    return get(RESTAURANT_URL)
}

export const getUsers = () => {
    return get(USERS_URL)
}

export const getReviews = () => {
    return get(REVIEWS_URL)
}

export const getOwnerRestaurants = (userId) => {
    return get(`${RESTAURANT_URL}?owner_id=${userId}`)
}

export const getPendingReview = (restaurantId) => {
    return get(`${REVIEWS_URL}?restaurant_id=${restaurantId}`)
}

export const updateReviews = (reviewId, payload) => {
    return put(`${REVIEWS_URL}/${reviewId}`, payload)
}

export const deleteReview = (reviewId) => {
    return dellete(`${REVIEWS_URL}/${reviewId}`)
}

export const deleteUser = (userId) => {
    return dellete(`${USERS_URL}/${userId}`)
}

export const deleteRestaurant = (restaurantId) => {
    return dellete(`${RESTAURANT_URL}/${restaurantId}`)
}
