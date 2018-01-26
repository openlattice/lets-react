/*
 * @flow
 */

import { AuthSagas } from 'lattice-auth';
import { fork } from 'redux-saga/effects';

export default function* sagas() :Generator<*, *, *> {

  yield [
    // "lattice-auth" sagas
    fork(AuthSagas.watchAuthAttempt),
    fork(AuthSagas.watchAuthSuccess),
    fork(AuthSagas.watchAuthFailure),
    fork(AuthSagas.watchAuthExpired),
    fork(AuthSagas.watchLogout)
  ];
}
