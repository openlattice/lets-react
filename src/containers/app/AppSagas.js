/*
 * @flow
 */

/* eslint-disable no-use-before-define */

import { put, takeEvery } from 'redux-saga/effects';

import Logger from '../../utils/Logger';
import { ERR_ACTION_VALUE_NOT_DEFINED } from '../../utils/Errors';
import {
  LOAD_APP,
  loadApp,
} from './AppActions';

const LOG = new Logger('AppSagas');

/*
 * loadApp()
 */

function* loadAppWatcher() :Generator<*, *, *> {

  yield takeEvery(LOAD_APP, loadAppWorker);
}

function* loadAppWorker(action :SequenceAction) :Generator<*, *, *> {

  const { id, value } = action;
  if (value === null || value === undefined) {
    yield put(loadApp.failure(id, ERR_ACTION_VALUE_NOT_DEFINED));
    return;
  }

  try {
    yield put(loadApp.request(action.id));
    yield put(loadApp.success(action.id));
  }
  catch (error) {
    LOG.error('caught exception in loadAppWorker()', error);
    yield put(loadApp.failure(action.id, error));
  }
  finally {
    yield put(loadApp.finally(action.id));
  }
}

export {
  loadAppWatcher,
  loadAppWorker,
};
