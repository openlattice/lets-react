/*
 * @flow
 */

import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

import appReducer from '../../containers/app/AppReducer';

export default function reduxReducer() {

  return combineReducers({
    app: appReducer,
    auth: AuthReducer
  });
}
