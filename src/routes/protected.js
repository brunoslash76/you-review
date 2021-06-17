import React from 'react'
import { Route, Redirect } from 'react-router-dom'


export const Protected = ({ children, ...props }) => {

  return (
    <Route
      {...props}
      render={() => {
        if (true) {
          return <Redirect to={{ pathname: '/login' }} />
        }

        return children
      }}
    />
  )
}