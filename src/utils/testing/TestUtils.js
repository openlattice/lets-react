import { takeEvery } from '@redux-saga/core/effects';
import { OrderedMap } from 'immutable';

import { GENERATOR_FUNCTION_TAG, GENERATOR_TAG } from './constants';

function testShouldBeGeneratorFunction(functionToTest) {

  test('should be a generator function', () => {
    expect(Object.prototype.toString.call(functionToTest)).toEqual(GENERATOR_FUNCTION_TAG);
  });
}

function testShouldBeRequestSequenceFunction(functionToTest, baseType) {

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

function testShouldExportActionTypes(Actions, expectedActionTypes) {

  describe('should export action types', () => {

    test('should export expected action types, sorted alphabetically', () => {
      const exportedActionTypes = OrderedMap(Actions).filter((v, k) => expectedActionTypes.includes(k));
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

function testShouldExportRequestSequences(Actions, expectedActionTypes, expectedReqSeqNames) {

  describe('should export RequestSequences', () => {

    test('should export expected RequestSequences, sorted alphabetically', () => {
      const expectedReqSeqs = OrderedMap(Actions).filter((v, k) => expectedReqSeqNames.includes(k));
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

function testWatcherSagaShouldTakeEvery(watcherSagaToTest, expectedWorkerSaga, expectedAction) {

  test('should invoke takeEvery()', () => {
    const iterator = watcherSagaToTest();
    expect(Object.prototype.toString.call(iterator)).toEqual(GENERATOR_TAG);
    expect(iterator.next().value).toEqual(takeEvery(expectedAction, expectedWorkerSaga));
    expect(iterator.next().done).toEqual(true);
  });
}

export {
  testShouldBeGeneratorFunction,
  testShouldBeRequestSequenceFunction,
  testShouldExportActionTypes,
  testShouldExportRequestSequences,
  testWatcherSagaShouldTakeEvery,
};
