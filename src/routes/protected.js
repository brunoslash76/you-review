import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from 'hooks/user-hook'


export const Protected = ({ children, ...props }) => {
  const { user } = useUser()

  return (
    <Route
      {...props}
      render={() => {
        if (!user) {
          return <Redirect to={{ pathname: '/login' }} />
        }

        return children
      }}
    />
  )
}