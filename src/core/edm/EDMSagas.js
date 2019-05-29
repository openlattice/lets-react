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
import type { SequenceAction } from 'redux-reqseq';

import Logger from '../../utils/Logger';
import { EntitySetNames } from './constants';
import { ERR_WORKER_SAGA } from '../../utils/Errors';
import {
  GET_EDM_TYPES,
  GET_ENTITY_SET_IDS,
  getEntityDataModelTypes,
  getEntitySetIds,
} from './EDMActions';

const LOG = new Logger('EDMSagas');

const { ENTITY_SET_NAMES_LIST } = EntitySetNames;

const {
  getAllAssociationTypes,
  getAllEntityTypes,
  getAllPropertyTypes,
  getEntitySetId,
} = EntityDataModelApiActions;

const {
  getAllAssociationTypesWorker,
  getAllEntityTypesWorker,
  getAllPropertyTypesWorker,
  getEntitySetIdWorker,
} = EntityDataModelApiSagas;

/*
 *
 * EDMActions.getEntityDataModelTypes()
 *
 */

function* getEntityDataModelTypesWorker(action :SequenceAction) :Generator<*, *, *> {

  try {
    yield put(getEntityDataModelTypes.request(action.id));
    const response = yield all([
      call(getAllAssociationTypesWorker, getAllAssociationTypes()),
      call(getAllEntityTypesWorker, getAllEntityTypes()),
      call(getAllPropertyTypesWorker, getAllPropertyTypes()),
    ]);
    yield put(getEntityDataModelTypes.success(
      action.id,
      [
        ...response[0].data,
        ...response[1].data,
        ...response[2].data,
      ]
    ));
  }
  catch (error) {
    LOG.error(ERR_WORKER_SAGA, error);
    yield put(getEntityDataModelTypes.failure(action.id, error));
  }
  finally {
    yield put(getEntityDataModelTypes.finally(action.id));
  }
}

function* getEntityDataModelTypesWatcher() :Generator<*, *, *> {

  yield takeEvery(GET_EDM_TYPES, getEntityDataModelTypesWorker);
}

/*
 *
 * EDMActions.getEntitySetIds()
 *
 */

function* getEntitySetIdsWorker(action :SequenceAction) :Generator<*, *, *> {

  try {
    yield put(getEntitySetIds.request(action.id));

    const callMap = ENTITY_SET_NAMES_LIST.reduce((map :Object, entitySetName :string) => {
      // https://github.com/airbnb/javascript/issues/719
      /* eslint-disable-next-line no-param-reassign */
      map[entitySetName] = call(getEntitySetIdWorker, getEntitySetId(entitySetName));
      return map;
    }, {});

    const responses :Object = yield all(callMap);
    const responseError = Object.keys(responses).reduce(
      (error :any, entitySetName :string) => responses[entitySetName].error,
      undefined,
    );

    // all requests must succeed
    if (responseError) {
      throw responseError;
    }

    const entitySetNameToIdMap = Object.keys(responses).reduce((map :Object, entitySetName :string) => {
      // https://github.com/airbnb/javascript/issues/719
      /* eslint-disable-next-line no-param-reassign */
      map[entitySetName] = responses[entitySetName].data;
      return map;
    }, {});

    yield put(getEntitySetIds.success(action.id, entitySetNameToIdMap));
  }
  catch (error) {
    LOG.error(ERR_WORKER_SAGA, error);
    yield put(getEntitySetIds.failure(action.id, error));
  }
  finally {
    yield put(getEntitySetIds.finally(action.id));
  }
}

function* getEntitySetIdsWatcher() :Generator<*, *, *> {

  yield takeEvery(GET_ENTITY_SET_IDS, getEntitySetIdsWorker);
}

export {
  getEntityDataModelTypesWatcher,
  getEntityDataModelTypesWorker,
  getEntitySetIdsWatcher,
  getEntitySetIdsWorker,
};
