/*
 * @flow
 */

import {
  all,
  call,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import {
  EntityDataModelApiActions,
  EntityDataModelApiSagas,
} from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import Logger from '../../utils/Logger';
import { isDefined } from '../../utils/LangUtils';
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

function* getEntityDataModelTypesWorker(action :SequenceAction) :Generator<*, *, *> {

  const workerResponse :Object = {};

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

function* getEntityDataModelTypesWatcher() :Generator<*, *, *> {

  yield takeEvery(GET_EDM_TYPES, getEntityDataModelTypesWorker);
}

export {
  getEntityDataModelTypesWatcher,
  getEntityDataModelTypesWorker,
};
