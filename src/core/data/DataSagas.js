/*
 * @flow
 */

import {
  all,
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { Set } from 'immutable';
import { Models, Types } from 'lattice';
import { DataApiActions, DataApiSagas } from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { UUID } from 'lattice';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import {
  FETCH_ENTITY_SET_DATA,
  SUBMIT_DATA_GRAPH,
  SUBMIT_PARTIAL_REPLACE,
  fetchEntitySetData,
  submitDataGraph,
  submitPartialReplace,
} from './DataActions';
import { selectStoredEntityKeyIds } from './DataUtils';

const LOG = new Logger('DataSagas');

const { DataGraphBuilder } = Models;
const { UpdateTypes } = Types;
const {
  createEntityAndAssociationData,
  getEntitySetData,
  updateEntityData,
} = DataApiActions;
const {
  createEntityAndAssociationDataWorker,
  getEntitySetDataWorker,
  updateEntityDataWorker,
} = DataApiSagas;

/*
 *
 * DataActions.fetchEntitySetData
 *
 */

function* fetchEntitySetDataWorker(action :SequenceAction) :Saga<*> {

  try {
    yield put(fetchEntitySetData.request(action.id, action.value));

    const { entityKeyIds, entitySetId } :{
      entityKeyIds :Set<UUID>;
      entitySetId :UUID;
    } = action.value;

    // TODO: expire stored data
    const storedEntityKeyIds :Set<UUID> = yield select(selectStoredEntityKeyIds(entitySetId, entityKeyIds));
    const missingEntityKeyIds :Set<UUID> = entityKeyIds.subtract(storedEntityKeyIds);

    let entitySetData = {};
    if (!missingEntityKeyIds.isEmpty()) {
      const response :WorkerResponse = yield call(
        getEntitySetDataWorker,
        getEntitySetData({ entitySetId, entityKeyIds: missingEntityKeyIds.toJS() }),
      );
      if (response.error) throw response.error;
      entitySetData = response.data;
    }

    yield put(fetchEntitySetData.success(action.id, entitySetData));
  }
  catch (error) {
    LOG.error(action.type, error);
    yield put(fetchEntitySetData.failure(action.id, error));
  }
  finally {
    yield put(fetchEntitySetData.finally(action.id));
  }
}

function* fetchEntitySetDataWatcher() :Saga<*> {

  yield takeEvery(FETCH_ENTITY_SET_DATA, fetchEntitySetDataWorker);
}

/*
 *
 * DataActions.submitDataGraph()
 *
 */

function* submitDataGraphWorker(action :SequenceAction) :Saga<*> {

  const sagaResponse :Object = {};

  try {
    yield put(submitDataGraph.request(action.id, action.value));

    const dataGraph = (new DataGraphBuilder(action.value)).build();
    const response = yield call(createEntityAndAssociationDataWorker, createEntityAndAssociationData(dataGraph));
    if (response.error) throw response.error;
    yield put(submitDataGraph.success(action.id, response.data));
  }
  catch (error) {
    sagaResponse.error = error;
    LOG.error(action.type, error);
    yield put(submitDataGraph.failure(action.id, error));
  }
  finally {
    yield put(submitDataGraph.finally(action.id));
  }

  return sagaResponse;
}

function* submitDataGraphWatcher() :Saga<*> {

  yield takeEvery(SUBMIT_DATA_GRAPH, submitDataGraphWorker);
}

/*
 *
 * DataActions.submitPartialReplace()
 *
 */

function* submitPartialReplaceWorker(action :SequenceAction) :Saga<*> {

  const sagaResponse :Object = {};

  try {
    yield put(submitPartialReplace.request(action.id, action.value));

    const calls = [];
    const { entityData } = action.value;
    Object.keys(entityData).forEach((entitySetId :UUID) => {
      calls.push(
        call(
          updateEntityDataWorker,
          updateEntityData({
            entitySetId,
            entities: entityData[entitySetId],
            updateType: UpdateTypes.PartialReplace,
          }),
        )
      );
    });

    const updateResponses = yield all(calls);
    const responseErrors = updateResponses.reduce((acc, response) => {
      if (response.error) {
        acc.push(response.error);
      }
      return acc;
    }, []);
    const errors = {
      errors: responseErrors
    };

    if (responseErrors.length) throw errors;

    yield put(submitPartialReplace.success(action.id));
  }
  catch (error) {
    sagaResponse.error = error;
    LOG.error(action.type, error);
    yield put(submitPartialReplace.failure(action.id, error));
  }
  finally {
    yield put(submitPartialReplace.finally(action.id));
  }

  return sagaResponse;
}

function* submitPartialReplaceWatcher() :Saga<*> {

  yield takeEvery(SUBMIT_PARTIAL_REPLACE, submitPartialReplaceWorker);
}

export {
  fetchEntitySetDataWatcher,
  fetchEntitySetDataWorker,
  submitDataGraphWatcher,
  submitDataGraphWorker,
  submitPartialReplaceWatcher,
  submitPartialReplaceWorker,
};
