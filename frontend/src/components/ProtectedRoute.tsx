import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {  loggedInUserLocalStorage  } from "../constants/index";

//@ts-ignore
const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {

  return (
      <Route {...rest} render={
        props => {
          if (loggedIn || localStorage.getItem(loggedInUserLocalStorage) !== null) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                pathname: '/unauthorized',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
  )
}

export default ProtectedRoute;