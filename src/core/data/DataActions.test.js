import { OrderedSet } from 'immutable';

import * as DataActions from './DataActions';

import { TestUtils } from '../../utils/testing';

const { testShouldExportActionTypes, testShouldExportRequestSequences } = TestUtils;

const ACTION_TYPES = OrderedSet([
  'FETCH_ENTITY_SET_DATA',
  'SUBMIT_DATA_GRAPH',
  'SUBMIT_PARTIAL_REPLACE',
]).toJS();

const REQSEQ_NAMES = OrderedSet([
  'fetchEntitySetData',
  'submitDataGraph',
  'submitPartialReplace',
]).toJS();

describe('DataActions', () => {

  testShouldExportActionTypes(DataActions, ACTION_TYPES);
  testShouldExportRequestSequences(DataActions, ACTION_TYPES, REQSEQ_NAMES);
});
