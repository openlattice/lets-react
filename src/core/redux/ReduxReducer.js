/*
 * @flow
 */

import { connectRouter } from 'connected-react-router/immutable';
import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

import { REDUCERS } from './constants';

import { AppReducer } from '../../containers/app';
import { DataReducer } from '../data';
import { EDMReducer } from '../edm';

export default function reducer(routerHistory :any) {

  return combineReducers({
    [REDUCERS.APP]: AppReducer,
    [REDUCERS.DATA]: DataReducer,
    [REDUCERS.EDM]: EDMReducer,
    auth: AuthReducer,
    router: connectRouter(routerHistory),
  });
}
