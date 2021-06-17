import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Screens from '../pages'

export const AppRouter = () => {
  const routes = React.useMemo(() => Object.values(Screens), [])
  const unprotectedRoutes = routes.filter(item => !item.secured)

  return (
    <BrowserRouter>
      <Switch>
        {unprotectedRoutes.map((Page, index) => (
          <Route
            key={`common_route_${Page.name}_${index}`}
            path={Page.path}
            exact
          >
            <Page />
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  )
}
