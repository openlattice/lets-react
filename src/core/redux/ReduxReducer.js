/*
 * @flow
 */

import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

export default function reduxReducer() {

  return combineReducers({
    auth: AuthReducer
  });
}
