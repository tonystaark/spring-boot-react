import { loggedInUserLocalStorage } from '../../constants/index'

//@ts-ignore
export const SignInSuccessAction = (payload) => {
  localStorage.setItem(loggedInUserLocalStorage ,JSON.stringify({
        username: payload.data.username,
        roles: payload.data.roles,
        accessToken: payload.data.accessToken,
        email: payload.data.email
      }
  ))
  return {
    type: "SignInSuccess",
    payload: payload.data
  }
};

export const LogOutSuccessAction = () => {
  localStorage.clear();
  return {
    type: "LogOutSuccess",
  }
};