/*
 * @flow
 */

import { AuthSagas } from 'lattice-auth';
import { all, fork } from 'redux-saga/effects';

import * as AppSagas from '../../containers/app/AppSagas';

export default function* sagas() :Generator<*, *, *> {

  yield all([
    // "lattice-auth" sagas
    fork(AuthSagas.watchAuthAttempt),
    fork(AuthSagas.watchAuthSuccess),
    fork(AuthSagas.watchAuthFailure),
    fork(AuthSagas.watchAuthExpired),
    fork(AuthSagas.watchLogout),

    // AppSagas
    fork(AppSagas.loadAppWatcher),
  ]);
}
