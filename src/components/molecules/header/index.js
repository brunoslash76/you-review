import PropTypes from 'prop-types'
import { LogoutButton } from "components/atoms/logout-button"
import './styles.css'

export const Header = ({ navigation, title }) => {
  return (
    <header className="header-wrapper">
      <div className="header-title">
        {navigation && navigation()}
        <h1 className="auth-h1">{title ? title : 'You Review'}</h1>
      </div>
      <div className="header-logout">
        <LogoutButton />
      </div>
    </header>
  )
}

Header.propTypes = {
  navigation: PropTypes.func,
  title: PropTypes.string
}

Header.defaultProps = {
  navigation: null,
  title: null
}
