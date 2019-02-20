import Immutable from 'immutable';
import { takeEvery } from '@redux-saga/core/effects';

import { ERR_INVALID_ACTION, ERR_ACTION_VALUE_NOT_DEFINED } from '../Errors';
import { INVALID_PARAMS, INVALID_PARAMS_NOT_DEFINED } from './Invalid';

export const GENERATOR_FUNCTION_TAG = '[object GeneratorFunction]';
export const GENERATOR_TAG = '[object Generator]';
export const OBJECT_TAG = '[object Object]';
export const STRING_TAG = '[object String]';

export function testShouldBeRequestSequenceFunction(functionToTest, baseType) {

  test('should be a RequestSequence function', () => {

    expect(functionToTest).toBeInstanceOf(Function);
    expect(functionToTest.REQUEST).toEqual(`${baseType}/REQUEST`);
    expect(functionToTest.SUCCESS).toEqual(`${baseType}/SUCCESS`);
    expect(functionToTest.FAILURE).toEqual(`${baseType}/FAILURE`);
    expect(functionToTest.FINALLY).toEqual(`${baseType}/FINALLY`);
    expect(functionToTest.request).toBeInstanceOf(Function);
    expect(functionToTest.success).toBeInstanceOf(Function);
    expect(functionToTest.failure).toBeInstanceOf(Function);
    expect(functionToTest.finally).toBeInstanceOf(Function);
    expect(functionToTest.case).toBeInstanceOf(Function);
    expect(functionToTest.reducer).toBeInstanceOf(Function);
  });
}

export function testShouldBeGeneratorFunction(functionToTest) {

  test('should be a generator function', () => {
    expect(Object.prototype.toString.call(functionToTest)).toEqual(GENERATOR_FUNCTION_TAG);
  });
}

export function testWatcherSagaShouldTakeEvery(watcherSagaToTest, expectedWorkerSaga, expectedAction) {

  test('should invoke takeEvery()', () => {
    const iterator = watcherSagaToTest();
    expect(Object.prototype.toString.call(iterator)).toEqual(GENERATOR_TAG);
    expect(iterator.next().value).toEqual(takeEvery(expectedAction, expectedWorkerSaga));
    expect(iterator.next().done).toEqual(true);
  });
}

export function testShouldFailOnInvalidAction(workerSagaToTest, baseActionType, isValueRequired = true) {

  INVALID_PARAMS.forEach((invalidParam) => {
    const iterator = workerSagaToTest(invalidParam);
    const step = iterator.next();
    expect(step.value).toEqual({ error: ERR_INVALID_ACTION });
  });

  if (isValueRequired) {
    INVALID_PARAMS_NOT_DEFINED.forEach((invalidParam) => {
      const iterator = workerSagaToTest({ id: 'fakeId', type: baseActionType, value: invalidParam });
      const step = iterator.next();
      expect(step.value).toEqual({ error: ERR_ACTION_VALUE_NOT_DEFINED });
    });
  }
}

export function testShouldExportActionTypes(Actions, expectedActionTypes) {

  describe('should export action types', () => {

    test('should export expected action types, sorted alphabetically', () => {
      const exportedActionTypes = Immutable.OrderedMap(Actions).take(expectedActionTypes.length);
      expect(exportedActionTypes.keySeq().toJS()).toEqual(expectedActionTypes);
      expect(exportedActionTypes.valueSeq().toJS()).toEqual(expectedActionTypes);
    });

    expectedActionTypes.forEach((actionType) => {
      test(`should export "${actionType}"`, () => {
        expect(Actions).toHaveProperty(actionType);
        expect(Actions[actionType]).toEqual(actionType);
      });
    });
  });
}

export function testShouldExportRequestSequences(Actions, expectedActionTypes, expectedReqSeqNames) {

  describe('should export RequestSequences', () => {

    test('should export expected RequestSequences, sorted alphabetically', () => {
      const expectedReqSeqs = Immutable.OrderedMap(Actions).takeLast(expectedReqSeqNames.length);
      expect(expectedReqSeqs.keySeq().toJS()).toEqual(expectedReqSeqNames);
    });

    expectedReqSeqNames.forEach((reqseqName, index) => {
      describe(`${reqseqName}`, () => {
        const expectedActionType = expectedActionTypes[index];
        testShouldBeRequestSequenceFunction(Actions[reqseqName], Actions[expectedActionType]);
      });
    });
  });
}
