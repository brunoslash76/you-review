const { post } = require("helpers/http-helpers")

const REVIEWS_URL = '/reviews'

export const postReview = (body) => {
    return post(REVIEWS_URL, body)
}
