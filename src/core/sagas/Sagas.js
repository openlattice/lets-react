/*
 * @flow
 */

import { fork, put, call } from 'redux-saga/effects';
import { actionType } from '../Constants';
import fetchData from '../../api';

function* loadEntitySaga() {
  const data = yield call(fetchData('entity'));
  // data = data.slice(data.length - 5);
  // console.log('finished loading data:', data);
  yield put({ type: actionType.FINISHED_FETCH_ENTITY_DATA, data });
}

function* loadPropertySaga() {
  const data = yield call(fetchData('property'));
  // data = data.slice(data.length - 5);
  // console.log('finished loading data property:', data);
  yield put({ type: actionType.FINISHED_FETCH_PROPERTY_DATA, data });
  yield put({ type: actionType.UPDATE_LIST, value: 'property' });
}

function* loadAssociationSaga() {
  const data = yield call(fetchData('association'));
  // data = data.slice(data.length - 5);
  // console.log('finished loading data:', data);
  yield put({ type: actionType.FINISHED_FETCH_ASSOCIATION_DATA, data });
}

export default function* sagas() :Generator<*, *, *> {
  yield [
    fork(loadEntitySaga),
    fork(loadPropertySaga),
    fork(loadAssociationSaga)
  ];
}
