import { all, call, put } from '@redux-saga/core/effects';
import { v4 as uuid } from 'uuid';

import {
  INITIALIZE_APPLICATION,
  initializeApplication,
} from './AppActions';
import {
  initializeApplicationWatcher,
  initializeApplicationWorker,
} from './AppSagas';

import { EDMActions, EDMSagas } from '../../core/edm';
import { TestUtils } from '../../utils/testing';
import { GENERATOR_TAG } from '../../utils/testing/constants';

const { GET_EDM_TYPES } = EDMActions;
const { getEntityDataModelTypesWorker } = EDMSagas;
const { testShouldBeGeneratorFunction, testWatcherSagaShouldTakeEvery } = TestUtils;

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
      INITIALIZE_APPLICATION,
    );
  });

  describe('initializeApplicationWorker', () => {

    testShouldBeGeneratorFunction(initializeApplicationWorker);

    test('success case', () => {

      const mockActionValue = uuid();
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
          call(getEntityDataModelTypesWorker, { id: expect.any(String), type: GET_EDM_TYPES, value: {} }),
        ])
      );

      step = iterator.next([{ data: true }]);
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

      const mockActionValue = uuid();
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
