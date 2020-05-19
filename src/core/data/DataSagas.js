/*
 * @flow
 */

import {
  all,
  call,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import { Models, Types } from 'lattice';
import { DataApiActions, DataApiSagas } from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { SequenceAction } from 'redux-reqseq';

import {
  SUBMIT_DATA_GRAPH,
  SUBMIT_PARTIAL_REPLACE,
  submitDataGraph,
  submitPartialReplace,
} from './DataActions';

const LOG = new Logger('DataSagas');
const { DataGraphBuilder } = Models;
const { UpdateTypes } = Types;
const {
  createEntityAndAssociationData,
  updateEntityData,
} = DataApiActions;
const {
  createEntityAndAssociationDataWorker,
  updateEntityDataWorker,
} = DataApiSagas;

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
  submitDataGraphWatcher,
  submitDataGraphWorker,
  submitPartialReplaceWatcher,
  submitPartialReplaceWorker,
};
