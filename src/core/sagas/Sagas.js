/*
 * @flow
 */

import { fork, put, takeEvery, all, take, call } from 'redux-saga/effects';
import { actionType } from '../Constants';
import { fetchData } from '../../api';

function* loadEntitySaga() {
  console.log('starting: loadEntitySaga');
  let data = yield call(fetchData.property);
  data = data.slice(data.length - 5);
  console.log('finished loading data:', data);
  yield put({ type: actionType.LOADED_FETCH_ENTITY_DATA, data });
}

function* loadEntitySaga() {
  console.log('starting: loadEntitySaga');
  let data = yield call(fetchData.property);
  data = data.slice(data.length - 5);
  console.log('finished loading data:', data);
  yield put({ type: actionType.LOADED_FETCH_ENTITY_DATA, data });
}

function* loadEntitySaga() {
  console.log('starting: loadEntitySaga');
  let data = yield call(fetchData.property);
  data = data.slice(data.length - 5);
  console.log('finished loading data:', data);
  yield put({ type: actionType.LOADED_FETCH_ENTITY_DATA, data });
}


function* initialStateSaga() {
  yield fork(loadEntitySaga);
}


export default function* sagas() :Generator<*, *, *> {

  yield all([
    initialStateSaga()
  ]);
}
