/*
 * @flow
 */

import { fork, put, call } from 'redux-saga/effects';
import { actionType } from '../Constants';
import fetchData from '../../api';

function* loadEntitySaga() {
  const data = yield call(fetchData('entity'));
  yield put({ type: actionType.FINISHED_FETCH_ENTITY_DATA, data });
}

function* loadPropertySaga() {
  const data = yield call(fetchData('property'));
  yield put({ type: actionType.FINISHED_FETCH_PROPERTY_DATA, data });
}

function* loadAssociationSaga() {
  const data = yield call(fetchData('association'));
  yield put({ type: actionType.FINISHED_FETCH_ASSOCIATION_DATA, data });
}

export default function* sagas() :Generator<*, *, *> {
  yield [
    fork(loadEntitySaga),
    fork(loadPropertySaga),
    fork(loadAssociationSaga)
  ];
}
