/*
 * @flow
 */

import { connectRouter } from 'connected-react-router/immutable';
import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

import { AppReducer } from '../../containers/app';
import { EDMReducer } from '../edm';

export default function reduxReducer(routerHistory :any) {

  return combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    edm: EDMReducer,
    router: connectRouter(routerHistory),
  });
}
