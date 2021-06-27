const { post, get, put } = require("helpers/http-helpers")

const REVIEWS_URL = '/reviews'
const RESTAURANT_URL = '/restaurants'

export const postReview = (body) => {
    return post(REVIEWS_URL, body)
}

export const getRestaurant = (restaurantId) => {
    return get(`${RESTAURANT_URL}?id=${restaurantId}`)
}

export const updateRestaurantReviews = async (restaurant) => {
    try {
        const { data } = await get(`${REVIEWS_URL}?restaurant_id=${restaurant.id}`)
        console.log(data)
        let sum = 0
        for (let i = 0; i < data.length; i++) {
            sum += data[i].ratting
        }
        debugger
        const average = Math.floor(sum / data.length)

        restaurant.average_rating = average
        restaurant.total_reviews = restaurant.total_reviews + 1
        await put(`${RESTAURANT_URL}/${restaurant.id}`, restaurant)

    } catch(error) {
        throw new Error(error)
    }
}
