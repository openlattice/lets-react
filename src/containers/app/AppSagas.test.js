import randomUUID from 'uuid/v4';
import { put } from 'redux-saga/effects';

import {
  LOAD_APP,
  loadApp,
} from './AppActions';

import {
  loadAppWatcher,
  loadAppWorker,
} from './AppSagas';

import {
  GENERATOR_TAG,
  testShouldBeGeneratorFunction,
  testWatcherSagaShouldTakeEvery,
} from '../../utils/testing/TestUtils';

describe('AppSagas', () => {

  /*
   *
   * AppActions.loadApp
   *
   */

  describe('loadAppWatcher', () => {
    testShouldBeGeneratorFunction(loadAppWatcher);
    testWatcherSagaShouldTakeEvery(
      loadAppWatcher,
      loadAppWorker,
      LOAD_APP
    );
  });

  describe('loadAppWorker', () => {

    testShouldBeGeneratorFunction(loadAppWorker);

    test('success case', () => {

      const mockActionValue = randomUUID();
      const workerSagaAction = loadApp(mockActionValue);
      const iterator = loadAppWorker(workerSagaAction);
      expect(Object.prototype.toString.call(iterator)).toEqual(GENERATOR_TAG);

      let step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: loadApp.REQUEST,
        })
      );

      step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: loadApp.SUCCESS,
        })
      );

      step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: loadApp.FINALLY,
        })
      );

      step = iterator.next();
      expect(step.done).toEqual(true);
    });

    test('failure case', () => {

      const mockActionValue = randomUUID();
      const mockError = new Error(500);
      const workerSagaAction = loadApp(mockActionValue);
      const iterator = loadAppWorker(workerSagaAction);
      expect(Object.prototype.toString.call(iterator)).toEqual(GENERATOR_TAG);

      let step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: loadApp.REQUEST,
        })
      );

      step = iterator.throw(mockError);
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: loadApp.FAILURE,
          value: mockError
        })
      );

      step = iterator.next();
      expect(step.value).toEqual(
        put({
          id: workerSagaAction.id,
          type: loadApp.FINALLY,
        })
      );

      step = iterator.next();
      expect(step.done).toEqual(true);
    });

  });

});
