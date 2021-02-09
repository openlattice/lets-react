/*
 * @flow
 */

import {
  all,
  call,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import { EntityDataModelApiActions, EntityDataModelApiSagas } from 'lattice-sagas';
import { LangUtils, Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import { ENTITY_TYPES, PROPERTY_TYPES } from '../../redux/constants';
import { GET_EDM_TYPES, getEntityDataModelTypes } from '../actions';

const LOG = new Logger('EDMSagas');

const { isDefined } = LangUtils;
const { getAllEntityTypes, getAllPropertyTypes } = EntityDataModelApiActions;
const { getAllEntityTypesWorker, getAllPropertyTypesWorker } = EntityDataModelApiSagas;

function* getEntityDataModelTypesWorker(action :SequenceAction) :Saga<WorkerResponse> {

  let workerResponse :WorkerResponse;

  try {
    yield put(getEntityDataModelTypes.request(action.id));

    const responses :Object[] = yield all([
      call(getAllEntityTypesWorker, getAllEntityTypes()),
      call(getAllPropertyTypesWorker, getAllPropertyTypes()),
    ]);

    // all requests must succeed
    const responseError = responses.reduce(
      (error :any, r :Object) => (isDefined(error) ? error : r.error),
      undefined,
    );
    if (responseError) throw responseError;

    workerResponse = {
      data: {
        [ENTITY_TYPES]: responses[0].data,
        [PROPERTY_TYPES]: responses[1].data,
      },
    };
    yield put(getEntityDataModelTypes.success(action.id, workerResponse.data));
  }
  catch (error) {
    workerResponse = { error };
    LOG.error(action.type, error);
    yield put(getEntityDataModelTypes.failure(action.id, error));
  }
  finally {
    yield put(getEntityDataModelTypes.finally(action.id));
  }

  return workerResponse;
}

function* getEntityDataModelTypesWatcher() :Saga<*> {

  yield takeEvery(GET_EDM_TYPES, getEntityDataModelTypesWorker);
}

export {
  getEntityDataModelTypesWatcher,
  getEntityDataModelTypesWorker,
};
