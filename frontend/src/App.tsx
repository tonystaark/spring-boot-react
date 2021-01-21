import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInPage from './containers/SignInPage'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'
import Dashboard from './containers/Dashboard'
import {  useDispatch, useSelector } from "react-redux";

export default function App() {
   //@ts-ignore
   const loggedIn = useSelector(state => state.signInSuccess)
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <ProtectedRoute exact path='/dashboard'  loggedIn={loggedIn} component={Dashboard} />
          <Route exact path="/unauthorized" component={Unauthorized} />

        </Switch>
      </BrowserRouter>
  )
}


