import { useState } from 'react'
import './styles.css'
import openEyeIcon from 'public/visible.png'
import closedEyeIcon from 'public/not-visible.png'

export const TextInput = (props) => {
  const { error, type } = props
  const [isPasswordVisible, setPasswordVisible] = useState(true)
  const shouldShowPasswordButton = type === 'password'
  return (
    <div className="text-input--container">
      <input
        {...props}
        type={shouldShowPasswordButton && isPasswordVisible ? type : 'text'}
      />
      {shouldShowPasswordButton
        && (
          <button
            className="text-input-buttom"
            type="button"
            onClick={() => setPasswordVisible(state => !state)}
          >
            <img
              src={isPasswordVisible ?  openEyeIcon : closedEyeIcon}
              alt="Show password icon, an open or closed eye"
            />
          </button>
        )
      }
      {error && <div className="text-input--error" >{error}</div>}
    </div>
  )
}