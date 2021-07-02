const { post, get, dellete, put } = require('helpers/http-helpers')

const URL = '/restaurants'
const REVIEWS_URL = '/reviews'

export const postNewRestaurant = ({ownerId, restaurantName}) => {
  const payload = {
    owner_id: ownerId,
    name: restaurantName,
    average_rating: 0,
    total_reviews: 0
  }
  return post(URL, payload)
}

export const getOwnerRestaurants = (userId) => {
    return get(`${URL}?owner_id=${userId}`)
}

export const deleteRestaurant = (restaurantId) => {
    return dellete(`${URL}/${restaurantId}`)
}

export const getRestaurants = () => {
    return get(URL)
}

export const updateRestaurantReviews = (restaurant) => {
    return put(`${URL}/${restaurant.id}`, restaurant)
}

export const getRestaurant = (restaurantId) => {
    return get(`${URL}?id=${restaurantId}`)
}

export const addRestaurantReviews = async (restaurant) => {
    try {
        const { data } = await get(`${REVIEWS_URL}?restaurant_id=${restaurant.id}`)
        console.log(data)
        let sum = 0
        for (let i = 0; i < data.length; i++) {
            sum += data[i].ratting
        }
        const average = Math.floor(sum / data.length)
        restaurant.average_rating = average
        restaurant.total_reviews = restaurant.total_reviews + 1

        await put(`${URL}/${restaurant.id}`, restaurant)

    } catch(error) {
        throw new Error(error)
    }
}
