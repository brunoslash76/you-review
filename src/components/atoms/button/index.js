import PropTypes from 'prop-types'
import loader from '../../../public/loader.gif'
import './styles.css'

export const Button = (props) => {
  const { children, kind, loading } = props
  return (
    <button
      className={kind}
      {...props}
    >
      {children}
      {loading && <img className="loader" src={loader} alt="Loading icon moving in a eigth pattern" />}
    </button>
  )
}

Button.propTypes = {
  kind: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.string
}
