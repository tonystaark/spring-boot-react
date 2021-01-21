import { createStore } from "redux";
import signInReducer from "./reducers/signInReducer";

const initialState = {
  signInSuccess: false,
  username: ''
}

const composeEnhancers =  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

function configureStore(state = initialState) {
  return createStore(signInReducer,state, composeEnhancers);
}

export default configureStore;