import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Card, CardContent, CardHeader} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import {IDefaultState} from '../constants/type'
import {useQuery} from "react-query";
import axios from "axios";
import {SignInSuccessAction} from "../redux/actions/signInAction";
import {  loggedInUserLocalStorage  } from "../constants/index";
import { getJWTTokenFromLocalStorage } from "../utils/index"
const Dashboard = ():JSX.Element => {

  const username = useSelector((state: IDefaultState) => state.username)
  const { data } = useQuery('getUserContent', () => axios.get('/api/test/user', { headers: {'Authorization': 'Bearer ' + getJWTTokenFromLocalStorage()}}), {
    refetchOnWindowFocus: false
  })
  const dispatch = useDispatch();

  const showData = () => {
    return data ? data.data: []
  }

  const loggedInUserInfoFoundInLocalStorageButNotInRedux = !username && localStorage.getItem(loggedInUserLocalStorage);
  const getUser = () => {
    if(loggedInUserInfoFoundInLocalStorageButNotInRedux) {
      const parsedLoggedInUserInfo = JSON.parse(localStorage.getItem(loggedInUserLocalStorage)!)
      dispatch(SignInSuccessAction({data: parsedLoggedInUserInfo}))
    }
  }

  useEffect(() => {
    getUser()
  })

  return (
    <>

        <Container>
          <Card style={{marginTop: '50px'}}>
            <CardHeader title="Dashboard"/>
            <CardContent>
              User Name: {username}

            </CardContent>
            <CardContent>
              Content: {showData()}

            </CardContent>
          </Card>
        </Container>
    </>
  )
}

export default Dashboard;