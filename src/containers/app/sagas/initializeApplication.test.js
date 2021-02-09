import { all, call, put } from '@redux-saga/core/effects';
import { v4 as uuid } from 'uuid';

import { initializeApplicationWatcher, initializeApplicationWorker } from './initializeApplication';

import { GET_EDM_TYPES } from '../../../core/edm/actions';
import { getEntityDataModelTypesWorker } from '../../../core/edm/sagas';
import { testShouldBeGeneratorFunction, testWatcherSagaShouldTakeEvery } from '../../../utils/testing/TestUtils';
import { GENERATOR_TAG } from '../../../utils/testing/constants';
import { INITIALIZE_APPLICATION, initializeApplication } from '../actions';

describe('AppSagas', () => {

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
