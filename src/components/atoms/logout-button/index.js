import { useUser } from "hooks/user-hook"
import { useHistory } from "react-router-dom"
import './styles.css'

export const LogoutButton = () => {
  const { setUser } = useUser()
  const history = useHistory()

  const handleClick = () => {
    setUser(null)
    history.push('/')
  }

  return (
    <button className="logout-button" onClick={handleClick}>Logout</button>
  )
}