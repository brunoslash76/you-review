import star from 'public/star.png'
import './styles.css'

export const RatingStars = (props) => {

  const { averageRating } = props
  console.log(averageRating)

  const renderStars = () => {
    const stars = []

    for (let i = 0; i < averageRating; i++) {
      stars.push(<img className="image-star" key={`star_${i}`} src={star} alt="A star" />)
    }

    return stars
  }

  return (
    <div>
      {renderStars()}
    </div>
  )
  
}