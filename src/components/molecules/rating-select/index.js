import star from 'public/star.png'
import starOutline from 'public/star-outline.png'
import { useState } from 'react/cjs/react.development'
import './styles.css'

export const RatingSelect = (props) => {

  const { onSelect, isDisabled = false } = props
  const [starsAmount, setStarsAmout] = useState(0)

  const handleClick = (amount) => {
    onSelect(amount)
    setStarsAmout(amount)
  }

  return (
    <div className="select-container">
      <button
        type="button"
        onClick={() => handleClick(1)}
        disabled={isDisabled}
      >
        <img src={starsAmount >= 1 ? star : starOutline} alt="yellow star" />
      </button>
      <button
        type="button"
        onClick={() => handleClick(2)}
        disabled={isDisabled}
      >
        <img src={starsAmount >= 2 ? star : starOutline} alt="yellow star" />
      </button>
      <button
        type="button"
        onClick={() => handleClick(3)}
        disabled={isDisabled}
      >
        <img src={starsAmount >= 3 ? star : starOutline} alt="yellow star" />
      </button>
      <button
        type="button"
        onClick={() => handleClick(4)}
        disabled={isDisabled}
      >
        <img src={starsAmount >= 4 ? star : starOutline} alt="yellow star" />
      </button>
      <button
        type="button"
        onClick={() => handleClick(5)}
        disabled={isDisabled}
      >
        <img src={starsAmount >= 5 ? star : starOutline} alt="yellow star" />
      </button>
    </div>
  )
}