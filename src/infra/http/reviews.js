const { get, post, put, dellete } = require('helpers/http-helpers')

const REVIEWS_URL = '/reviews'

export const getReviews = () => {
    return get(REVIEWS_URL)
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

export const getRestaurantReviews = (restaurantId) => {
    return get(`${REVIEWS_URL}?restaurant_id=${restaurantId}`)
}

export const postReview = (body) => {
    return post(REVIEWS_URL, body)
}