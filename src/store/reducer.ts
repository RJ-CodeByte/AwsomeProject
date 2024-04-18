import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/service/apis/auth/slice';
// import signupReducer from '~/service/apis/auth/signup/slice';
import subscriptionReducer from '~/service/apis/subscription/slice';
import commonReducer from '~/service/apis/common/slice';
import otpReducer from '~/service/apis/otp/slice';


const rootReducer = combineReducers({
  auth: authReducer.reducer,
  // signup: signupReducer.reducer,
  subscription: subscriptionReducer.reducer,
  common: commonReducer.reducer,
  otp: otpReducer.reducer,
});
export default rootReducer;
// https://redux.js.org/api/combinereducers#arguments
// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types