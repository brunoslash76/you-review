const { post } = require('helpers/http-helpers')

const URL = '/restaurants'

export const postNewRestaurant = ({ownerId, restaurantName}) => {
  const payload = {
    owner_id: ownerId,
    name: restaurantName,
    average_rating: 0,
    total_reviews: 0
  }
  return post(URL, payload)
}
