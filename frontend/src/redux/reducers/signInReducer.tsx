
//@ts-ignore

export default (state, action) => {
  switch (action.type) {
    case "SignInSuccess":

      return {
        signInSuccess:true,
        username: action.payload.username
      };
    case "LogOutSuccess":

      return {
        signInSuccess:false,
        username: ""
      };
    default:
      return state;
  }
};