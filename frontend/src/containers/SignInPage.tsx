import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import { Card, CardContent, CardHeader, CardActions, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useMutation, useQuery} from "react-query";
import { useHistory } from 'react-router-dom';
import axios, { AxiosError} from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { SignInSuccessAction } from "../redux/actions/signInAction";
import { checkMatchedRegexOccurrence,  convertObjStringValuesToNumber} from "../utils/index";
import { IStringRecord, INumberRecord, ILoginInfo, ILoginCommonConfig, IUsernameConfig, IPasswordConfig } from "../constants/type";
import {  requiresMinimum, loggedInUserLocalStorage  } from "../constants/index";
import { Alert, AlertTitle } from '@material-ui/lab';

const { REACT_APP_RESOURCES_IMAGE_PATH } = process.env;


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:  'calc(100vh - 144px)',
  },
  card: {
    boxSizing: 'border-box',
    padding: '30px',
    height: '450px',
    width: '600px',
    border: '1px solid #BFBFBF',
    boxShadow: '10px 10px 5px #aaaaaa',
  },
  cardAction : {
    marginTop: '30px',
  },
  cardButton : {
    backgroundColor: 'primary'
  }
}));

const SignInPage = ():JSX.Element => {
  //@ts-ignore
  const loggedIn = useSelector(state => state.signInSuccess)
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''})
  const [errorMessage, setErrorMessage] = useState('')

  const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({...loginInfo, username:event.target.value})
  }

  const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({...loginInfo, password:event.target.value})
  }

  const { data: loginProperties } = useQuery('getLoginProperties', () => axios.get('/api/auth/login/property'))

  const [postSignInInfo] = useMutation((loginInfo: ILoginInfo) => axios.post('/api/auth/signin', loginInfo), {
    onSuccess: (payload) => {
      console.log('success')
      dispatch(SignInSuccessAction(payload))
      history.push('/dashboard')
    },
    onError: (error: AxiosError) => {
      console.log('error', error)
    },
  });


  //@ts-ignore
  useEffect(() => {
    const getLoggedInUserInfo = localStorage.getItem(loggedInUserLocalStorage)
    if (getLoggedInUserInfo ){
      history.push('/dashboard')
    }
  })

  const validateLoginInfo = (str: string, loginConfig: IStringRecord):boolean => {
    const parsedLoginConfig = convertObjStringValuesToNumber(loginConfig)
    const { minLength, minLowerCase, minUpperCase, minSpecialCharacter, minNumericalCharacter } = parsedLoginConfig;
    if (str.length < minLength) {
      setErrorMessage(`${ requiresMinimum } ${minLength} characters`);
      return false;
    }  else if (checkMatchedRegexOccurrence(str, /[a-z]/) !== minLowerCase) {
      setErrorMessage(`${ requiresMinimum } ${minLowerCase} lower cases`);
      return false;
    } else if (checkMatchedRegexOccurrence(str, /[A-Z]/) !== minUpperCase) {
      setErrorMessage(`${ requiresMinimum } ${minUpperCase} upper cases`);
      return false;
    } else if (checkMatchedRegexOccurrence(str,/[^a-zA-Z0-9.]/) !== minSpecialCharacter) {
      setErrorMessage(`${requiresMinimum} ${minUpperCase} symbols`);
      return false;
    }else if (checkMatchedRegexOccurrence(str,/[\d]/) !== minNumericalCharacter) {
      setErrorMessage (`${requiresMinimum} ${minNumericalCharacter} minNumericalCharacter`);
    }
    return true;
  }

  const signIn = async(): Promise<void> => {
    if(loginProperties && loginProperties.data){
      const { username: usernameConfig, password: passwordConfig } = loginProperties!.data
      if (validateLoginInfo(loginInfo.username, usernameConfig) && validateLoginInfo(loginInfo.password, passwordConfig)){
        await postSignInInfo(loginInfo);
      }
    }
  };


  return (
    <>
        <Container className={classes.container}>
          <img src={`${REACT_APP_RESOURCES_IMAGE_PATH}/exam.jpg`} width='600' height='auto' style={{marginRight: '100px'}}alt='Landing' />

          <Card className={classes.card}>
            <CardHeader title="Log In"/>
            <CardContent>
              <TextField style={{marginBottom: '20px'}}fullWidth={true} id="username" name="username" label="username" onChange={setUsername}/>
              <TextField fullWidth={true} id="password" name="password" label="password" onChange={setPassword}/>
              <CardActions className={classes.cardAction}>
                <Button variant='contained' color='primary'  fullWidth={true} onClick={signIn} >Log In</Button>
              </CardActions>
              {errorMessage &&
              <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
              }
            </CardContent>
          </Card>
        </Container>
    </>
  )
}

export default SignInPage;