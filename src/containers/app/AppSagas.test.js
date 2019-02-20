import randomUUID from 'uuid/v4';
import { all, call, put } from '@redux-saga/core/effects';

import {
  INITIALIZE_APPLICATION,
  initializeApplication,
} from './AppActions';
import {
  initializeApplicationWatcher,
  initializeApplicationWorker,
} from './AppSagas';
import {
  GET_EDM_TYPES,
  GET_ENTITY_SET_IDS,
} from '../../core/edm/EDMActions';
import {
  getEntitySetIdsWorker,
  getEntityDataModelTypesWorker,
} from '../../core/edm/EDMSagas';
import {
  GENERATOR_TAG,
  testShouldBeGeneratorFunction,
  testWatcherSagaShouldTakeEvery,
} from '../../utils/testing/TestUtils';

describe('AppSagas', () => {

  /*
   *
   * AppActions.initializeApplication
   *
   */

  describe('initializeApplicationWatcher', () => {
    testShouldBeGeneratorFunction(initializeApplicationWatcher);
    testWatcherSagaShouldTakeEvery(
      initializeApplicationWatcher,
      initializeApplicationWorker,
      INITIALIZE_APPLICATION
    );
  });

  describe('initializeApplicationWorker', () => {

    testShouldBeGeneratorFunction(initializeApplicationWorker);

    test('success case', () => {

      const mockActionValue = randomUUID();
      const workerSagaAction = initializeApplication(mockActionValue);
      const iterator = initializeApplicationWorker(workerSagaAction);
      expect(Object.prototype.toString.call(iterator)).toEqual(GENERATOR_TAG);

      let step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: initializeApplication.REQUEST,
          value: {},
        })
      );

      step = iterator.next();
      expect(step.value).toEqual(
        all([
          call(getEntitySetIdsWorker, { id: expect.any(String), type: GET_ENTITY_SET_IDS, value: {} }),
          call(getEntityDataModelTypesWorker, { id: expect.any(String), type: GET_EDM_TYPES, value: {} }),
        ])
      );

      step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: initializeApplication.SUCCESS,
          value: {},
        })
      );

      step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: initializeApplication.FINALLY,
          value: {},
        })
      );

      step = iterator.next();
      expect(step.done).toEqual(true);
    });

    test('failure case', () => {

      const mockActionValue = randomUUID();
      const mockError = new Error(500);
      const workerSagaAction = initializeApplication(mockActionValue);
      const iterator = initializeApplicationWorker(workerSagaAction);
      expect(Object.prototype.toString.call(iterator)).toEqual(GENERATOR_TAG);

      let step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: initializeApplication.REQUEST,
          value: {},
        })
      );

      step = iterator.throw(mockError);
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: initializeApplication.FAILURE,
          value: mockError,
        })
      );

      step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: initializeApplication.FINALLY,
          value: {},
        })
      );

      step = iterator.next();
      expect(step.done).toEqual(true);
    });

  });

});
