import { useHistory } from 'react-router-dom'
import arrowLeft from 'public/arrow-left.png'

export const GoBackButton = () => {
  const history = useHistory()
  return (
    <button className="back-button" onClick={() => history.goBack()}>
      <img src={arrowLeft} alt="arrow left" />
    </button>
  )
}