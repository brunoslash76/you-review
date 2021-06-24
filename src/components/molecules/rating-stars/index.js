import star from 'public/star.png'
import starOutlined from 'public/star-outline.png'
import './styles.css'

export const RatingStars = (props) => {

  const { averageRating } = props

  const renderStars = () => {
    const stars = []

    for (let i = 0; i < averageRating; i++) {
      stars.push(<img className="image-star" key={`star_${i}`} src={star} alt="A star" />)
    }

    if (averageRating === 0) {
      for (let i = 0; i < 5; i++) {
        stars.push(<img className="image-star" key={`star_${i}`} src={starOutlined} alt="A star" />)
      }
    }

    return stars
  }

  return (
    <div>
      {renderStars()}
    </div>
  )
  
}