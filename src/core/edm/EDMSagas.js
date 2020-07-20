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
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import {
  GET_EDM_TYPES,
  getEntityDataModelTypes,
} from './EDMActions';

const LOG = new Logger('EDMSagas');

const { getAllEntityTypes, getAllPropertyTypes } = EntityDataModelApiActions;
const { getAllEntityTypesWorker, getAllPropertyTypesWorker } = EntityDataModelApiSagas;

/*
 *
 * EDMActions.getEntityDataModelTypes()
 *
 */

function* getEntityDataModelTypesWorker(action :SequenceAction) :Saga<*> {

  const workerResponse :Object = {};

  try {
    yield put(getEntityDataModelTypes.request(action.id));

    const responses :WorkerResponse[] = yield all([
      call(getAllEntityTypesWorker, getAllEntityTypes()),
      call(getAllPropertyTypesWorker, getAllPropertyTypes()),
    ]);
    if (responses[0].error) throw responses[0].error;
    if (responses[1].error) throw responses[1].error;

    yield put(getEntityDataModelTypes.success(action.id, {
      entityTypes: responses[0].data,
      propertyTypes: responses[1].data,
    }));
  }
  catch (error) {
    LOG.error(action.type, error);
    workerResponse.error = error;
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
